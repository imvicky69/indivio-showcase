Push content.json to Firestore

This repository includes a small helper script to push the centralized `src/data/content.json` into Firestore as separate documents under the `frontend` collection.

Files:

- `scripts/pushContentToFirestore.js` - Node.js script that reads `src/data/content.json` and writes each top-level key as a document.

How to use:

1. Install dependencies (if not already):

   npm install

2. Place your Firebase service account JSON at the project root named `serviceAccountKey.json`, or set the environment variable `SERVICE_ACCOUNT_PATH` to the path of the JSON file.

3. Run the script:

   node scripts/pushContentToFirestore.js

Notes:

- The script will create documents in the `frontend` collection with document IDs matching the top-level keys in `content.json` (e.g., `hero`, `features`).
- Each document will have a `data` field containing the actual content and a `_meta` field with `importedAt` timestamp.
- Do NOT commit your service account JSON to source control. Add `serviceAccountKey.json` to your `.gitignore`.

Example `SERVICE_ACCOUNT_PATH` usage (Windows PowerShell):

$env:SERVICE_ACCOUNT_PATH = 'C:\path\to\serviceAccountKey.json'; node scripts/pushContentToFirestore.js

## Sync script (push and pull)

New file: `scripts/sync.config.json` controls default operation.

CLI usage:

- Push local -> Firestore (override config):

  node scripts/syncContent.js push

- Pull Firestore -> local (override config):

  node scripts/syncContent.js pull

Default behavior is controlled by `scripts/sync.config.json` `mode` key.

Safety:

- Pull will back up your current `src/data/content.json` to the `scripts/backups` folder by default.
