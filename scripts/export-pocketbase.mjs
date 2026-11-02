// Exports PocketBase content into static files the website reads at runtime.
//
//   1. Start PocketBase locally (./pocketbase serve) with your pb_data
//   2. node scripts/export-pocketbase.mjs
//   3. git add public/data public/files && git commit && git push
//
// Env vars (all optional):
//   PB_URL    default http://127.0.0.1:8090
//   PB_EMAIL / PB_PASSWORD  superuser login, only needed if a collection is not publicly listable
import fs from 'fs';
import path from 'path';

const PB_URL = (process.env.PB_URL || 'http://127.0.0.1:8090').replace(/\/$/, '');
const OUT_DATA = 'public/data';
const OUT_FILES = 'public/files';

// Collections the website reads. (messages/users are private and intentionally not exported.)
const COLLECTIONS = [
  'profile', 'settings', 'taglines', 'keywords', 'showcase', 'projects', 'skills',
  'tools', 'education', 'certifications', 'achievements', 'faqs', 'legals', 'action',
];
// File-type fields per collection (add here if you add a new image/file field).
const FILE_FIELDS = {
  profile: ['avatar', 'resume'],
  settings: ['og_image', 'favicon'],
  projects: ['image'],
  tools: ['logo'],
};

let token = '';
async function api(url) {
  const res = await fetch(url, { headers: token ? { Authorization: token } : {} });
  if (!res.ok) throw new Error(`${res.status} ${res.statusText} for ${url}`);
  return res;
}

async function login() {
  if (!process.env.PB_EMAIL) return;
  const res = await fetch(`${PB_URL}/api/collections/_superusers/auth-with-password`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ identity: process.env.PB_EMAIL, password: process.env.PB_PASSWORD }),
  });
  if (!res.ok) throw new Error('Superuser login failed');
  token = (await res.json()).token;
}

await login();
await api(`${PB_URL}/api/health`); // fail fast if PocketBase isn't running

fs.rmSync(OUT_DATA, { recursive: true, force: true });
fs.rmSync(OUT_FILES, { recursive: true, force: true });
fs.mkdirSync(OUT_DATA, { recursive: true });

let fileCount = 0;
for (const name of COLLECTIONS) {
  const items = [];
  for (let page = 1; ; page++) {
    const body = await (await api(`${PB_URL}/api/collections/${name}/records?page=${page}&perPage=200`)).json();
    items.push(...body.items);
    if (page >= body.totalPages) break;
  }
  fs.writeFileSync(path.join(OUT_DATA, `${name}.json`), JSON.stringify({ items }, null, 2));
  console.log(`✔ ${name}: ${items.length} record(s)`);

  for (const rec of items) {
    for (const field of FILE_FIELDS[name] || []) {
      const files = [].concat(rec[field] || []).filter(Boolean);
      for (const file of files) {
        const dest = path.join(OUT_FILES, rec.collectionId, rec.id, file);
        fs.mkdirSync(path.dirname(dest), { recursive: true });
        const buf = Buffer.from(await (await api(`${PB_URL}/api/files/${rec.collectionId}/${rec.id}/${file}`)).arrayBuffer());
        fs.writeFileSync(dest, buf);
        fileCount++;
      }
    }
  }
}
console.log(`✔ ${fileCount} file(s) downloaded`);
