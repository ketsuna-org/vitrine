#!/usr/bin/env node
/**
 * Extracts the French (or another language) texts of the Bot Creator blocks from the app's own
 * translation file into `_data/blocks_i18n_<lang>.json`, which the playground reads.
 *
 *   node scripts/extract-blocks-i18n.mjs --app ../bot-creator --lang fr
 *
 * Source: packages/ui/lib/src/l10n/app_<lang>.arb. Keys come from the English registry
 * (_data/blocks_registry.json): action_name_<type>, action_description_<type>, action_category_*,
 * embed labels and the common fields. Descriptions: the app no longer has action_description_*, the ones already
 * in the output file are kept. A key missing from the language file is left out (the
 * playground then shows the English text); nothing is invented.
 * Field labels and hints are not translated in the app itself, so they stay English here too.
 */
import { readFile, writeFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const appDir = path.resolve(opt('--app') ?? process.env.BOT_CREATOR_APP_DIR ?? path.join(root, '..', 'bot-creator'));
const lang = opt('--lang') ?? 'fr';

const arb = JSON.parse(await readFile(path.join(appDir, `packages/ui/lib/src/l10n/app_${lang}.arb`), 'utf8'));
const reg = JSON.parse(await readFile(path.join(root, '_data/blocks_registry.json'), 'utf8'));

// Nœuds de contrôle absents de l'enum de l'app (donc des fichiers ARB) : textes français écrits ici.
const controlTexts = {
  fr: {
    tryCatch: ['Essayer / Attraper', "Exécute la région `try` ; si une action échoue, `error.*` est renseigné et la région `catch` s'exécute ; puis `done`."],
    switch: ['Aiguillage', 'Compare une valeur aux pins `case:<valeur>` et suit celui qui correspond, sinon `default`.'],
  },
}[lang] ?? {};

// L'app n'a plus de clés action_description_* : les descriptions vivent dans la vitrine (fr : le fichier généré
// précédent, en : _data/blocks_descriptions.json). On les garde au lieu de les effacer.
const outPath = path.join(root, `_data/blocks_i18n_${lang}.json`);
const previous = JSON.parse(await readFile(outPath, 'utf8').catch(() => '{}')).descriptions ?? {};
const names = {}, descriptions = { ...previous }, categories = {};
for (const b of reg.blocks) {
  if (controlTexts[b.type]) [names[b.type], descriptions[b.type]] = controlTexts[b.type];
  if (arb[`action_name_${b.type}`]) names[b.type] = arb[`action_name_${b.type}`];
  if (arb[`action_description_${b.type}`]) descriptions[b.type] = arb[`action_description_${b.type}`];
  const catKey = 'action_category_' + b.category.toLowerCase().replace(/&/g, '').trim().replace(/\s+/g, '_');
  if (arb[catKey]) categories[b.category] = arb[catKey];
}
const embedLabels = {};
for (const k of Object.keys(reg.embedLabels)) if (arb[k]) embedLabels[k] = arb[k];

const out = {
  _generated: 'scripts/extract-blocks-i18n.mjs — do not edit by hand',
  lang,
  names, descriptions, categories, embedLabels,
  actionKey: arb.action_key_field ?? null,
};
await writeFile(outPath, JSON.stringify(out, null, 2) + '\n');
const total = reg.blocks.length;
console.log(`${lang}: ${Object.keys(names).length}/${total} names, ${Object.keys(descriptions).length} descriptions, ${Object.keys(categories).length} categories, ${Object.keys(embedLabels).length} embed labels`);
const missing = reg.blocks.filter((b) => !names[b.type]).map((b) => b.type);
if (missing.length) console.log('without a name in', lang + ':', missing.join(', '));
