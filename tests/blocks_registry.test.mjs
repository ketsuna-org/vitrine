import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const json = async (f) => JSON.parse(await readFile(path.join(root, f), 'utf8'));
const registry = await json('_data/blocks_registry.json');
const examples = await json('_data/blocks_examples.json');
const sprite = await readFile(path.join(root, 'assets/icons/app-blocks.svg'), 'utf8');
const byType = new Map(registry.blocks.map((b) => [b.type, b]));

test('registry blocks are complete and consistent with the app palette data', () => {
  assert.ok(registry.blocks.length >= 100, 'the registry should hold every block type of the app');
  assert.equal(byType.size, registry.blocks.length, 'block types are unique');
  for (const b of registry.blocks) {
    assert.ok(b.name, `${b.type} has a displayed name`);
    assert.ok(!('description' in b), `${b.type}: the app has no per-block description any more`);
    assert.ok(registry.families[b.family], `${b.type}: family ${b.family} exists`);
    assert.match(registry.families[b.family].color, /^#[0-9A-F]{6}$/);
    assert.ok(sprite.includes(`id="${b.icon}"`), `${b.type}: icon ${b.icon} is in assets/icons/app-blocks.svg`);
    const seen = new Map();
    for (const f of b.fields) {
      assert.ok(f.key && f.label && f.type, `${b.type}: field has key, label and type`);
      // The app may declare one key twice when each declaration is visible for a different mode.
      assert.ok(!seen.has(f.key) || (seen.get(f.key).visibleWhen && f.visibleWhen), `${b.type}: duplicate field ${f.key}`);
      seen.set(f.key, f);
      assert.ok(!(f.default && f.default.expr), `${b.type}.${f.key}: default value was not parsed (${f.default?.expr})`);
    }
  }
});

test('registry still matches the app sources when a checkout is available', { skip: !appDir() }, () => {
  execFileSync('node', [path.join(root, 'scripts/extract-blocks-registry.mjs'), '--app', appDir(), '--check'], { stdio: 'pipe' });
});

function appDir() {
  const dir = process.env.BOT_CREATOR_APP_DIR ?? path.join(root, '..', 'bot-creator');
  return existsSync(path.join(dir, 'packages/ui/lib/src/editor/catalog/action_type_extension.dart')) ? dir : null;
}

const KNOWN_PREFIXES = ['action.', 'opts.', 'arg.', 'interaction.'];
const knownVariable = (name) =>
  registry.variables.some((v) => v.toLowerCase() === name.toLowerCase()) || KNOWN_PREFIXES.some((p) => name.startsWith(p));

const pinExists = (block, pin) => block.pins.some((p) => p === pin || (p.includes('<') && pin.startsWith(p.slice(0, p.indexOf('<')))));

function checkValues(where, type, values) {
  const block = byType.get(type);
  assert.ok(block, `${where}: unknown block type ${type}`);
  for (const [key, value] of Object.entries(values ?? {})) {
    const field = block.fields.find((f) => f.key === key);
    assert.ok(field, `${where}: ${type} has no field "${key}" in the app (fields: ${block.fields.map((f) => f.key).join(', ')})`);
    if (field.type === 'multiSelect' && field.options) {
      assert.ok(field.options.includes(String(value)), `${where}: ${type}.${key}="${value}" is not one of ${field.options.join(', ')}`);
    }
    for (const m of JSON.stringify(value).matchAll(/\(\(([^()]+)\)\)/g)) {
      assert.ok(knownVariable(m[1]), `${where}: ((${m[1]})) is not a variable of the app`);
    }
  }
}

// An example is one node plus, per output pin, the nodes linked to that pin (`branches`).
function checkExample(where, ex) {
  checkValues(where, ex.type, ex.values);
  const block = byType.get(ex.type);
  for (const [pin, items] of Object.entries(ex.branches ?? {})) {
    assert.ok(pinExists(block, pin), `${where}: ${ex.type} has no pin "${pin}" (pins: ${block.pins.join(', ')})`);
    for (const item of items) checkExample(`${where} > ${pin}`, item);
  }
}

test('the registry describes the graph model from the app sources', () => {
  assert.equal(registry.graph.version, 2);
  assert.equal(registry.graph.startId, 'start');
  assert.deepEqual(registry.graph.controlTypes, ['ifBlock', 'forLoop', 'jsonForEachLoop', 'tryCatch', 'switch']);
  assert.deepEqual(registry.graph.loopTypes, ['forLoop', 'jsonForEachLoop', 'whileLoop', 'asyncBlock']);
  assert.deepEqual(registry.graph.regionOwners, ['forLoop', 'jsonForEachLoop', 'whileLoop', 'asyncBlock', 'tryCatch']);
  for (const t of ['whileLoop', 'asyncBlock', 'breakLoop', 'continueLoop']) assert.ok(byType.has(t), `${t} is a node type`);
  assert.deepEqual(byType.get('whileLoop').pins, ['body', 'done', 'error']);
  assert.deepEqual(byType.get('breakLoop').pins, ['error']);
  assert.ok(registry.blocks.every((b) => !('terminal' in b)), 'no final-block notion in the app any more');
  assert.deepEqual(registry.graph.legacyTypes, ['skipActions', 'jumpToAction']);
  for (const t of registry.graph.legacyTypes) assert.ok(!byType.has(t), `${t} is not a node type any more`);
  for (const t of registry.graph.controlTypes) assert.ok(byType.has(t), `${t} is a node type`);
  for (const t of registry.graph.inlineGraphTypes) assert.ok(byType.has(t), `${t} is a node type`);
  assert.deepEqual(byType.get('ifBlock').pins, ['then', 'elseif:<i>', 'else', 'error']);
  assert.deepEqual(byType.get('forLoop').pins, ['body', 'done', 'error']);
  assert.deepEqual(byType.get('tryCatch').pins, ['try', 'catch', 'done', 'error']);
  assert.deepEqual(byType.get('switch').pins, ['case:<value>', 'default', 'error']);
  assert.deepEqual(byType.get('wait').pins, ['next', 'error']);
  for (const b of registry.blocks) assert.ok(!b.fields.some((f) => f.type === 'nestedActions'), `${b.type}: nested action lists are gone`);
});

test('every example of the docs only uses blocks, fields and options that exist in the app', () => {
  for (const [id, ex] of Object.entries(examples)) checkExample(`example ${id}`, ex);
});

const docs = (await readdir(path.join(root, '_docs'))).filter((f) => /^(blocks|tickets)/.test(f));

test('doc pages only reference registry blocks, examples and events', async () => {
  for (const file of docs) {
    const text = await readFile(path.join(root, '_docs', file), 'utf8');
    for (const m of text.matchAll(/\{% app_block ([^%]*)%\}/g)) {
      const type = m[1].match(/type="([^"]+)"/)?.[1];
      const example = m[1].match(/example="([^"]+)"/)?.[1];
      if (type) assert.ok(byType.has(type), `${file}: app_block type ${type} is not in the app registry`);
      if (example) assert.ok(examples[example], `${file}: unknown example ${example}`);
    }
    for (const m of text.matchAll(/\{% app_entry ([^%]*)%\}/g)) {
      const event = m[1].match(/event="([^"]+)"/)?.[1];
      if (event) assert.ok(registry.events.some((e) => e.event === event), `${file}: unknown event ${event}`);
      const kind = m[1].match(/kind="([^"]+)"/)?.[1];
      if (kind) assert.ok(registry.entryPoint.segments.some((s) => s.kind === kind), `${file}: unknown command kind ${kind}`);
    }
  }
});

test('Blocks pages do not describe blocks with raw JSON outside a folded reference', async () => {
  for (const file of docs.filter((f) => f !== 'tickets.md')) {
    const lines = (await readFile(path.join(root, '_docs', file), 'utf8')).split('\n');
    let folded = 0;
    lines.forEach((line, i) => {
      folded += (line.match(/<details/g) ?? []).length - (line.match(/<\/details>/g) ?? []).length;
      if (/^```json/.test(line)) assert.ok(folded > 0, `${file}:${i + 1}: a JSON block must sit inside a folded <details> reference`);
    });
  }
});

test('Blocks pages do not hardcode counts that the registry already knows', async () => {
  for (const file of docs) {
    const text = await readFile(path.join(root, '_docs', file), 'utf8');
    assert.doesNotMatch(text, /\b\d{2,3}\+?\s+(?:no-code\s+)?(?:blocks|actions)\b/i, `${file}: use the registry count instead of a literal`);
  }
});
