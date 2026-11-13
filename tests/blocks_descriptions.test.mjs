import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (f) => readFile(path.join(root, f), 'utf8');
const registry = JSON.parse(await read('_data/blocks_registry.json'));
const en = JSON.parse(await read('_data/blocks_descriptions.json')).descriptions;
const fr = JSON.parse(await read('_data/blocks_i18n_fr.json')).descriptions;

test('chaque type de nœud du registre a une description en anglais et en français', () => {
  for (const b of registry.blocks) {
    assert.ok(en[b.type]?.trim(), `${b.type}: description anglaise manquante`);
    assert.ok(fr[b.type]?.trim(), `${b.type}: description française manquante`);
  }
  for (const type of Object.keys(en)) assert.ok(registry.blocks.some((b) => b.type === type), `${type}: description d'un type inconnu`);
});

test('la page du dictionnaire affiche la description de chaque nœud', async () => {
  assert.match(await read('_docs/blocks-dictionary.md'), /blocks_descriptions\.descriptions\[b\.type\]/);
});

test("le vocabulaire retiré n'est plus dans les données du dictionnaire", () => {
  for (const text of [...Object.values(en), ...Object.values(fr)]) assert.doesNotMatch(text, /skipActions|jumpToAction|thenActions|depend_on/);
});
