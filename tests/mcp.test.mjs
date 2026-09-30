import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

const source = await readFile(new URL('../functions/api/mcp/[[route]].js', import.meta.url), 'utf8');
const { onRequestPost } = await import(`data:text/javascript;base64,${Buffer.from(source).toString('base64')}`);
const docs = [
  { slug: 'blocks-channels', name: 'Blocks — channels', category: 'Blocks', api_type: 'blocks', status: 'documented', description: 'Create private tickets', url: 'https://bot-creator.fr/docs/blocks-channels/' },
  { slug: 'newticket', name: '$newTicket', category: 'Moderation', api_type: 'bdfd', status: 'incomplete' },
];
async function rpc(method, params = {}) {
  const response = await onRequestPost({ request: new Request('https://bot-creator.fr/api/mcp', { method: 'POST', body: JSON.stringify({ jsonrpc: '2.0', id: 1, method, params }) }) });
  return response.json();
}
async function withFetch(mock, run) {
  const original = globalThis.fetch;
  globalThis.fetch = mock;
  try { await run(); } finally { globalThis.fetch = original; }
}

test('catalog exposes authoring modes and initialize guidance', async () => {
  const catalog = (await rpc('tools/list')).result.tools;
  assert.deepEqual(catalog.find(t => t.name === 'search_docs').inputSchema.properties.api_type.enum, ['blocks', 'bdfd', 'javascript', 'general']);
  assert.match((await rpc('initialize')).result.instructions, /execution-model/);
});

test('search filters Blocks and searches descriptions, retaining compatibility', async () => {
  await withFetch(async () => Response.json(docs), async () => {
    const reply = await rpc('tools/call', { name: 'search_docs', arguments: { query: 'tickets', api_type: 'blocks' } });
    const matches = JSON.parse(reply.result.content[0].text).results;
    assert.equal(matches.length, 1);
    assert.equal(matches[0].slug, 'blocks-channels');
    const incomplete = await rpc('tools/call', { name: 'search_docs', arguments: { query: 'newticket', api_type: 'bdfd' } });
    assert.equal(JSON.parse(incomplete.result.content[0].text).results[0].status, 'incomplete');
  });
});

test('get_doc reads deployed content from the same origin as its index', async () => {
  const urls = [];
  await withFetch(async url => {
    urls.push(url);
    return url.endsWith('.json') ? Response.json(docs) : new Response('# Blocks contract');
  }, async () => {
    const reply = await rpc('tools/call', { name: 'get_doc', arguments: { slug: 'blocks-channels' } });
    assert.match(reply.result.content[0].text, /Mode: blocks/);
    assert.match(reply.result.content[0].text, /# Blocks contract/);
    assert.deepEqual(urls, ['https://bot-creator.fr/api/docs-index.json', 'https://bot-creator.fr/api/docs/blocks-channels.md']);
  });
});

test('missing docs and invalid mode/path produce actionable errors', async () => {
  await withFetch(async () => Response.json(docs), async () => {
    for (const args of [{ slug: 'missing' }, { slug: '../secret' }]) {
      assert.equal((await rpc('tools/call', { name: 'get_doc', arguments: args })).result.isError, true);
    }
    assert.equal((await rpc('tools/call', { name: 'search_docs', arguments: { query: 'ticket', api_type: 'invented' } })).result.isError, true);
  });
});

test('Markdown examples use supported temporary-variable syntax', async () => {
  for (const folder of ['_docs', '_posts']) {
    const directory = new URL(`../${folder}/`, import.meta.url);
    for (const file of await readdir(directory)) {
      if (!file.endsWith('.md')) continue;
      const text = await readFile(new URL(file, directory), 'utf8');
      assert.doesNotMatch(text, /\$let\[/, `${folder}/${file} contains an unsupported temporary-variable setter`);
    }
  }
  for (const slug of ['newticket', 'closeticket', 'isticket']) {
    assert.match(await readFile(new URL(`../_docs/${slug}.md`, import.meta.url), 'utf8'), /status: incomplete/);
  }
});

test('MCP prompts/list and prompts/get expose valid prompts and error on unknown', async () => {
  const promptList = await rpc('prompts/list');
  assert.equal(Array.isArray(promptList.result.prompts), true);
  const promptNames = promptList.result.prompts.map(p => p.name);
  assert.ok(promptNames.includes('command_authoring_rules'));
  assert.ok(promptNames.includes('production_ticket_workflow'));

  const rules = await rpc('prompts/get', { name: 'command_authoring_rules' });
  assert.match(rules.result.messages[1].content.text, /NO \$let/);
  assert.match(rules.result.messages[1].content.text, /NO \$sendMessage/);

  const ticketWorkflow = await rpc('prompts/get', { name: 'production_ticket_workflow' });
  assert.match(ticketWorkflow.result.messages[1].content.text, /\$createChannel/);
  assert.match(ticketWorkflow.result.messages[1].content.text, /\$addButton\[no;close_ticket;/);
  assert.match(ticketWorkflow.result.messages[1].content.text, /\$deleteChannels\[\$channelID\]/);

  const unknown = await rpc('prompts/get', { name: 'non_existent_prompt' });
  assert.ok(unknown.error);
  assert.equal(unknown.error.code, -32602);
});

