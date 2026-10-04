import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { buildIndex, plan, RECIPES } from '../functions/api/mcp/planner.mjs';

const { onRequestPost } = await import(pathToFileURL(fileURLToPath(new URL('../functions/api/mcp/[[route]].js', import.meta.url))).href);

// Same inputs the MCP fetches in production (docs-index.json + schema-manifest.json), rebuilt from sources.
const dir = new URL('../_docs/', import.meta.url);
const front = text => Object.fromEntries([...(text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '').matchAll(/^(\w+):\s*(.*)$/gm)].map(m => [m[1], m[2].replace(/^"|"$/g, '')]));
const docs = [];
const bdfd = {};
const names = new Set();
for (const file of await readdir(dir)) {
  if (!file.endsWith('.md')) continue;
  const slug = file.slice(0, -3);
  const f = front(await readFile(new URL(file, dir), 'utf8'));
  const apiType = f.api_type || 'bdfd';
  docs.push({ slug, name: slug, category: f.category, api_type: apiType, description: f.description, status: f.status || 'documented' });
  if (apiType !== 'bdfd') continue;
  names.add(slug.toLowerCase());
  for (const n of [f.title, f.function_name && `$${f.function_name}`]) if (n) names.add(n.replace(/\[\]$/, '').replace(/^\$/, '').toLowerCase());
  if (f.syntax || f.function_name || (f.title ?? '').startsWith('$')) bdfd[(f.title || `$${slug}`).replace(/\[\]$/, '')] = { desc: f.description, category: f.category, syntax: f.syntax };
}
const blocks = JSON.parse(await readFile(new URL('../_data/blocks_grammar.json', import.meta.url), 'utf8'));
const index = buildIndex({ docs, manifest: { modes: { bdfd, blocks } } });
const fnsOf = r => r.functions.map(f => f.n.toLowerCase());

test('every recipe function and skeleton token is a documented BDFD function / Blocks action', () => {
  for (const r of RECIPES) {
    if (r.mode === 'blocks') {
      for (const fn of r.fns) assert.ok(blocks[fn], `${r.id}: unknown action ${fn}`);
      for (const [, type] of r.skeleton.matchAll(/"type":"(\w+)"/g)) assert.ok(blocks[type], `${r.id}: skeleton uses unknown action ${type}`);
      JSON.parse(r.skeleton);
      continue;
    }
    for (const fn of r.fns) assert.ok(names.has(fn.replace(/^\$/, '').toLowerCase()), `${r.id}: undocumented function ${fn}`);
    for (const [, fn] of r.skeleton.matchAll(/\$([A-Za-z]+)/g)) assert.ok(names.has(fn.toLowerCase()), `${r.id}: skeleton uses undocumented $${fn}`);
    assert.doesNotMatch(r.skeleton, /\$let\b|\$sendMessage\[.*\$addButton/, `${r.id}: forbidden syntax`);
  }
});

const GOLDEN = [
  ['Fais une commande ping qui répond avec la latence du bot, joli', 'bdfd', ['$ping', '$title', '$description'], 'auto'],
  ['make a ping command that replies with the bot latency, make it look good', 'bdfd', ['$ping', '$title'], 'auto'],
  ['commande ban avec vérification des permissions', 'bdfd', ['$ban', '$onlyperms'], 'auto'],
  ['kick a member', 'bdfd', ['$kick', '$onlyperms'], 'auto'],
  ['système de tickets avec bouton fermer', 'bdfd', ['$createchannel', '$addbutton', '$deletechannels'], 'auto'],
  ['compteur de points par utilisateur', 'bdfd', ['$setuservar', '$getuservar'], 'auto'],
  ['économie avec argent et xp', 'bdfd', ['$setuservar', '$getuservar'], 'auto'],
  ['pile ou face', 'bdfd', ['$randomtext'], 'auto'],
  ['message de bienvenue avec le nom du serveur', 'bdfd', ['$servername', '$memberscount'], 'auto'],
  ['infos du serveur', 'bdfd', ['$servername', '$memberscount'], 'auto'],
  ['afficher l\'avatar d\'un utilisateur', 'bdfd', ['$useravatar'], 'auto'],
  ['annonce avec embed et couleur', 'bdfd', ['$title', '$description', '$color'], 'auto'],
  ['bouton cliquable', 'bdfd', ['$addbutton'], 'auto'],
  ['ping with latency', 'blocks', ['respondwithmessage'], 'auto'],
];

test('golden intents select the expected functions in a compact answer', () => {
  for (const [intent, mode, expected, decision] of GOLDEN) {
    const r = plan(index, { intent, mode });
    const got = fnsOf(r);
    for (const fn of expected) assert.ok(got.includes(fn), `"${intent}": expected ${fn} in ${got.join(' ')}`);
    assert.equal(r.decision, decision, `"${intent}" decision (confidence ${r.confidence})`);
    assert.ok(JSON.stringify(r).length < 2600, `"${intent}": answer too large (${JSON.stringify(r).length} chars)`);
    assert.ok(r.functions.length <= 10);
  }
});

test('ping skeleton matches the capture and the planner is deterministic', () => {
  const a = plan(index, { intent: 'commande ping latence joli' });
  assert.match(a.skeleton, /\$ping/);
  assert.deepEqual(a, plan(index, { intent: 'commande ping latence joli' }));
  assert.equal(a.recipe, 'ping');
});

test('unknown or empty intents ask the user instead of guessing', () => {
  assert.equal(plan(index, { intent: 'zzzz qqqq xxxx' }).decision, 'ask_user');
  assert.equal(plan(index, { intent: '   ' }).decision, 'ask_user');
});

test('unsupported Blocks actions are never suggested', () => {
  const r = plan(index, { intent: 'canvas draw circle onboarding update', mode: 'blocks', budget: 20 });
  for (const f of r.functions) assert.ok(!blocks[f.n]?.unsupported, `${f.n} is unsupported`);
});

test('plan_solution is exposed over MCP and answers in one small call', async () => {
  const original = globalThis.fetch;
  globalThis.fetch = async url => Response.json(String(url).endsWith('docs-index.json') ? docs : { version: '1.0', modes: { bdfd, blocks, javascript: {} } });
  try {
    const call = async (name, args) => (await (await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method: 'tools/call', params: { name, arguments: args } }) }) })).json()).result;
    const result = await call('plan_solution', { intent: 'Fais une commande ping avec la latence' });
    const answer = JSON.parse(result.content[0].text);
    assert.equal(answer.decision, 'auto');
    assert.ok(answer.skeleton.includes('$ping'));
    assert.ok(result.content[0].text.length < 1500);
    const bad = await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 2, method: 'tools/call', params: { name: 'plan_solution', arguments: { intent: '' } } }) }) });
    assert.equal((await bad.json()).result.isError, true);
  } finally { globalThis.fetch = original; }
});
