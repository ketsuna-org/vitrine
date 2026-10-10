import { test } from 'node:test';
import assert from 'node:assert/strict';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { readFile, readdir } from 'node:fs/promises';

const source = await readFile(new URL('../functions/api/mcp/[[route]].js', import.meta.url), 'utf8');
const { onRequestPost } = await import(pathToFileURL(fileURLToPath(new URL('../functions/api/mcp/[[route]].js', import.meta.url))).href);
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
  assert.ok(catalog.some(t => t.name === 'get_schema_manifest'), 'get_schema_manifest is exposed in tools');
  assert.deepEqual(catalog.find(t => t.name === 'search_docs').inputSchema.properties.api_type.enum, ['blocks', 'bdfd', 'javascript', 'general']);
  assert.match((await rpc('initialize')).result.instructions, /get_schema_manifest/);
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
    // With full_markdown: true, bypasses schema manifest and fetches raw markdown directly
    const reply = await rpc('tools/call', { name: 'get_doc', arguments: { slug: 'blocks-channels', full_markdown: true } });
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
  // $newTicket is implemented by the engine (5 to 7 arguments), so its page no longer says "incomplete".
  for (const slug of ['closeticket', 'isticket']) {
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

test('get_schema_manifest returns compact typed schemas for blocks', async () => {
  const manifestData = {
    version: '1.0',
    modes: {
      blocks: {
        sendMessage: {
          desc: 'Envoie un message',
          category: 'Messages',
          params: { channelId: 'string?', content: 'string?' },
          output: '((action.<key>))'
        },
        banUser: {
          desc: 'Bannit un membre',
          category: 'Moderation',
          params: { userId: 'string', reason: 'string?' }
        }
      },
      bdfd: {
        $sendMessage: { desc: 'Explicit message send', syntax: '$sendMessage[content]', params: { content: 'string' } }
      }
    }
  };

  await withFetch(async url => {
    if (url.endsWith('schema-manifest.json')) return Response.json(manifestData);
    return Response.json(docs);
  }, async () => {
    // 1. Default mode is 'blocks': a compact index (the full dictionary is too large for the app)
    const reply = await rpc('tools/call', { name: 'get_schema_manifest', arguments: {} });
    assert.equal(reply.result.isError, undefined);
    const index = JSON.parse(reply.result.content[0].text);
    assert.deepEqual(index.categories.Messages, ['sendMessage']);
    const named = await rpc('tools/call', { name: 'get_schema_manifest', arguments: { names: ['sendMessage', 'banUser'] } });
    const blocks = JSON.parse(named.result.content[0].text);
    assert.ok(blocks.sendMessage);
    assert.equal(blocks.sendMessage.params.channelId, 'string?');
    assert.equal(blocks.banUser.params.userId, 'string');

    // 2. Category filtering
    const filteredReply = await rpc('tools/call', { name: 'get_schema_manifest', arguments: { mode: 'blocks', category: 'Messages' } });
    const filteredBlocks = JSON.parse(filteredReply.result.content[0].text);
    assert.ok(filteredBlocks.sendMessage);
    assert.equal(filteredBlocks.banUser, undefined);

    // 3. Mode 'bdfd'
    const bdfdReply = await rpc('tools/call', { name: 'get_schema_manifest', arguments: { mode: 'bdfd' } });
    const bdfd = JSON.parse(bdfdReply.result.content[0].text);
    assert.ok(bdfd.$sendMessage);
    assert.equal(bdfd.$sendMessage.params.content, 'string');

    // 4. Invalid mode error
    const errReply = await rpc('tools/call', { name: 'get_schema_manifest', arguments: { mode: 'unknown_mode' } });
    assert.equal(errReply.result.isError, true);
  });
});

test('get_doc returns compact type schema by default without full markdown prose', async () => {
  const manifestData = {
    version: '1.0',
    modes: {
      blocks: {
        banUser: {
          desc: 'Bannit un membre',
          category: 'Moderation',
          params: { userId: 'string', reason: 'string?' }
        }
      }
    }
  };

  await withFetch(async url => {
    if (url.endsWith('schema-manifest.json')) return Response.json(manifestData);
    return Response.json(docs);
  }, async () => {
    const reply = await rpc('tools/call', { name: 'get_doc', arguments: { slug: 'banUser' } });
    assert.equal(reply.result.isError, undefined);
    const parsed = JSON.parse(reply.result.content[0].text);
    assert.equal(parsed.type, 'banUser');
    assert.equal(parsed.desc, 'Bannit un membre');
    assert.equal(parsed.params.userId, 'string');
    assert.equal(parsed.params.reason, 'string?');
  });
});


test('get_doc returns the markdown of a JavaScript page instead of its manifest stub', async () => {
  const manifest = { version: '1.0', modes: { javascript: { interaction: { desc: 'stub', category: 'JavaScript API', slug: 'interaction' } } } };
  const jsDocs = [{ slug: 'interaction', name: 'interaction', category: 'JavaScript API', api_type: 'javascript', description: 'stub', url: 'https://bot-creator.fr/docs/javascript/interaction/' }];
  await withFetch(async url => {
    if (url.endsWith('schema-manifest.json')) return Response.json(manifest);
    if (url.endsWith('.md')) return new Response('## interaction.options.getString');
    return Response.json(jsDocs);
  }, async () => {
    const reply = await rpc('tools/call', { name: 'get_doc', arguments: { slug: 'interaction' } });
    assert.match(reply.result.content[0].text, /Mode: javascript/);
    assert.match(reply.result.content[0].text, /getString/);
  });
});

test('plan_solution supports the javascript mode with a ready recipe and no BDFD functions', async () => {
  const reply = await rpc('tools/call', { name: 'plan_solution', arguments: { mode: 'javascript', intent: 'гра вгадай число з db' } });
  const plan = JSON.parse(reply.result.content[0].text);
  assert.equal(plan.decision, 'auto');
  assert.equal(plan.mode, 'javascript');
  assert.ok(plan.recipes.some(r => r.id === 'guess-game' && r.options[0].name === 'guess'));
  assert.match(plan.contract.storage, /db\.user\.get/);
  assert.ok(!('functions' in plan));
  const unknown = JSON.parse((await rpc('tools/call', { name: 'plan_solution', arguments: { mode: 'javascript', intent: 'quelque chose de rare' } })).result.content[0].text);
  assert.equal(unknown.decision, 'review');
});

test('get_doc accepts the $name spelling of a function slug', async () => {
  const bdfdDocs = [{ slug: 'getmessagevar', name: '$getMessageVar[]', category: 'Variables', api_type: 'bdfd', status: 'documented', url: 'https://bot-creator.fr/docs/getmessagevar/' }];
  await withFetch(async url => (url.endsWith('.json') ? Response.json(bdfdDocs) : new Response('# getMessageVar')), async () => {
    for (const slug of ['getmessagevar', '$getMessageVar']) {
      const reply = await rpc('tools/call', { name: 'get_doc', arguments: { slug, full_markdown: true } });
      assert.equal(reply.result.isError, undefined, slug);
      assert.match(reply.result.content[0].text, /# getMessageVar/);
    }
  });
});
