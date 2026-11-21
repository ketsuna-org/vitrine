import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';
import { join } from 'node:path';

// Import preview engine
import previewEngine from '../assets/js/bdfd-preview.js';
const { parseBdfd, renderDiscordSimulator } = previewEngine;

test('parseBdfd handles multi-line arguments without truncation or leakage', () => {
  const code = `$title[Announcement]
$description[Line 1
Line 2
Line 3]
$color[#5865F2]
$sendMessage[]`;

  const parsed = parseBdfd(code);
  assert.equal(parsed.embed.title, 'Announcement');
  assert.equal(parsed.embed.description, 'Line 1\nLine 2\nLine 3');
  assert.equal(parsed.embed.color, '#5865F2');
  assert.equal(parsed.messageText, '');
});

test('parseBdfd handles nested functions and internal semicolons correctly', () => {
  const code = `$var[ticketChan;$createChannel[ticket-$username;text;123456789012345678]]
$addField[Status;$replaceText[$message;foo;bar];yes]
$ephemeral
Hello <@$authorID>!`;

  const parsed = parseBdfd(code);
  assert.equal(parsed.actions.length, 3);
  
  const varAction = parsed.actions[0];
  assert.equal(varAction.name, 'var');
  assert.equal(varAction.args[0], 'ticketChan');
  assert.equal(varAction.args[1], '$createChannel[ticket-$username;text;123456789012345678]');

  const fieldAction = parsed.actions[1];
  assert.equal(fieldAction.name, 'addField');
  assert.equal(fieldAction.args.length, 3);
  assert.equal(fieldAction.args[0], 'Status');
  assert.equal(fieldAction.args[1], '$replaceText[$message;foo;bar]');
  assert.equal(fieldAction.args[2], 'yes');

  assert.equal(parsed.isEphemeral, true);
  assert.match(parsed.messageText, /Hello <@\$authorID>!/);
});

test('parseBdfd extracts both legacy $addButton and $addButtonCV2 with buttons and styles', () => {
  const code = `$addButton[no;btn_edit;Edit;secondary]
$addButtonCV2[btn_delete;Delete;danger;🗑️]
$addStringSelect[menu_select;Choose option]`;

  const parsed = parseBdfd(code);
  assert.equal(parsed.buttons.length, 2);
  assert.equal(parsed.buttons[0].id, 'btn_edit');
  assert.equal(parsed.buttons[0].style, 'secondary');
  assert.equal(parsed.buttons[1].id, 'btn_delete');
  assert.equal(parsed.buttons[1].style, 'danger');
  assert.equal(parsed.buttons[1].emoji, '🗑️');

  assert.ok(parsed.selectMenu);
  assert.equal(parsed.selectMenu.id, 'menu_select');
  assert.equal(parsed.selectMenu.placeholder, 'Choose option');
});

test('the preview engine no longer invents app blocks from BDFD functions', async () => {
  assert.equal(previewEngine.renderBlocksCanvas, undefined);
  assert.equal(previewEngine.CATEGORY_MAP, undefined);
  assert.equal(previewEngine.PARAM_LABELS, undefined);
  const source = await readFile(new URL('../assets/js/bdfd-preview.js', import.meta.url), 'utf8');
  assert.doesNotMatch(source, /DISCORD TRIGGER|Blocks View|scratch-block-card/);
});

test('renderDiscordSimulator outputs complete discord frame, embed, and components', () => {
  const code = `$title[Embed Title]
$description[Embed description text]
$color[#ED4245]
$addField[Inline Field;Value 1;yes]
$addButtonCV2[btn_confirm;Confirm;success]
$ephemeral`;

  const parsed = parseBdfd(code);
  const simHtml = renderDiscordSimulator(parsed);

  assert.match(simHtml, /discord-simulator-frame/);
  assert.match(simHtml, /Bot-Creator/);
  assert.match(simHtml, /APP/);
  assert.match(simHtml, /--embed-color:\s*#ED4245/);
  assert.match(simHtml, /Embed Title/);
  assert.match(simHtml, /Embed description text/);
  assert.match(simHtml, /Inline Field/);
  assert.match(simHtml, /discord-btn-success/);
  assert.match(simHtml, /discord-ephemeral-notice/);
});

test('every BDFD function documentation file in _docs/ has a working ```bdfd code block', async () => {
  const docsDir = new URL('../_docs/', import.meta.url);
  const files = await readdir(docsDir);

  const generalGuides = new Set([
    'blocks-channels.md',
    'blocks-control-flow.md',
    'blocks-dictionary.md',
    'blocks-messages.md',
    'blocks.md',
    'deployment.md',
    'events-and-placeholders.md',
    'execution-model.md',
    'getting-started.md',
    'interactions-overview.md',
    'template-system.md',
    'tickets.md'
  ]);

  let testedFunctions = 0;
  for (const file of files) {
    if (!file.endsWith('.md')) continue;
    if (generalGuides.has(file)) continue;

    const content = await readFile(new URL(file, docsDir), 'utf8');
    const isFunction =
      content.includes('function_name:') ||
      /title:[ \t]*["']?\$/.test(content) ||
      /syntax:[ \t]*["']?\$/.test(content) ||
      /^#\s+\$[a-zA-Z0-9_]+/m.test(content) ||
      /```\s*\$[a-zA-Z0-9_]+\[/m.test(content);

    if (isFunction) {
      testedFunctions++;
      assert.match(
        content,
        /```(?:bdfd|bds)/i,
        `Expected ${file} to contain a \`\`\`bdfd code example`
      );
      assert.match(
        content,
        /## Examples?/i,
        `Expected ${file} to contain an Examples section header`
      );
    }
  }

  assert.ok(testedFunctions > 0, 'Expected function documentation to be verified');
});

test('apiMessageToParsed turns the engine message into what the simulator draws', () => {
  const parsed = previewEngine.apiMessageToParsed({
    payload: {
      content: '\n\n',
      embeds: [{ title: 'Bibi Bank', description: 'Hello **you**', color: '#1f9d6b', fields: [{ name: 'Wallet', value: '0', inline: true }], footer: { text: 'Use /deposit' } }],
      components: { components: [{ type: 'actionRow', components: [{ type: 'button', label: 'Deposit', style: 'primary', emoji: '' }] }] },
      ephemeral: false
    }
  });
  assert.equal(parsed.messageText, '');
  assert.equal(parsed.embed.title, 'Bibi Bank');
  assert.equal(parsed.embed.color, '#1f9d6b');
  assert.equal(parsed.embed.fields[0].value, '0');
  assert.equal(parsed.embed.footer, 'Use /deposit');
  assert.equal(parsed.buttons.length, 1);
  assert.equal(parsed.buttons[0].label, 'Deposit');
  const html = renderDiscordSimulator(parsed);
  assert.match(html, /Bibi Bank/);
  assert.match(html, /Deposit/);
});

test('apiMessageToParsed keeps the default value of a plain message', () => {
  const parsed = previewEngine.apiMessageToParsed({ payload: { content: 'You have 0 XP.', embeds: [] } });
  assert.equal(parsed.messageText, 'You have 0 XP.');
  assert.equal(parsed.embed, null);
});

test('previewKey matches the Dart key of scripts/render-bdfd-previews.dart', () => {
  // Computed with the Dart function on the same string.
  assert.equal(previewEngine.previewKey(''), '811c9dc5-0');
  assert.equal(previewEngine.previewKey('You have $dbGet[players;$authorID;xp;0] XP.'), 'afee8f63-43');
  assert.equal(previewEngine.previewKey('é😀x'), '269e8c9b-4');
  assert.match(previewEngine.previewKey('You have $dbGet[players;$authorID;xp;0] XP.'), /^[0-9a-f]{8}-43$/);
});

test('every bdfd example of the documentation has a stored engine result (run scripts/render-bdfd-previews.dart)', async () => {
  const fence = /^```bdfd[^\n]*\n([\s\S]*?)^```\s*$/gm;
  const missing = [];
  for (const [locale, dir] of [['en', '_docs'], ['fr', 'fr/docs']]) {
    let files = [];
    try { files = (await readdir(join(process.cwd(), dir))).filter((f) => f.endsWith('.md')); } catch { continue; }
    for (const f of files) {
      const text = await readFile(join(process.cwd(), dir, f), 'utf8');
      const scripts = [...text.matchAll(fence)].map((m) => m[1].trim()).filter(Boolean);
      if (!scripts.length) continue;
      let stored = {};
      try {
        stored = JSON.parse(await readFile(join(process.cwd(), 'assets/previews', `${locale}-${f.replace(/\.md$/, '')}.json`), 'utf8')).blocks;
      } catch { /* missing file: reported below */ }
      for (const script of scripts) {
        if (!stored[previewEngine.previewKey(script)]) missing.push(`${locale}/${f}`);
      }
    }
  }
  assert.deepEqual([...new Set(missing)].slice(0, 20), [], 'Examples without a stored result: run the render script and commit assets/previews.');
});

test('renderMessages draws every message the engine sent, with one header and the buttons', () => {
  const html = previewEngine.renderMessages([
    { payload: { content: 'Choose an option' } },
    { payload: { content: '\n', components: { components: [{ type: 'actionRow', components: [
      { type: 'button', label: 'Validate', style: 'success' },
      { type: 'button', label: 'Decline', style: 'danger' }] }] } } }
  ]);
  assert.equal((html.match(/discord-preview-badge-header/g) || []).length, 1);
  assert.equal((html.match(/discord-msg-row/g) || []).length, 2);
  assert.match(html, /Validate/);
  assert.match(html, /Decline/);
  assert.doesNotMatch(html, /Command executed/);
});
