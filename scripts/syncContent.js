/**
 * syncContent.js
 *
 * Usage:
 *   - node scripts/syncContent.js [push|pull]  -> override config mode with CLI arg
 *   - Config file: scripts/sync.config.json
 *
 * Modes:
 *   - local-to-firestore (push): Uploads local content.json top-level keys to Firestore as documents
 *   - firestore-to-local (pull): Reads documents from Firestore collection and writes a local content.json
 *
 * Safety:
 *   - Pull creates a timestamped backup of existing local file if backupOnPull is true
 *
 */

const fs = require('fs');
const path = require('path');

const CONFIG_PATH = path.resolve(__dirname, 'sync.config.json');

function readConfig() {
	if (!fs.existsSync(CONFIG_PATH)) {
		console.error('Config file not found at', CONFIG_PATH);
		process.exit(1);
	}
	const raw = fs.readFileSync(CONFIG_PATH, 'utf-8');
	return JSON.parse(raw);
}

function loadServiceAccount(p) {
	if (!fs.existsSync(p)) {
		console.error('Service account key not found at', p);
		process.exit(1);
	}
	return JSON.parse(fs.readFileSync(p, 'utf-8'));
}

async function pushLocalToFirestore(admin, config) {
	const contentPath = path.resolve(process.cwd(), config.contentPath);
	if (!fs.existsSync(contentPath)) {
		console.error('Local content file missing at', contentPath);
		process.exit(1);
	}
	const content = JSON.parse(fs.readFileSync(contentPath, 'utf-8'));
	const db = admin.firestore();
	const collection = config.collection || 'frontend';

	for (const key of Object.keys(content)) {
		const docRef = db.collection(collection).doc(key);
		const payload = {
			data: content[key],
			_meta: { importedAt: admin.firestore.FieldValue.serverTimestamp() },
		};
		await docRef.set(payload, { merge: true });
		console.log('[push] uploaded', key);
	}
}

async function pullFirestoreToLocal(admin, config) {
	const db = admin.firestore();
	const collection = config.collection || 'frontend';
	const snapshot = await db.collection(collection).get();
	const result = {};
	snapshot.forEach((doc) => {
		const d = doc.data();
		// If the stored shape used payload.data, use it; otherwise store the whole doc
		if (d && Object.prototype.hasOwnProperty.call(d, 'data')) {
			result[doc.id] = d.data;
		} else {
			result[doc.id] = d;
		}
	});

	const contentPath = path.resolve(process.cwd(), config.contentPath);
	if (config.backupOnPull) {
		const backupDir = path.resolve(
			process.cwd(),
			config.backupDir || './scripts/backups'
		);
		fs.mkdirSync(backupDir, { recursive: true });
		const ts = new Date().toISOString().replace(/[:.]/g, '-');
		const backupPath = path.join(backupDir, `content.json.backup.${ts}.json`);
		if (fs.existsSync(contentPath)) fs.copyFileSync(contentPath, backupPath);
		console.log('Backup created at', backupPath);
	}

	fs.writeFileSync(contentPath, JSON.stringify(result, null, 2), 'utf-8');
	console.log('[pull] Written local content to', contentPath);
}

async function main() {
	const config = readConfig();
	const arg = process.argv[2];
	if (arg === 'push') config.mode = 'local-to-firestore';
	if (arg === 'pull') config.mode = 'firestore-to-local';

	// load service account
	const servicePath = path.resolve(
		process.cwd(),
		config.serviceAccountPath || './serviceAccountKey.json'
	);
	const serviceAccount = loadServiceAccount(servicePath);

	const admin = require('firebase-admin');
	try {
		admin.initializeApp({ credential: admin.credential.cert(serviceAccount) });
	} catch (e) {}

	if (config.mode === 'local-to-firestore') {
		console.log('Mode: local-to-firestore (push)');
		await pushLocalToFirestore(admin, config);
	} else if (config.mode === 'firestore-to-local') {
		console.log('Mode: firestore-to-local (pull)');
		await pullFirestoreToLocal(admin, config);
	} else {
		console.error('Unknown mode in config:', config.mode);
		process.exit(1);
	}

	process.exit(0);
}

main().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
