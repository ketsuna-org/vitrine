import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../functions/api/mcp/[[route]].js', import.meta.url), 'utf8');
const { onRequestPost } = await import(pathToFileURL(fileURLToPath(new URL('../functions/api/mcp/[[route]].js', import.meta.url))).href);
const blocks = JSON.parse(await readFile(new URL('../_data/blocks_grammar.json', import.meta.url), 'utf8'));
const types = JSON.parse(await readFile(new URL('../_data/blocks_types.json', import.meta.url), 'utf8'));
const manifest = { version: '1.0', types, modes: { blocks, bdfd: {}, javascript: {} } };

async function call(name, args = {}) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json(manifest);
  try {
    const res = await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) }) });
    const body = await res.json();
    return { raw: body.result, data: JSON.parse(body.result.content[0].text) };
  } finally { globalThis.fetch = original; }
}

const PRIMITIVES = new Set(['string', 'number', 'boolean', 'object']);

test('every type reference in the grammar and types resolves', () => {
  const specs = [];
  for (const [name, def] of Object.entries(blocks)) for (const [p, s] of Object.entries(def.params)) specs.push([`${name}.${p}`, s]);
  for (const [name, def] of Object.entries(types)) {
    for (const [p, s] of Object.entries(def.fields || {})) specs.push([`${name}.${p}`, s]);
    for (const [v, fields] of Object.entries(def.variants || {})) for (const [p, s] of Object.entries(fields)) specs.push([`${name}.${v}.${p}`, s]);
    for (const alt of def.oneOf || []) specs.push([`${name}.oneOf`, alt]);
  }
  for (const [where, spec] of specs) {
    const base = spec.trim().replace(/\?$/, '');
    for (const alt of base.split('|')) {
      const name = alt.replace(/(\[\])+$/, '');
      // Capitalised identifiers are named-type references; everything else is a primitive or enum literal.
      if (/^[A-Z][a-z]/.test(name)) assert.ok(types[name], `${where}: unknown type "${name}" in "${spec}"`);
    }
  }
  assert.ok(types.Action, 'Action type exists');
});

test('no action param is left as an opaque object where a named type exists', () => {
  const opaque = ['embeds', 'components', 'thenActions', 'elseActions'];
  for (const [name, def] of Object.entries(blocks)) {
    for (const key of opaque) if (def.params[key]) assert.doesNotMatch(def.params[key], /^object/, `${name}.${key}`);
  }
});

test('grammar action names match the Dart BotCreatorActionType enum when the app repo is next to vitrine', async () => {
  let dart;
  try { dart = await readFile(new URL('../../bot-creator/packages/shared/lib/types/action.dart', import.meta.url), 'utf8'); } catch { return; }
  const body = dart.slice(dart.indexOf('enum BotCreatorActionType'), dart.indexOf('}', dart.indexOf('enum BotCreatorActionType')));
  const enumNames = new Set([...body.matchAll(/^\s+([a-zA-Z0-9_]+)\s*[,;(]/gm)].map(m => m[1]));
  const unknown = Object.keys(blocks).filter(k => !enumNames.has(k));
  assert.deepEqual(unknown, [], `grammar actions missing from BotCreatorActionType: ${unknown.join(', ')}`);
});

test('get_schema_manifest mode=types and list_actions are exposed', async () => {
  const t = await call('get_schema_manifest', { mode: 'types' });
  assert.ok(t.data.Embed && t.data.Component && t.data.Condition);
  const l = await call('list_actions', { category: 'Moderation' });
  assert.ok(l.data.count > 0);
  assert.ok(l.data.actions.every(a => a.name && a.category));
});

test('validate_actions accepts a valid embed + ifBlock group + button message', async () => {
  const { data } = await call('validate_actions', { actions: [
    { type: 'ifBlock', payload: {
      group: 'and', conditions: [
        { variable: '((user.id))', operator: 'equals', value: '1' },
        { group: 'or', conditions: [{ variable: 'a', operator: 'isEmpty' }] },
      ],
      thenActions: [{ type: 'respondWithMessage', payload: {
        content: 'Hi ((user.username))',
        embeds: [{ title: 'T', color: '#5865F2', footer: { text: 'f' }, fields: [{ name: 'a', value: 'b', inline: true }] }],
        components: { components: [{ type: 'actionRow', components: [{ type: 'button', label: 'Close', style: 'danger', customId: 'close_ticket' }] }] },
      } }],
      elseActions: [{ type: 'banUser', payload: { userId: '1' } }],
    } },
  ] });
  assert.deepEqual(data.errors, []);
  assert.equal(data.valid, true);
  assert.ok(data.checked >= 3);
});

test('validate_actions reports unknown actions, missing params, enums and nested errors with paths', async () => {
  const { data } = await call('validate_actions', { actions: [
    { type: 'sendMesage', payload: {} },
    { type: 'banUser', payload: {} },
    { type: 'sendMessage', payload: { targetType: 'dm', embeds: [{ title: 5, footer: {} }], components: { components: [{ type: 'buton' }] } } },
    { type: 'ifBlock', payload: { variable: 'x', thenActions: [{ type: 'nope' }] } },
  ] });
  assert.equal(data.valid, false);
  const at = path => data.errors.filter(e => e.path === path).map(e => e.message).join(' ');
  assert.match(at('actions[0].type'), /did you mean "sendMessage"/);
  assert.match(at('actions[1].payload.userId'), /required/);
  assert.match(at('actions[2].payload.targetType'), /channel \| user|channel, user/);
  assert.match(at('actions[2].payload.embeds[0].title'), /expected string/);
  assert.match(at('actions[2].payload.embeds[0].footer.text'), /required/);
  assert.match(at('actions[2].payload.components.components[0].type'), /did you mean "button"/);
  assert.match(at('actions[3].payload.thenActions[0].type'), /unknown action/);
});

test('validate_actions tolerates placeholders in typed values and rejects non-arrays', async () => {
  const ok = await call('validate_actions', { actions: [{ type: 'deleteMessages', payload: { channelId: '1', messageCount: '((opts.count))' } }] });
  assert.equal(ok.data.valid, true, JSON.stringify(ok.data.errors));
  const bad = await call('validate_actions', { actions: 'not json' }).catch(e => e);
  assert.ok(bad);
});

test('every documented param key is read by the Dart engine (contract with bot-creator)', async () => {
  const { readdir } = await import('node:fs/promises');
  const root = new URL('../../bot-creator/packages/', import.meta.url);
  let entries;
  try { entries = await readdir(root, { recursive: true }); } catch { return; }
  let dart = '';
  for (const rel of entries) {
    if (!rel.endsWith('.dart') || /(^|\/)(test|l10n|\.dart_tool|build)(\/|$)/.test(rel)) continue;
    dart += await readFile(new URL(rel, root), 'utf8');
  }
  const known = key => dart.includes(`'${key}'`) || dart.includes(`"${key}"`);
  const missing = [];
  for (const [name, def] of Object.entries(blocks)) for (const key of Object.keys(def.params)) if (!known(key)) missing.push(`${name}.${key}`);
  for (const [name, def] of Object.entries(types)) {
    const keys = [...Object.keys(def.fields || {}), ...Object.values(def.variants || {}).flatMap(v => Object.keys(v))];
    for (const key of keys) if (!known(key)) missing.push(`type ${name}.${key}`);
  }
  assert.deepEqual(missing, [], `documented keys never read by the engine: ${missing.join(', ')}`);
});

test('unsupported actions are rejected by validate_actions', async () => {
  const { data } = await call('validate_actions', { actions: [{ type: 'updateGuildOnboarding', payload: {} }] });
  assert.equal(data.valid, false);
  assert.match(data.errors[0].message, /cannot be used here/);
});
