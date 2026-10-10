import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, readdir } from 'node:fs/promises';

// The BDFD engine is the source of truth; _docs pages describe it. This test compares the argument
// counts each page's `syntax:` advertises with the engine registry snapshot
// (_data/bdfd-engine-signatures.json, regenerated with scripts/dump-bdfd-signatures.dart).
// tests/docs_engine_known_gaps.json lists pages that still differ and why; the list must only shrink.

// Structural tokens the parser handles itself: their page documents a block form, while the registry entry
// is the inline function form, so their `syntax:` cannot be compared.
const structural = new Set(['if', 'for', 'try', 'jsonforeach']);
const dir = new URL('../_docs/', import.meta.url);
const snapshot = JSON.parse(await readFile(new URL('../_data/bdfd-engine-signatures.json', import.meta.url), 'utf8'));
const knownGaps = JSON.parse(await readFile(new URL('./docs_engine_known_gaps.json', import.meta.url), 'utf8'));
const front = text => Object.fromEntries([...(text.match(/^---\n([\s\S]*?)\n---/)?.[1] ?? '').matchAll(/^(\w+):\s*(.*)$/gm)].map(m => [m[1], m[2].replace(/^["']|["']$/g, '').trim()]));

// Argument counts one syntax string advertises. A parameter written `(x)` or `x?` is optional, and every
// parameter inside a `( ... ; ... )` group is optional. `...` marks a variadic tail.
function advertisedCounts(syntax) {
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
    if (variadic) { counts.add(99); continue; }
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
    const f = front(await readFile(new URL(file, dir), 'utf8'));
    if ((f.api_type || 'bdfd') !== 'bdfd' || !f.function_name) continue;
    if (structural.has(f.function_name.toLowerCase())) continue;
    const sig = snapshot[f.function_name.toLowerCase()];
    if (!sig) continue;
    const doc = advertisedCounts(f.syntax ?? '');
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
  assert.deepEqual(unknown.filter(f => !['for-loop.md', 'try-catch.md', 'jsonforeach.md'].includes(f)), []);
});
