/*
  pushContentToFirestore.js
  -------------------------
  Usage:
    - Place your Firebase service account JSON at the path specified by SERVICE_ACCOUNT_PATH
      or set the SERVICE_ACCOUNT_PATH environment variable.
    - Run: node scripts/pushContentToFirestore.js

  What it does:
    - Reads src/data/content.json
    - Uploads each top-level key as a separate document in Firestore collection named 'frontend'
    - Document ID will be the key name (e.g., 'hero', 'features', 'faq')

  Note:
    - This script uses the Firebase Admin SDK and requires network access.
    - Make sure the service account has proper Firestore write permissions.
*/

const fs = require('fs');
const path = require('path');

// Allow using environment variable or fallback path
const SERVICE_ACCOUNT_PATH =
	process.env.SERVICE_ACCOUNT_PATH ||
	path.resolve(__dirname, '../serviceAccountKey.json');
const CONTENT_PATH = path.resolve(__dirname, '../src/data/content.json');

function loadServiceAccount() {
	if (!fs.existsSync(SERVICE_ACCOUNT_PATH)) {
		console.error('Service account key not found at', SERVICE_ACCOUNT_PATH);
		console.error(
			'Set SERVICE_ACCOUNT_PATH or place your serviceAccountKey.json at the project root.'
		);
		process.exit(1);
	}
	const raw = fs.readFileSync(SERVICE_ACCOUNT_PATH, 'utf-8');
	return JSON.parse(raw);
}

function loadContent() {
	if (!fs.existsSync(CONTENT_PATH)) {
		console.error('Content file not found at', CONTENT_PATH);
		process.exit(1);
	}
	const raw = fs.readFileSync(CONTENT_PATH, 'utf-8');
	return JSON.parse(raw);
}

async function main() {
	console.log('Loading service account...');
	const serviceAccount = loadServiceAccount();

	// Initialize Firebase Admin
	const admin = require('firebase-admin');
	try {
		admin.initializeApp({
			credential: admin.credential.cert(serviceAccount),
		});
	} catch (err) {
		// ignore if already initialized in this process
	}

	const db = admin.firestore();
	const content = loadContent();

	const collectionName = 'frontend';
	console.log(
		`Uploading top-level keys from ${CONTENT_PATH} to collection '${collectionName}'`
	);

	const keys = Object.keys(content);
	for (const key of keys) {
		try {
			const docRef = db.collection(collectionName).doc(key);
			const value = content[key];

			// Add a metadata field for traceability
			const payload = {
				data: value,
				_meta: {
					importedAt: admin.firestore.FieldValue.serverTimestamp(),
					sourceFile: path.relative(process.cwd(), CONTENT_PATH),
				},
			};

			await docRef.set(payload, { merge: true });
			console.log(`Uploaded document: ${key}`);
		} catch (err) {
			console.error(`Failed to upload ${key}:`, err.message || err);
		}
	}

	console.log('Done.');
	process.exit(0);
}

main().catch((err) => {
	console.error('Fatal error:', err);
	process.exit(1);
});
