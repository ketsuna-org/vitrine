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

async function rpcRaw(name, args = {}) {
  const original = globalThis.fetch;
  globalThis.fetch = async () => Response.json(manifest);
  try {
    const res = await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) }) });
    const body = await res.json();
    return body.result;
  } finally { globalThis.fetch = original; }
}

const PRIMITIVES = new Set(['string', 'number', 'boolean', 'object']);

/** Un graphe en chaîne : start -> n1 -> n2 ... ; `nodes` = [{ type, key?, payload? }]. */
const chain = (nodes, extra = {}) => ({
  version: 2,
  nodes: nodes.map((n, i) => ({ id: `n${i + 1}`, key: `action_${i}`, enabled: true, payload: {}, ...n })),
  links: [{ from: { node: 'start', pin: 'next' }, to: 'n1' }, ...nodes.slice(1).map((_, i) => ({ from: { node: `n${i + 1}`, pin: 'next' }, to: `n${i + 2}` }))],
  data: [],
  ...extra,
});
const at = (data, path) => data.errors.filter(e => e.path === path).map(e => e.message).join(' ');

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
  assert.ok(types.Graph && types.GraphNode && types.GraphLink, 'graph types exist');
  assert.ok(!types.Action, 'the nested Action type is gone');
});

test('no nested action list is left in the grammar or the types', () => {
  const nested = ['thenActions', 'elseActions', 'bodyActions', 'actions'];
  for (const [name, def] of Object.entries(blocks)) {
    for (const key of nested) assert.ok(!(key in def.params), `${name}.${key} is a nested list: use pins or \`graph\``);
    for (const [key, spec] of Object.entries(def.params)) assert.doesNotMatch(spec, /Action\[\]/, `${name}.${key}`);
  }
  for (const [name, def] of Object.entries(types)) for (const fields of [def.fields || {}, ...Object.values(def.variants || {})]) {
    for (const [key, spec] of Object.entries(fields)) assert.doesNotMatch(spec, /Action\[\]/, `${name}.${key}`);
  }
  assert.ok(!blocks.skipActions && !blocks.jumpToAction, 'legacy navigation types are switch nodes now');
});

test('no action param is left as an opaque object where a named type exists', () => {
  const opaque = ['embeds', 'components', 'graph'];
  for (const [name, def] of Object.entries(blocks)) {
    for (const key of opaque) if (def.params[key]) assert.doesNotMatch(def.params[key], /^object/, `${name}.${key}`);
  }
});

test('grammar node types match the Dart node types when the app repo is next to vitrine', async () => {
  let dart;
  try { dart = await readFile(new URL('../../bot-creator/packages/shared/lib/types/action.dart', import.meta.url), 'utf8'); } catch { return; }
  const body = dart.slice(dart.indexOf('enum BotCreatorActionType'), dart.indexOf('}', dart.indexOf('enum BotCreatorActionType')));
  const enumNames = new Set([...body.matchAll(/^\s+([a-zA-Z0-9_]+)\s*[,;(]/gm)].map(m => m[1]));
  const known = new Set([...enumNames, 'tryCatch', 'switch', 'whileLoop', 'asyncBlock', 'breakLoop', 'continueLoop']);
  const unknown = Object.keys(blocks).filter(k => !known.has(k));
  assert.deepEqual(unknown, [], `grammar node types missing from the app: ${unknown.join(', ')}`);
  // The grammar IS the closed list of node types: every enum type except the legacy navigation ones.
  const missing = [...enumNames].filter(k => !blocks[k] && !['skipActions', 'jumpToAction'].includes(k));
  assert.deepEqual(missing, [], `app node types missing from the grammar: ${missing.join(', ')}`);
});

test('get_schema_manifest mode=types and list_actions are exposed', async () => {
  const t = await call('get_schema_manifest', { mode: 'types' });
  assert.ok(t.data.Embed && t.data.Component && t.data.Condition && t.data.Graph);
  const l = await call('list_actions', { category: 'Moderation' });
  assert.ok(l.data.count > 0);
  assert.ok(l.data.actions.every(a => a.name && a.category));
});

test('validate_graph accepts a valid graph: embed, ifBlock pins and a button message', async () => {
  const graph = {
    version: 2,
    nodes: [
      { id: 'n1', type: 'ifBlock', key: 'action_0', payload: { 'condition.variable': '((user.id))', 'condition.operator': 'equals', 'condition.value': '1' } },
      { id: 'n2', type: 'respondWithMessage', key: 'action_1', payload: {
        content: 'Hi ((user.username))',
        embeds: [{ title: 'T', color: '#5865F2', footer: { text: 'f' }, fields: [{ name: 'a', value: 'b', inline: true }] }],
        components: { components: [{ type: 'actionRow', components: [{ type: 'button', label: 'Close', style: 'danger', customId: 'close_ticket' }] }] },
      } },
      { id: 'n3', type: 'banUser', key: 'action_2', payload: { userId: '1' } },
    ],
    links: [
      { from: { node: 'start', pin: 'next' }, to: 'n1' },
      { from: { node: 'n1', pin: 'then' }, to: 'n2' },
      { from: { node: 'n1', pin: 'else' }, to: 'n3' },
    ],
    data: [],
  };
  const { data } = await call('validate_graph', { graph });
  assert.deepEqual(data.errors, []);
  assert.equal(data.valid, true);
  assert.equal(data.checked, 3);
});

test('validate_graph reports unknown nodes, missing params, enums and nested errors with paths', async () => {
  const { data } = await call('validate_graph', { graph: chain([
    { type: 'sendMesage' },
    { type: 'banUser' },
    { type: 'sendMessage', payload: { targetType: 'dm', embeds: [{ title: 5, footer: {} }], components: { components: [{ type: 'buton' }] } } },
  ]) });
  assert.equal(data.valid, false);
  assert.match(at(data, 'graph.nodes[0].type'), /did you mean "sendMessage"/);
  assert.match(at(data, 'graph.nodes[1].payload.userId'), /required/);
  assert.match(at(data, 'graph.nodes[2].payload.targetType'), /channel \| user|channel, user/);
  assert.match(at(data, 'graph.nodes[2].payload.embeds[0].title'), /expected string/);
  assert.match(at(data, 'graph.nodes[2].payload.embeds[0].footer.text'), /required/);
  assert.match(at(data, 'graph.nodes[2].payload.components.components[0].type'), /did you mean "button"/);
  assert.equal(data.errors.filter(e => e.code === 'unknown_node_type').length, 0, 'the grammar answers for unknown types, once');
});

test('validate_graph reports structural errors with a stable code', async () => {
  const cyclic = chain([{ type: 'wait', payload: { duration: '1s' } }, { type: 'wait', payload: { duration: '1s' } }]);
  cyclic.links.push({ from: { node: 'n2', pin: 'next' }, to: 'n1' });
  const badPin = chain([{ type: 'wait', payload: { duration: '1s' } }]);
  badPin.links.push({ from: { node: 'n1', pin: 'then' }, to: 'n1' });
  for (const [graph, code] of [[cyclic, 'flow_cycle'], [badPin, 'invalid_pin']]) {
    const { data } = await call('validate_graph', { graph });
    assert.equal(data.valid, false);
    assert.ok(data.errors.some(e => e.code === code), `${code}: ${JSON.stringify(data.errors)}`);
  }
  const unversioned = await call('validate_graph', { graph: { nodes: [], links: [] } });
  assert.equal(unversioned.data.valid, false);
  assert.match(unversioned.data.errors[0].message, /Unsupported graph version/);
});

test('validate_graph checks inline sub-graphs (listeners, modals, buttons) recursively', async () => {
  const inner = chain([{ type: 'nope' }]);
  const { data } = await call('validate_graph', { graph: chain([{ type: 'listenAndExecute', payload: { customId: 'x', graph: inner } }]) });
  assert.equal(data.valid, false);
  assert.match(at(data, 'graph.nodes[0].payload.graph.nodes[0].type'), /unknown action/);
});

test('validate_graph accepts the legacy action list and answers with the converted graph', async () => {
  const { data } = await call('validate_graph', { actions: [
    { type: 'ifBlock', payload: {
      'condition.variable': '((user.id))', 'condition.operator': 'equals', 'condition.value': '1',
      thenActions: [{ type: 'respondWithMessage', payload: { content: 'Hi' } }],
      elseActions: [{ type: 'banUser', payload: { userId: '1' } }],
    } },
    { type: 'wait', payload: { duration: '1s' } },
  ] });
  assert.deepEqual(data.errors, []);
  assert.equal(data.valid, true);
  assert.equal(data.converted, true);
  assert.equal(data.graph.version, 2);
  assert.deepEqual(data.graph.nodes.map(n => n.type), ['ifBlock', 'respondWithMessage', 'banUser', 'wait']);
  assert.ok(data.graph.links.some(l => l.from.node === 'n1' && l.from.pin === 'then' && l.to === 'n2'));
  assert.deepEqual(data.conversionWarnings, []);
  const bad = await call('validate_graph', { actions: [{ type: 'ifBlock', payload: { thenActions: [{ type: 'nope' }] } }] });
  assert.equal(bad.data.valid, false);
  assert.match(at(bad.data, 'graph.nodes[1].type'), /unknown action/);
  const noType = await call('validate_graph', { actions: [{ payload: {} }] }).catch(e => e);
  assert.ok(noType);
});

test('validate_graph accepts a whole legacy command and validates each graph it carries', async () => {
  const entity = { name: 'ping', data: { executionMode: 'workflow', actions: [{ type: 'respondWithMessage', payload: { content: 'Pong' } }],
    subcommandWorkflows: { 'a b': { actions: [{ type: 'banUser', payload: {} }] } } } };
  const { data } = await call('validate_graph', { entity });
  assert.equal(data.converted, true);
  assert.equal(data.entity.data.executionMode, 'graph');
  assert.equal(data.valid, false);
  assert.match(at(data, 'data.subcommandWorkflows.a b.graph.nodes[0].payload.userId'), /required/);
  const script = await call('validate_graph', { entity: { name: 'x', data: { executionMode: 'bdfd_script', bdfdScriptContent: 'hi' } } });
  assert.equal(script.data.valid, true);
  assert.equal(script.data.converted, false);
});

test('validate_graph needs exactly one input', async () => {
  const none = await call('validate_graph', {}).catch(e => e);
  assert.ok(none);
  const reply = await rpcRaw('validate_graph', { graph: chain([]), actions: [] });
  assert.equal(reply.isError, true);
  const old = await rpcRaw('validate_actions', { actions: [] });
  assert.ok(old === undefined || old.isError !== false, 'validate_actions no longer exists');
});

test('validate_graph tolerates placeholders in typed values', async () => {
  const ok = await call('validate_graph', { graph: chain([{ type: 'deleteMessages', payload: { channelId: '1', messageCount: '((opts.count))' } }]) });
  assert.equal(ok.data.valid, true, JSON.stringify(ok.data.errors));
  const asString = await call('validate_graph', { graph: JSON.stringify(chain([{ type: 'wait', payload: { duration: '1s' } }])) });
  assert.equal(asString.data.valid, true);
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


test('unsupported node types are rejected by validate_graph', async () => {
  const { data } = await call('validate_graph', { graph: chain([{ type: 'updateGuildOnboarding' }]) });
  assert.equal(data.valid, false);
  assert.match(data.errors[0].message, /cannot be used here/);
});

test('a node carries key/enabled/error at its root: a key inside payload is flagged', async () => {
  const ok = await call('validate_graph', { graph: chain([
    { type: 'calculate', key: 'total', payload: { expression: '1+1' } },
    { type: 'setTemporaryVariable', payload: { key: 'x', value: '1' } }, // here `key` is the variable name
  ]) });
  assert.equal(ok.data.valid, true, JSON.stringify(ok.data.errors));
  assert.deepEqual(ok.data.warnings, []);
  const misplaced = await call('validate_graph', { graph: chain([{ type: 'calculate', payload: { key: 'total', expression: '1+1' } }]) });
  assert.ok(misplaced.data.warnings.some(w => w.path === 'graph.nodes[0].payload.key' && /put it on the action itself/.test(w.message)), JSON.stringify(misplaced.data));
  const typo = await call('validate_graph', { graph: chain([{ type: 'calculate', keey: 'total', payload: { expression: '1' } }]) });
  assert.ok(typo.data.warnings.some(w => w.path === 'graph.nodes[0].keey'));
  const noKey = await call('validate_graph', { graph: chain([{ type: 'wait', key: '', payload: { duration: '1s' } }]) });
  assert.ok(noKey.data.errors.some(e => e.code === 'empty_key'));
});

test('the GraphNode type lists exactly the fields the Dart GraphNode serializes (contract with bot-creator)', async () => {
  let dart;
  try { dart = await readFile(new URL('../../bot-creator/packages/shared/lib/graph/workflow_graph.dart', import.meta.url), 'utf8'); } catch { return; }
  const start = dart.indexOf('class GraphNode');
  const body = dart.slice(dart.indexOf('Map<String, dynamic> toJson()', start), dart.indexOf('factory GraphNode.fromJson'));
  const dartFields = [...body.matchAll(/'(\w+)':/g)].map(m => m[1]);
  assert.deepEqual(Object.keys(types.GraphNode.fields).sort(), [...dartFields].sort());
});

test('result-naming fields the engine ignores are errors; real storeAs params stay valid', async () => {
  const bad = await call('validate_graph', { graph: chain([{ type: 'calculate', payload: { expression: '1+1', storeAs: 'temp.total' } }]) });
  assert.equal(bad.data.valid, false);
  assert.match(bad.data.errors[0].message, /does not exist.*`key` on the NODE.*Accepted payload fields: expression/s);
  const ok = await call('validate_graph', { graph: chain([{ type: 'getScopedVariable', key: 'prev', payload: { scope: 'guildMember', key: 'warns', storeAs: 'anciens' } }]) });
  assert.equal(ok.data.valid, true, JSON.stringify(ok.data));
  const typo = await call('validate_graph', { graph: chain([{ type: 'calculate', payload: { expresion: '1' } }]) });
  assert.match(typo.data.warnings[0].message, /did you mean "expression".*Accepted:/s);
});

test('blocks manifest: compact index by default, exact schemas with names, nothing too large for the app', async () => {
  const index = (await call('get_schema_manifest', { mode: 'graph' })).data;
  assert.ok(index.categories.Logic.includes('calculate'));
  assert.ok(index.categories.Logic.includes('switch') && index.categories.Logic.includes('tryCatch'));
  assert.ok(JSON.stringify(index).length < 4000, `index is ${JSON.stringify(index).length} bytes`);
  const some = (await call('get_schema_manifest', { mode: 'graph', names: ['calculate', 'SetScopedVariable', 'nope'] })).data;
  assert.ok(some.calculate.params.expression && some.setScopedVariable.params.scope);
  assert.deepEqual(some._unknown, ['nope']);
  const cat = (await call('get_schema_manifest', { mode: 'graph', category: 'Logic' })).data;
  assert.ok(cat.ifBlock);
  assert.deepEqual(cat.ifBlock.pins, ['then', 'elseif:<i>', 'else', 'error']);
});

test('a guildMember contextId must be guildId:userId', async () => {
  const one = payload => call('validate_graph', { graph: chain([{ type: 'getScopedVariable', payload }]) });
  const bare = await one({ scope: 'guildMember', key: 'warns', contextId: '((opts.membre))' });
  assert.equal(bare.data.valid, false);
  assert.match(bare.data.errors[0].message, /<guildId>:<userId>.*\(\(guild\.id\)\):\(\(opts\.membre\)\)/s);
  for (const contextId of ['((guild.id)):((opts.membre))', '10:20', undefined]) {
    const ok = await one({ scope: 'guildMember', key: 'warns', ...(contextId ? { contextId } : {}) });
    assert.equal(ok.data.valid, true, JSON.stringify(ok.data));
  }
  const user = await one({ scope: 'user', key: 'k', contextId: '123' });
  assert.equal(user.data.valid, true, 'other scopes keep a bare id');
});

test('validate_graph accepts the loop nodes a $while script converts to (whileLoop, asyncBlock, breakLoop, continueLoop)', async () => {
  const node = (id, type, payload = {}) => ({ id, type, key: id, enabled: true, payload });
  const link = (from, pin, to) => ({ from: { node: from, pin }, to });
  const graph = {
    version: 2,
    nodes: [
      node('w', 'whileLoop', { 'condition.variable': '((variable.n))', 'condition.operator': 'lessThan', 'condition.value': '3' }),
      node('b', 'breakLoop'),
      node('a', 'asyncBlock', { name: 'work' }),
      node('c', 'continueLoop'),
    ],
    links: [link('start', 'next', 'w'), link('w', 'body', 'b'), link('w', 'done', 'a'), link('a', 'body', 'c')],
    data: [],
  };
  const { data } = await call('validate_graph', { graph });
  assert.deepEqual(data.errors, []);
  assert.equal(data.valid, true);
  // break/continue n'ont pas de pin next : il est refusé, comme en Dart et en Go.
  graph.links.push(link('b', 'next', 'a'));
  const refused = (await call('validate_graph', { graph })).data;
  assert.ok(refused.errors.some((e) => e.code === 'invalid_pin'), JSON.stringify(refused.errors));
});

test('the saved-structure recipe of the tickets doc is a valid graph (no legacy depend_on list)', async () => {
  const md = await readFile(new URL('../_docs/tickets.md', import.meta.url), 'utf8');
  assert.ok(!md.includes('depend_on'));
  const graphs = [...md.matchAll(/```json\n([\s\S]*?)\n```/g)].map((m) => JSON.parse(m[1]));
  assert.equal(graphs.length, 2);
  for (const graph of graphs) {
    const { data } = await call('validate_graph', { graph });
    assert.deepEqual(data.errors, []);
    assert.equal(data.valid, true);
  }
});
