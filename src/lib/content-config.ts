import contentSyncConfig from '../config/content-sync.config.json';

export interface ContentConfig {
	revalidate: number;
	cacheStrategy: 'static' | 'isr' | 'realtime';
	priority: 'high' | 'medium' | 'low';
	realtime: boolean;
	dependencies: string[];
}

export interface PageConfig {
	contentKeys: string[];
	revalidate: number;
	cacheStrategy: 'static' | 'isr' | 'realtime';
	priority: 'high' | 'medium' | 'low';
	realtime: boolean;
}

export interface GlobalConfig {
	defaultRevalidate: number;
	defaultCacheStrategy: 'static' | 'isr' | 'realtime';
	enableRealtime: boolean;
	cacheTimeout: number;
	retryAttempts: number;
	retryDelay: number;
	collection: string;
	enableFallback: boolean;
	logLevel: 'debug' | 'info' | 'warn' | 'error';
}

export interface EnvironmentConfig {
	enableRealtime?: boolean;
	cacheTimeout?: number;
	defaultRevalidate?: number;
	logLevel?: 'debug' | 'info' | 'warn' | 'error';
}

class ContentSyncConfigManager {
	private config: typeof contentSyncConfig;
	private environment: string;

	constructor() {
		this.config = contentSyncConfig;
		this.environment = process.env.NODE_ENV || 'development';
	}

	/**
	 * Get configuration for a specific content key
	 */
	getContentConfig(key: string): ContentConfig {
		const contentConfig = this.config.content[key as keyof typeof this.config.content];
		const globalConfig = this.getGlobalConfig();

		if (!contentConfig) {
			// Return default configuration
			return {
				revalidate: globalConfig.defaultRevalidate,
				cacheStrategy: globalConfig.defaultCacheStrategy,
				priority: 'medium',
				realtime: globalConfig.enableRealtime,
				dependencies: [],
			};
		}

		return {
			...contentConfig,
			realtime: contentConfig.realtime ?? globalConfig.enableRealtime,
		} as ContentConfig;
	}

	/**
	 * Get configuration for a specific page
	 */
	getPageConfig(pageName: string): PageConfig | null {
		const pageConfig = this.config.pages[pageName as keyof typeof this.config.pages];
		return pageConfig as PageConfig || null;
	}

	/**
	 * Get global configuration with environment overrides
	 */
	getGlobalConfig(): GlobalConfig {
		const global = this.config.global;
		const envConfig = this.config.environments[this.environment as keyof typeof this.config.environments];

		return {
			...global,
			...envConfig,
		} as GlobalConfig;
	}

	/**
	 * Get all content keys that need to be invalidated when a specific key changes
	 */
	getDependentKeys(changedKey: string): string[] {
		const dependents: string[] = [];

		Object.entries(this.config.content).forEach(([key, config]) => {
			const dependencies = (config as any).dependencies;
			if (dependencies && Array.isArray(dependencies) && dependencies.includes(changedKey)) {
				dependents.push(key);
			}
		});

		return dependents;
	}

	/**
	 * Get all pages that use a specific content key
	 */
	getAffectedPages(contentKey: string): string[] {
		const affectedPages: string[] = [];

		Object.entries(this.config.pages).forEach(([pageName, pageConfig]) => {
			if (pageConfig.contentKeys.includes(contentKey)) {
				affectedPages.push(pageName);
			}
		});

		return affectedPages;
	}

	/**
	 * Get revalidation strategy for ISR
	 */
	getISRConfig(pageName: string): { revalidate: number; fallback: boolean } {
		const pageConfig = this.getPageConfig(pageName);
		const globalConfig = this.getGlobalConfig();

		if (!pageConfig) {
			return {
				revalidate: globalConfig.defaultRevalidate,
				fallback: globalConfig.enableFallback,
			};
		}

		return {
			revalidate: pageConfig.revalidate,
			fallback: globalConfig.enableFallback,
		};
	}

	/**
	 * Check if a content key should use real-time updates
	 */
	shouldUseRealtime(key: string): boolean {
		const contentConfig = this.getContentConfig(key);
		return contentConfig.realtime;
	}

	/**
	 * Get cache timeout for a content key
	 */
	getCacheTimeout(key: string): number {
		const contentConfig = this.getContentConfig(key);
		const globalConfig = this.getGlobalConfig();

		// Use content-specific revalidate time if available, otherwise global cache timeout
		return contentConfig.revalidate * 1000 || globalConfig.cacheTimeout;
	}

	/**
	 * Get content keys sorted by priority
	 */
	getContentKeysByPriority(): { high: string[]; medium: string[]; low: string[] } {
		const priorities = { high: [] as string[], medium: [] as string[], low: [] as string[] };

		Object.entries(this.config.content).forEach(([key, config]) => {
			const priority = (config as any).priority as 'high' | 'medium' | 'low';
			if (priorities[priority]) {
				priorities[priority].push(key);
			}
		});

		return priorities;
	}

	/**
	 * Get sync strategy for bulk operations
	 */
	getSyncStrategy(): {
		collection: string;
		retryAttempts: number;
		retryDelay: number;
		logLevel: string;
	} {
		const globalConfig = this.getGlobalConfig();

		return {
			collection: globalConfig.collection,
			retryAttempts: globalConfig.retryAttempts,
			retryDelay: globalConfig.retryDelay,
			logLevel: globalConfig.logLevel,
		};
	}

	/**
	 * Update configuration at runtime (for testing/debugging)
	 */
	updateContentConfig(key: string, config: Partial<ContentConfig>): void {
		if (this.config.content[key as keyof typeof this.config.content]) {
			Object.assign(this.config.content[key as keyof typeof this.config.content], config);
		}
	}

	/**
	 * Set environment (useful for testing)
	 */
	setEnvironment(env: string): void {
		this.environment = env;
	}

	/**
	 * Get complete configuration object
	 */
	getFullConfig() {
		return this.config;
	}

	/**
	 * Validate configuration integrity
	 */
	validateConfig(): { isValid: boolean; errors: string[] } {
		const errors: string[] = [];

		// Check if all page content keys exist in content config
		Object.entries(this.config.pages).forEach(([pageName, pageConfig]) => {
			pageConfig.contentKeys.forEach((key) => {
				if (!this.config.content[key as keyof typeof this.config.content]) {
					errors.push(`Page "${pageName}" references unknown content key: "${key}"`);
				}
			});
		});

		// Check if all dependencies exist
		Object.entries(this.config.content).forEach(([key, config]) => {
			config.dependencies?.forEach((dep) => {
				if (!this.config.content[dep as keyof typeof this.config.content]) {
					errors.push(`Content "${key}" depends on unknown content key: "${dep}"`);
				}
			});
		});

		return {
			isValid: errors.length === 0,
			errors,
		};
	}
}

// Export singleton instance
export const configManager = new ContentSyncConfigManager();

// Export class for custom instances
export { ContentSyncConfigManager };