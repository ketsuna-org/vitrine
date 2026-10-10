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
  assert.match(simHtml, /Bot Creator Assistant/);
  assert.match(simHtml, /BOT ✔/);
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
    'mcp.md',
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

  assert.equal(testedFunctions, 554, 'Expected all 554 documented functions, including Bot Creator extensions, to be verified');
});
