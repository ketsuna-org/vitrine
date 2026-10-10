import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// The BDFD engine is the source of truth; _docs pages describe it. This test compares the argument
// counts each page's `syntax:` advertises with the engine registry snapshot
// (_data/bdfd-engine-signatures.json, regenerated with scripts/dump-bdfd-signatures.dart).
// tests/docs_engine_known_gaps.json lists pages that still differ and why; the list must only shrink.

// Structural tokens the parser handles itself: their page documents a block form, while the registry entry
// is the inline function form, so their `syntax:` cannot be compared.
const structural = new Set(['if', 'for', 'try', 'jsonforeach', 'loop', 'while']);
const dir = new URL('../_docs/', import.meta.url);
const snapshot = JSON.parse(await readFile(new URL('../_data/bdfd-engine-signatures.json', import.meta.url), 'utf8'));
const knownGaps = JSON.parse(await readFile(new URL('./docs_engine_known_gaps.json', import.meta.url), 'utf8'));
const front = text => Object.fromEntries([...(text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '').matchAll(/^(\w+):\s*(.*)$/gm)].map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));

// The function a page documents and the syntax it advertises. Pages without `function_name` / `syntax:` front matter
// (most component pages) are still compared: the function is the file name and the syntax is the first line of the
// code block under `## Syntax`.
function pageFunction(file, f, text) {
  const name = (f.function_name || file.replace(/\.md$/, '')).toLowerCase();
  const syntax = f.syntax ?? text.match(/^## Syntax\s*\n```\w*\n([^\n]*)\n/m)?.[1]?.trim() ?? '';
  return { name, syntax, hasFrontMatterName: Boolean(f.function_name) };
}

// Argument counts one syntax string advertises. A parameter written `(x)` or `x?` is optional, and every
// parameter inside a `( ... ; ... )` group is optional. `...` marks a variadic tail.
function advertisedCounts(syntax, variadicMins = []) {
  const counts = new Set();
  for (const alt of syntax.split(/\s+or\s+|\s*\/\s*(?=\$)/)) {
    const m = alt.trim().match(/\$\w+\[(.*)\]\s*$/);
    if (!m) { counts.add(0); continue; }
    const items = [];
    let group = 0;
    let current = '';
    let square = 0;
    let round = 0;
    let itemGroup = 0;
    let itemOptional = false;
    const flush = () => {
      const text = current.trim();
      if (text) items.push({ group: itemGroup, text, optional: itemOptional || text.endsWith('?') });
      current = '';
      itemGroup = 0;
      itemOptional = false;
    };
    for (const c of m[1]) {
      if (c === '[') square++;
      if (c === ']') square--;
      if (c === '(' && square === 0) { if (round === 0) group++; round++; }
      if (round > 0) { itemGroup = group; itemOptional = true; }
      if (c === ')' && square === 0) round--;
      if (c === ';' && square === 0) { flush(); if (round > 0) { itemGroup = group; itemOptional = true; } continue; }
      current += c;
    }
    flush();
    const variadic = items.some(i => i.text.includes('...'));
    const named = items.filter(i => !i.text.includes('...'));
    const required = named.filter(i => !i.optional).length;
    // `role1;role2;...` is ambiguous about how many repeats are mandatory, so a variadic syntax is only
    // checked against the engine's upper bound.
    if (variadic) { counts.add(99); variadicMins.push(required); continue; }
    // A `(a;b)` group is all-or-nothing; a lone `(x)` is one optional parameter.
    const groups = new Map();
    for (const i of named) if (i.group) groups.set(i.group, (groups.get(i.group) ?? 0) + 1);
    let subset = [required];
    for (const size of groups.values()) subset = subset.flatMap(n => [n, n + size]);
    for (const n of subset) counts.add(n);
  }
  return counts;
}

function engineCounts(sig) {
  const max = sig.max ?? 99;
  return new Set(sig.counts ?? Array.from({ length: max - sig.min + 1 }, (_, i) => sig.min + i));
}

test('documented BDFD syntax matches the argument counts the engine accepts', async () => {
  const mismatches = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(new URL(file, dir), 'utf8');
    const f = front(text);
    if ((f.api_type || 'bdfd') !== 'bdfd') continue;
    const page = pageFunction(file, f, text);
    if (structural.has(page.name)) continue;
    const sig = snapshot[page.name];
    if (!sig || !page.syntax) continue;
    const doc = advertisedCounts(page.syntax);
    const eng = engineCounts(sig);
    const extra = [...doc].filter(n => !eng.has(n) && n < 99);
    // A page may leave out forms the engine also accepts; it must not advertise a count the engine rejects.
    if (extra.length) mismatches.push(file);
  }
  const unexpected = mismatches.filter(f => !(f in knownGaps));
  assert.deepEqual(unexpected, [], `Pages disagree with the engine signatures: ${unexpected.join(', ')}. Fix the page (the engine wins) or, if the behaviour cannot be established from the engine source, list it in tests/docs_engine_known_gaps.json with the reason.`);
  const stale = Object.keys(knownGaps).filter(f => !mismatches.includes(f));
  assert.deepEqual(stale, [], `Fixed pages still listed in docs_engine_known_gaps.json: ${stale.join(', ')}`);
});

test('every documented BDFD function exists in the engine snapshot', async () => {
  const unknown = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const f = front(await readFile(new URL(file, dir), 'utf8'));
    if ((f.api_type || 'bdfd') !== 'bdfd' || !f.function_name) continue;
    if (!snapshot[f.function_name.toLowerCase()] && !(`exists:${file}` in knownGaps)) unknown.push(file);
  }
  // Control-flow keywords are handled by the parser, not the function registry.
  assert.deepEqual(unknown.filter(f => !['for-loop.md', 'try-catch.md', 'jsonforeach.md', 'loop.md', 'while.md'].includes(f)), []);
});

// Variadic syntaxes (`a;b;...`): pages differ on whether the repeated parameter right before `...` counts as
// mandatory, so the engine minimum must be the documented mandatory count or one less. The upper bound is
// checked by the first test.
test('variadic syntaxes advertise the engine minimum argument count', async () => {
  const wrong = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(new URL(file, dir), 'utf8');
    const f = front(text);
    const page = pageFunction(file, f, text);
    if ((f.api_type || 'bdfd') !== 'bdfd' || structural.has(page.name)) continue;
    const sig = snapshot[page.name];
    if (!sig || !page.syntax) continue;
    const mins = [];
    advertisedCounts(page.syntax, mins);
    for (const m of mins) if (sig.min > m || sig.min < m - 1) wrong.push(`${file} (doc ${m}, engine ${sig.min})`);
  }
  assert.deepEqual(wrong, []);
});

// Parser-level keywords (bot-creator, engine/bdfd/program.dart `structuralFunctionNames`): they are not in the
// function registry but are valid in scripts.
const parserKeywords = new Set(['if', 'elseif', 'else', 'endif', 'for', 'loop', 'while', 'endfor', 'endloop', 'endwhile',
  'jsonforeach', 'endjsonforeach', 'try', 'catch', 'endtry', 'func', 'funcend']);
const knownName = name => snapshot[name.toLowerCase()] || parserKeywords.has(name.toLowerCase());
const callNames = code => [...code.matchAll(/(?<!\\)\$([A-Za-z_]\w*)/g)].map(m => m[1]);

test('every function called in a ```bdfd example of _docs exists in the engine', async () => {
  const unknown = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(new URL(file, dir), 'utf8');
    for (const block of text.matchAll(/^```bdfd[^\n]*\n([\s\S]*?)^```\s*$/gm)) {
      for (const name of callNames(block[1])) if (!knownName(name)) unknown.push(`${file}: $${name}`);
    }
  }
  assert.deepEqual(unknown, [], 'Examples must only call functions the engine has (use `scripts/check-bdfd-examples.dart` against the engine for full validation).');
});

test('MCP planner recipes only name functions the engine has', async () => {
  const { RECIPES } = await import('../functions/api/mcp/planner.mjs');
  const unknown = [];
  for (const [i, r] of Object.entries(RECIPES)) {
    const recipe = r.r ?? r;
    for (const fn of recipe.fns ?? []) if (fn.startsWith('$') && !knownName(fn.slice(1))) unknown.push(`recipe ${i} fns: ${fn}`);
    if (recipe.skeleton && !recipe.skeleton.trim().startsWith('[')) {
      for (const name of callNames(recipe.skeleton)) if (!knownName(name)) unknown.push(`recipe ${i} skeleton: $${name}`);
    }
  }
  assert.deepEqual(unknown, []);
});

test('control-flow pages document their closing token', async () => {
  const closers = { if: '$endif', for: '$endfor', while: '$endwhile', loop: '$endloop', jsonforeach: '$endjsonforeach', try: '$endtry', func: '$funcend' };
  const missing = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const f = front(await readFile(new URL(file, dir), 'utf8'));
    const closer = closers[(f.function_name ?? '').toLowerCase()];
    if (closer && !(f.syntax ?? '').toLowerCase().includes(closer)) missing.push(file);
  }
  assert.deepEqual(missing, []);
});

test('examples never call $sendMessage with an empty text (the engine refuses it at run time)', async () => {
  const bad = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(new URL(file, dir), 'utf8');
    for (const block of text.matchAll(/^```bdfd[^\n]*\n([\s\S]*?)^```\s*$/gm)) {
      if (/\$sendMessage\[\s*(;[^\]]*)?\]/.test(block[1])) bad.push(file);
    }
  }
  assert.deepEqual(bad, []);
});

// Every engine function that has a page: a page must exist for the functions of the registry that scripts can call,
// otherwise the function is undocumented. Parser keywords documented elsewhere are listed explicitly.
test('every engine function has a documentation page', async () => {
  const pages = new Set();
  for (const file of await readdir(dir)) {
    if (!file.endsWith('.md')) continue;
    const text = await readFile(new URL(file, dir), 'utf8');
    pages.add(file.replace(/\.md$/, '').toLowerCase());
    const name = front(text).function_name;
    if (name) pages.add(name.toLowerCase());
  }
  // $loopIndex, $loopCount, $loopIteration are documented on the $for page.
  const onForPage = new Set(['loopindex', 'loopcount', 'loopiteration']);
  const missing = Object.keys(snapshot).filter(n => !pages.has(n) && !onForPage.has(n));
  assert.deepEqual(missing, [], 'Functions of the engine registry without a page in _docs/.');
});

// A previous pass left `0` as the default embed index on several pages while the engine counts from 1 (0 is an error).
test('embedIndex is documented as 1 to 10, never as a 0-based index', async () => {
  const wrong = [];
  for (const file of (await readdir(dir)).sort()) {
    if (!file.endsWith('.md')) continue;
    for (const line of (await readFile(new URL(file, dir), 'utf8')).split('\n')) {
      if (/embed ?index/i.test(line) && /(default(s| is|:)? ?(to )?`?0\b|\b0 by default|\(0 =|starts at 0|0-based)/i.test(line)) wrong.push(`${file}: ${line.trim().slice(0, 100)}`);
    }
  }
  assert.deepEqual(wrong, []);
});
