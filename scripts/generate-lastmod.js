#!/usr/bin/env node
/**
 * Writes _data/lastmod.json: for every tracked file, the date of the last commit that changed it.
 * The sitemap reads it (see _plugins/lastmod.rb), so <lastmod> is the real date of the content
 * instead of the build date. Needs the full git history (git fetch --unshallow).
 * Files with uncommitted changes get the current time.
 *
 * Re-run: node scripts/generate-lastmod.js   (do it in the PR that changes content)
 */
const { execFileSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const ROOT = path.join(__dirname, '..');
const OUTPUT = path.join(ROOT, '_data', 'lastmod.json');
const git = (...args) => execFileSync('git', args, { cwd: ROOT, encoding: 'utf8', maxBuffer: 256 * 1024 * 1024 });

if (git('rev-parse', '--is-shallow-repository').trim() === 'true') {
  console.error('Shallow clone: run "git fetch --unshallow" first.');
  process.exit(1);
}

const dates = {};
let current = null;
for (const line of git('log', '--no-merges', '--name-only', '--format=@@%cI', '--', '.').split('\n')) {
  if (line.startsWith('@@')) current = line.slice(2);
  else if (line && current && !(line in dates)) dates[line] = current; // newest commit comes first
}

const now = new Date().toISOString().replace(/\.\d+Z$/, 'Z');
for (const line of git('status', '--porcelain', '--untracked-files=all').split('\n')) {
  if (!line.trim()) continue;
  const file = line.slice(3).replace(/^"|"$/g, '').split(' -> ').pop();
  if (file !== '_data/lastmod.json') dates[file] = now;
}

const kept = {};
for (const file of Object.keys(dates).sort()) {
  if (/^(_docs|_posts)\//.test(file) || /\.(md|html)$/.test(file) && !file.startsWith('_') && !file.startsWith('node_modules')) kept[file] = dates[file];
}
delete kept['_data/lastmod.json'];
fs.writeFileSync(OUTPUT, JSON.stringify(kept, null, 1) + '\n');
console.log(`Wrote ${OUTPUT} (${Object.keys(kept).length} files)`);
