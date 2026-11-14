#!/usr/bin/env node
// Rebuilds _docs/<slug>.md from the Bot Creator API, which is the source of truth of the English
// documentation pages (Manager repo: docs/site/en/). Nothing is edited by hand in _docs/ any more;
// the French pages (fr/docs/) stay hand-written here.
//
//   node scripts/sync-docs-from-api.mjs                         # https://api.bot-creator.fr
//   node scripts/sync-docs-from-api.mjs --api https://dev.bot-creator.fr
//   node scripts/sync-docs-from-api.mjs --from-dir ../bot-creator-manager/docs/site/en
//   add --prune to delete _docs/*.md files the source no longer has, --check to only report a drift.
import { readFile, readdir, writeFile, unlink } from 'node:fs/promises';
import { fileURLToPath } from 'node:url';
import path from 'node:path';

const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const prune = args.includes('--prune');
const check = args.includes('--check');
const fromDir = opt('--from-dir');
const api = (opt('--api') || 'https://api.bot-creator.fr').replace(/\/$/, '');
const outDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '..', '_docs');

async function sources() {
  const out = new Map();
  if (fromDir) {
    for (const f of (await readdir(fromDir)).filter((n) => n.endsWith('.md'))) {
      out.set(f.slice(0, -3), (await readFile(path.join(fromDir, f), 'utf8')).replace(/\r\n/g, '\n'));
    }
    return out;
  }
  const get = async (url) => {
    const res = await fetch(url, { headers: { accept: 'application/json' } });
    if (!res.ok) throw new Error(`${url}: HTTP ${res.status}`);
    return res.json();
  };
  const index = await get(`${api}/docs/index.json`);
  const slugs = index.docs.map((d) => d.slug);
  let next = 0;
  await Promise.all(Array.from({ length: 8 }, async () => {
    while (next < slugs.length) {
      const slug = slugs[next++];
      const doc = await get(`${api}/docs/${slug}.json`);
      if (typeof doc.source === 'string' && doc.source) out.set(slug, doc.source);
    }
  }));
  return out;
}

const want = await sources();
if (want.size < 100) throw new Error(`only ${want.size} pages received, refusing to touch _docs/`);
const have = new Set((await readdir(outDir)).filter((n) => n.endsWith('.md')).map((n) => n.slice(0, -3)));
let changed = 0;
for (const [slug, text] of want) {
  const file = path.join(outDir, `${slug}.md`);
  const current = have.has(slug) ? (await readFile(file, 'utf8')).replace(/\r\n/g, '\n') : null;
  if (current === text) continue;
  changed++;
  console.log(`${current === null ? 'add   ' : 'update'} _docs/${slug}.md`);
  if (!check) await writeFile(file, text, 'utf8');
}
for (const slug of have) {
  if (want.has(slug)) continue;
  console.log(`${prune ? 'delete' : 'extra '} _docs/${slug}.md`);
  if (prune) { changed++; if (!check) await unlink(path.join(outDir, `${slug}.md`)); }
}
console.log(`${changed} change(s)${check ? ' (check only)' : ''}.`);
if (check && changed) process.exit(1);
