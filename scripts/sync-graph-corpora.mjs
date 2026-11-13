#!/usr/bin/env node
/**
 * Copie les corpus de conformité du graphe depuis l'app (source de vérité : Dart) vers tests/fixtures.
 *
 *   node scripts/sync-graph-corpora.mjs [--app ../bot-creator] [--check]
 *
 * `--check` ne copie rien et sort en erreur si une copie diffère (utilisé par tests/graph_corpus.test.mjs
 * quand le dépôt de l'app est disponible).
 */
import { copyFile, readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

export const CORPORA = ['graph_conversion_corpus.json', 'ensure_graph_corpus.json', 'graph_validation_corpus.json', 'bdfd_roundtrip_corpus.json'];

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const appDir = path.resolve(opt('--app') ?? process.env.BOT_CREATOR_APP_DIR ?? path.join(root, '..', 'bot-creator'));
const from = (name) => path.join(appDir, 'packages/shared/test/fixtures', name);
const to = (name) => path.join(root, 'tests/fixtures', name);

let stale = 0;
for (const name of CORPORA) {
  if (args.includes('--check')) {
    const same = (await readFile(from(name))).equals(await readFile(to(name)));
    if (!same) { console.error(`${name} differs from the app fixture`); stale++; }
  } else {
    await copyFile(from(name), to(name));
    console.log(`copied ${name}`);
  }
}
process.exit(stale ? 1 : 0);
