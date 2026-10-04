// Contract between the three repositories that share the documentation MCP:
//   vitrine      -> serves /api/mcp (tools, schemas, Blocks manifest)
//   manager      -> relays the Copilot docs_* tools to it (internal/services/ai_documentation.go)
//   bot-creator  -> declares the same Copilot tools for the app (assets/copilot/tools.json)
// Sibling repositories are optional: every check is skipped when its checkout is missing.
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile } from 'node:fs/promises';

const source = await readFile(new URL('../functions/api/mcp/[[route]].js', import.meta.url), 'utf8');
const { onRequestPost } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);

async function tryRead(rel) {
  try { return await readFile(new URL(rel, import.meta.url), 'utf8'); } catch { return null; }
}
const managerTools = await tryRead('../../manager/internal/services/copilot_tools.json');
const appTools = await tryRead('../../bot-creator/packages/app/assets/copilot/tools.json');
const relay = await tryRead('../../manager/internal/services/ai_documentation.go');

const rpc = async (method, params = {}) =>
  (await (await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }) })).json()).result;
const mcpTools = Object.fromEntries((await rpc('tools/list')).tools.map(t => [t.name, t]));

function relayMap() {
  // The Go map is the single source of the docs_* -> MCP tool mapping.
  const body = relay.slice(relay.indexOf('aiDocumentationTools'));
  return Object.fromEntries([...body.slice(0, body.indexOf('}')).matchAll(/"(docs_\w+)":\s*"(\w+)"/g)].map(m => [m[1], m[2]]));
}

function subsetOf(schema, mcpSchema, where) {
  const props = mcpSchema.properties || {};
  for (const [key, spec] of Object.entries(schema.properties || {})) {
    assert.ok(props[key], `${where}: argument "${key}" is not accepted by the MCP tool`);
    if (spec.enum && props[key].enum) {
      for (const v of spec.enum) assert.ok(props[key].enum.includes(v), `${where}.${key}: enum value "${v}" unknown to the MCP`);
    }
    if (spec.maximum && props[key].maximum) assert.ok(spec.maximum <= props[key].maximum, `${where}.${key}: maximum above the MCP's`);
  }
  for (const key of mcpSchema.required || []) assert.ok((schema.required || []).includes(key), `${where}: MCP requires "${key}" but the Copilot schema does not`);
}

test('the manager relay maps every docs_* Copilot tool to an existing MCP tool', { skip: !relay }, () => {
  const map = relayMap();
  assert.ok(Object.keys(map).length >= 5, 'relay map parsed');
  for (const [copilot, mcp] of Object.entries(map)) assert.ok(mcpTools[mcp], `${copilot} -> ${mcp}: tool missing from /api/mcp`);
});

for (const [label, raw] of [['manager copilot_tools.json', managerTools], ['bot-creator tools.json', appTools]]) {
  test(`${label}: docs_* tools match the MCP schemas`, { skip: !raw || !relay }, () => {
    const map = relayMap();
    const docs = JSON.parse(raw).filter(t => t.name.startsWith('docs_'));
    assert.deepEqual(docs.map(t => t.name).sort(), Object.keys(map).sort(), 'every relayed tool is declared, and nothing else');
    for (const tool of docs) {
      assert.equal(tool.mutating, false, `${tool.name} must be read-only`);
      subsetOf(tool.inputSchema, mcpTools[map[tool.name]].inputSchema, `${label}:${tool.name}`);
    }
  });
}

test('manager and bot-creator declare identical Copilot tools', { skip: !managerTools || !appTools }, () => {
  const byName = raw => Object.fromEntries(JSON.parse(raw).map(t => [t.name, t]));
  assert.deepEqual(byName(managerTools), byName(appTools));
});
