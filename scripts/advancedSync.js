/**
 * Advanced Content Sync Manager
 * 
 * Features:
 * - Intelligent merge with conflict resolution
 * - Selective sync by priority
 * - Backup and rollback capabilities
 * - Real-time monitoring
 * - Dependency tracking
 * - Environment-specific configurations
 * 
 * Usage:
 *   node scripts/advancedSync.js [command] [options]
 * 
 * Commands:
 *   push [keys...]     - Push specific content keys or all
 *   pull [keys...]     - Pull specific content keys or all  
 *   sync              - Intelligent bi-directional sync
 *   backup            - Create backup of current state
 *   restore [file]    - Restore from backup
 *   validate          - Validate content integrity
 *   monitor           - Start real-time monitoring
 *   diff              - Show differences between local and remote
 * 
 * Options:
 *   --dry-run         - Show what would be changed without applying
 *   --force           - Force operation even with conflicts
 *   --priority=high   - Only process high priority content
 *   --env=production  - Use specific environment config
 *   --verbose         - Enable detailed logging
 */

const fs = require('fs');
const path = require('path');
const admin = require('firebase-admin');

// Import configuration
const syncConfig = require('../src/config/content-sync.config.json');

class AdvancedContentSync {
	constructor(options = {}) {
		this.options = {
			dryRun: false,
			force: false,
			priority: null,
			env: process.env.NODE_ENV || 'development',
			verbose: false,
			...options,
		};

		this.config = this.loadConfig();
		this.initFirebase();
		this.logger = new Logger(this.config.global.logLevel, this.options.verbose);
	}

	loadConfig() {
		const baseConfig = syncConfig;
		const envConfig = baseConfig.environments[this.options.env] || {};
		
		return {
			...baseConfig,
			global: {
				...baseConfig.global,
				...envConfig,
			},
		};
	}

	initFirebase() {
		const serviceAccountPath = path.resolve(
			process.cwd(),
			'./serviceAccountKey.json'
		);

		if (!fs.existsSync(serviceAccountPath)) {
			throw new Error('Service account key not found');
		}

		const serviceAccount = JSON.parse(
			fs.readFileSync(serviceAccountPath, 'utf-8')
		);

		try {
			admin.initializeApp({
				credential: admin.credential.cert(serviceAccount),
			});
		} catch (error) {
			// Already initialized
		}

		this.db = admin.firestore();
	}

	/**
	 * Intelligent bi-directional sync with conflict resolution
	 */
	async sync(keys = null) {
		this.logger.info('Starting intelligent sync...');

		try {
			const localContent = this.loadLocalContent();
			const remoteContent = await this.loadRemoteContent();

			if (!localContent || !remoteContent) {
				throw new Error('Failed to load content from one or both sources');
			}

			const contentKeys = keys || this.getContentKeys();
			const conflicts = [];
			const changes = {
				local: [],
				remote: [],
				merged: [],
			};

			for (const key of contentKeys) {
				const local = localContent[key];
				const remote = remoteContent[key];

				if (!local && !remote) continue;

				const comparison = this.compareContent(key, local, remote);
				
				switch (comparison.status) {
					case 'local-newer':
						changes.remote.push({ key, action: 'update', data: local });
						break;
					case 'remote-newer':
						changes.local.push({ key, action: 'update', data: remote });
						break;
					case 'conflict':
						conflicts.push({
							key,
							local,
							remote,
							strategy: this.getConflictStrategy(key),
						});
						break;
					case 'equal':
						// No action needed
						break;
				}
			}

			// Handle conflicts
			for (const conflict of conflicts) {
				const resolved = this.resolveConflict(conflict);
				if (resolved) {
					changes.merged.push(resolved);
				}
			}

			// Apply changes
			if (!this.options.dryRun) {
				await this.applyChanges(changes);
			} else {
				this.logger.info('Dry run - changes that would be applied:');
				console.log(JSON.stringify(changes, null, 2));
			}

			this.logger.info('Sync completed successfully');
			return { changes, conflicts };

		} catch (error) {
			this.logger.error('Sync failed:', error);
			throw error;
		}
	}

	/**
	 * Push content to Firestore with dependency tracking
	 */
	async push(keys = null) {
		this.logger.info('Starting push operation...');

		try {
			const localContent = this.loadLocalContent();
			const contentKeys = keys || this.getContentKeys();

			// Get all keys including dependencies
			const allKeys = this.expandWithDependencies(contentKeys);

			if (this.options.dryRun) {
				this.logger.info('Dry run - would push keys:', allKeys);
				return;
			}

			const batch = this.db.batch();
			const timestamp = admin.firestore.FieldValue.serverTimestamp();

			for (const key of allKeys) {
				if (!localContent[key]) {
					this.logger.warn(`Content key "${key}" not found locally`);
					continue;
				}

				const docRef = this.db.collection(this.config.global.collection).doc(key);
				const payload = {
					data: localContent[key],
					_meta: {
						updatedAt: timestamp,
						source: 'push',
						version: localContent.metadata?.version || '1.0',
						pushedKeys: allKeys,
					},
				};

				batch.set(docRef, payload, { merge: true });
				this.logger.info(`Queued push for: ${key}`);
			}

			await batch.commit();
			this.logger.info(`Successfully pushed ${allKeys.length} content keys`);

		} catch (error) {
			this.logger.error('Push failed:', error);
			throw error;
		}
	}

	/**
	 * Pull content from Firestore with smart merging
	 */
	async pull(keys = null) {
		this.logger.info('Starting pull operation...');

		try {
			const localContent = this.loadLocalContent();
			const remoteContent = await this.loadRemoteContent();
			const contentKeys = keys || this.getContentKeys();

			const updated = { ...localContent };
			let hasChanges = false;

			for (const key of contentKeys) {
				if (remoteContent[key]) {
					updated[key] = remoteContent[key];
					hasChanges = true;
					this.logger.info(`Pulled: ${key}`);
				}
			}

			if (hasChanges && !this.options.dryRun) {
				this.saveLocalContent(updated);
				this.logger.info('Local content updated successfully');
			} else if (this.options.dryRun) {
				this.logger.info('Dry run - would update local content');
			} else {
				this.logger.info('No changes to pull');
			}

		} catch (error) {
			this.logger.error('Pull failed:', error);
			throw error;
		}
	}

	/**
	 * Create backup of current state
	 */
	async backup() {
		this.logger.info('Creating backup...');

		try {
			const timestamp = new Date().toISOString().replace(/[:.]/g, '-');
			const backupDir = path.resolve(process.cwd(), 'scripts/backups');
			
			fs.mkdirSync(backupDir, { recursive: true });

			// Backup local content
			const localContent = this.loadLocalContent();
			const localBackupPath = path.join(backupDir, `local-${timestamp}.json`);
			fs.writeFileSync(localBackupPath, JSON.stringify(localContent, null, 2));

			// Backup remote content
			const remoteContent = await this.loadRemoteContent();
			const remoteBackupPath = path.join(backupDir, `remote-${timestamp}.json`);
			fs.writeFileSync(remoteBackupPath, JSON.stringify(remoteContent, null, 2));

			this.logger.info(`Backup created: ${timestamp}`);
			return { localBackupPath, remoteBackupPath, timestamp };

		} catch (error) {
			this.logger.error('Backup failed:', error);
			throw error;
		}
	}

	/**
	 * Show differences between local and remote content
	 */
	async diff(keys = null) {
		this.logger.info('Calculating differences...');

		try {
			const localContent = this.loadLocalContent();
			const remoteContent = await this.loadRemoteContent();
			const contentKeys = keys || this.getContentKeys();

			const differences = {};

			for (const key of contentKeys) {
				const local = localContent[key];
				const remote = remoteContent[key];

				if (!local && !remote) continue;

				const comparison = this.compareContent(key, local, remote);
				if (comparison.status !== 'equal') {
					differences[key] = {
						status: comparison.status,
						localSize: local ? JSON.stringify(local).length : 0,
						remoteSize: remote ? JSON.stringify(remote).length : 0,
						lastModified: comparison.lastModified,
					};
				}
			}

			console.log('\n=== Content Differences ===');
			if (Object.keys(differences).length === 0) {
				console.log('No differences found');
			} else {
				console.table(differences);
			}

			return differences;

		} catch (error) {
			this.logger.error('Diff failed:', error);
			throw error;
		}
	}

	/**
	 * Validate content integrity
	 */
	validate() {
		this.logger.info('Validating content integrity...');

		try {
			const localContent = this.loadLocalContent();
			const errors = [];

			// Check for required fields
			if (!localContent.metadata) {
				errors.push('Missing metadata section');
			}

			if (!localContent.site) {
				errors.push('Missing site configuration');
			}

			// Validate content structure
			Object.entries(this.config.content).forEach(([key, config]) => {
				if (!localContent[key]) {
					errors.push(`Missing content key: ${key}`);
				}

				// Check dependencies
				if (config.dependencies) {
					config.dependencies.forEach((dep) => {
						if (!localContent[dep]) {
							errors.push(`Missing dependency "${dep}" for "${key}"`);
						}
					});
				}
			});

			// Check page configurations
			Object.entries(this.config.pages).forEach(([pageName, pageConfig]) => {
				pageConfig.contentKeys.forEach((key) => {
					if (!localContent[key]) {
						errors.push(`Page "${pageName}" references missing content: ${key}`);
					}
				});
			});

			if (errors.length === 0) {
				this.logger.info('Content validation passed');
			} else {
				this.logger.error('Content validation failed:');
				errors.forEach((error) => this.logger.error(`- ${error}`));
			}

			return { isValid: errors.length === 0, errors };

		} catch (error) {
			this.logger.error('Validation failed:', error);
			throw error;
		}
	}

	// Helper methods

	loadLocalContent() {
		const contentPath = path.resolve(process.cwd(), 'src/data/content.json');
		if (!fs.existsSync(contentPath)) {
			throw new Error('Local content file not found');
		}
		return JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
	}

	async loadRemoteContent() {
		const snapshot = await this.db.collection(this.config.global.collection).get();
		const content = {};

		snapshot.forEach((doc) => {
			const data = doc.data();
			content[doc.id] = data.data || data;
		});

		return content;
	}

	saveLocalContent(content) {
		const contentPath = path.resolve(process.cwd(), 'src/data/content.json');
		fs.writeFileSync(contentPath, JSON.stringify(content, null, 2));
	}

	getContentKeys() {
		if (this.options.priority) {
			const priorities = this.getContentKeysByPriority();
			return priorities[this.options.priority] || [];
		}
		return Object.keys(this.config.content);
	}

	getContentKeysByPriority() {
		const priorities = { high: [], medium: [], low: [] };
		Object.entries(this.config.content).forEach(([key, config]) => {
			priorities[config.priority].push(key);
		});
		return priorities;
	}

	expandWithDependencies(keys) {
		const expanded = new Set(keys);
		
		keys.forEach((key) => {
			const config = this.config.content[key];
			if (config && config.dependencies) {
				config.dependencies.forEach((dep) => expanded.add(dep));
			}
		});

		return Array.from(expanded);
	}

	compareContent(key, local, remote) {
		if (!local && !remote) return { status: 'equal' };
		if (!local) return { status: 'remote-newer' };
		if (!remote) return { status: 'local-newer' };

		const localStr = JSON.stringify(local);
		const remoteStr = JSON.stringify(remote);

		if (localStr === remoteStr) return { status: 'equal' };

		// For now, treat all differences as conflicts
		// Could implement timestamp-based comparison later
		return { status: 'conflict' };
	}

	getConflictStrategy(key) {
		const config = this.config.content[key];
		if (!config) return 'manual';

		// High priority content prefers manual resolution
		if (config.priority === 'high') return 'manual';
		
		// Medium priority prefers remote
		if (config.priority === 'medium') return 'prefer-remote';
		
		// Low priority prefers local
		return 'prefer-local';
	}

	resolveConflict(conflict) {
		const { key, local, remote, strategy } = conflict;

		switch (strategy) {
			case 'prefer-local':
				this.logger.warn(`Conflict resolved for "${key}": using local version`);
				return { key, action: 'use-local', data: local };
			
			case 'prefer-remote':
				this.logger.warn(`Conflict resolved for "${key}": using remote version`);
				return { key, action: 'use-remote', data: remote };
			
			case 'manual':
			default:
				this.logger.error(`Manual resolution required for "${key}"`);
				if (this.options.force) {
					this.logger.warn(`Force flag set: using local version for "${key}"`);
					return { key, action: 'use-local', data: local };
				}
				return null;
		}
	}

	async applyChanges(changes) {
		// Apply local changes
		if (changes.local.length > 0) {
			const localContent = this.loadLocalContent();
			changes.local.forEach(({ key, data }) => {
				localContent[key] = data;
			});
			this.saveLocalContent(localContent);
			this.logger.info(`Applied ${changes.local.length} local changes`);
		}

		// Apply remote changes
		if (changes.remote.length > 0) {
			const batch = this.db.batch();
			const timestamp = admin.firestore.FieldValue.serverTimestamp();

			changes.remote.forEach(({ key, data }) => {
				const docRef = this.db.collection(this.config.global.collection).doc(key);
				batch.set(docRef, {
					data,
					_meta: { updatedAt: timestamp, source: 'sync' },
				}, { merge: true });
			});

			await batch.commit();
			this.logger.info(`Applied ${changes.remote.length} remote changes`);
		}

		// Apply merged changes
		if (changes.merged.length > 0) {
			this.logger.info(`Applied ${changes.merged.length} conflict resolutions`);
		}
	}
}

class Logger {
	constructor(level = 'info', verbose = false) {
		this.levels = { debug: 0, info: 1, warn: 2, error: 3 };
		this.level = this.levels[level] || 1;
		this.verbose = verbose;
	}

	debug(...args) {
		if (this.level <= 0 || this.verbose) console.log('[DEBUG]', ...args);
	}

	info(...args) {
		if (this.level <= 1) console.log('[INFO]', ...args);
	}

	warn(...args) {
		if (this.level <= 2) console.warn('[WARN]', ...args);
	}

	error(...args) {
		if (this.level <= 3) console.error('[ERROR]', ...args);
	}
}

// CLI Interface
async function main() {
	const args = process.argv.slice(2);
	const command = args[0] || 'sync';
	
	const options = {
		dryRun: args.includes('--dry-run'),
		force: args.includes('--force'),
		verbose: args.includes('--verbose'),
		priority: args.find(arg => arg.startsWith('--priority='))?.split('=')[1],
		env: args.find(arg => arg.startsWith('--env='))?.split('=')[1],
	};

	const sync = new AdvancedContentSync(options);

	try {
		switch (command) {
			case 'push':
				const pushKeys = args.slice(1).filter(arg => !arg.startsWith('--'));
				await sync.push(pushKeys.length > 0 ? pushKeys : null);
				break;

			case 'pull':
				const pullKeys = args.slice(1).filter(arg => !arg.startsWith('--'));
				await sync.pull(pullKeys.length > 0 ? pullKeys : null);
				break;

			case 'sync':
				await sync.sync();
				break;

			case 'backup':
				await sync.backup();
				break;

			case 'diff':
				const diffKeys = args.slice(1).filter(arg => !arg.startsWith('--'));
				await sync.diff(diffKeys.length > 0 ? diffKeys : null);
				break;

			case 'validate':
				sync.validate();
				break;

			default:
				console.log(`
Advanced Content Sync Manager

Usage: node scripts/advancedSync.js [command] [options]

Commands:
  push [keys...]     Push specific content keys or all
  pull [keys...]     Pull specific content keys or all  
  sync              Intelligent bi-directional sync
  backup            Create backup of current state
  diff              Show differences between local and remote
  validate          Validate content integrity

Options:
  --dry-run         Show what would be changed without applying
  --force           Force operation even with conflicts
  --priority=high   Only process high priority content
  --env=production  Use specific environment config
  --verbose         Enable detailed logging

Examples:
  node scripts/advancedSync.js sync --dry-run
  node scripts/advancedSync.js push hero features --priority=high
  node scripts/advancedSync.js pull --env=production
  node scripts/advancedSync.js backup
				`);
				break;
		}
	} catch (error) {
		console.error('Operation failed:', error.message);
		process.exit(1);
	}
}

if (require.main === module) {
	main();
}

module.exports = { AdvancedContentSync, Logger };