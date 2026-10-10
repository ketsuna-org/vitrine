import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFile, writeFile, copyFile, mkdtemp } from 'node:fs/promises';
import { existsSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import { tmpdir } from 'node:os';
import { join } from 'node:path';

// The BDFD engine is the source of truth. tests/bdfd_engine_behavior.json lists scripts for the control-flow
// functions ($for, $loop, $while, $break, $continue, $jsonForEach, $try / $catch / $error, $if), variables and
// embeds, with the output (or error) the REAL engine gives. Each case names the page that documents it and, when
// the page is expected to quote an engine message, the exact text it must contain.
//
//  - Always: the page exists and quotes the message.
//  - When BOT_CREATOR_DIR points at a bot-creator checkout and `dart` is installed: every case is run through the
//    real engine (scripts/probe-bdfd.dart) and compared with the recorded result, so a change of the engine fails
//    here and the page has to be reviewed. Skipped otherwise.
const cases = JSON.parse(await readFile(new URL('./bdfd_engine_behavior.json', import.meta.url), 'utf8'));
const doc = async page => readFile(new URL(`../_docs/${page}.md`, import.meta.url), 'utf8');

test('control-flow, variable and embed pages quote the engine messages they rely on', async () => {
  const problems = [];
  for (const c of cases) {
    if (!existsSync(new URL(`../_docs/${c.page}.md`, import.meta.url))) { problems.push(`${c.page}: page missing`); continue; }
    if (c.mention && !(await doc(c.page)).includes(c.mention)) problems.push(`${c.page}.md does not mention ${JSON.stringify(c.mention)}`);
  }
  assert.deepEqual(problems, []);
});

test('pages no longer state what the engine contradicts', async () => {
  const forbidden = {
    var: ['are case-insensitive', 'joined with `;`'],
    varexists: ['only checks **temporary** variables'],
    error: ['Throws a custom error', 'stops the command execution with the provided message'],
    color: ['The `#` prefix is optional', '15878690'],
    loop: ['does **not** provide an automatic loop index'],
    divide: ['returns `0`'],
  };
  const problems = [];
  for (const [page, texts] of Object.entries(forbidden)) {
    const text = await doc(page);
    for (const needle of texts) if (text.includes(needle)) problems.push(`${page}.md still says ${JSON.stringify(needle)}`);
  }
  assert.deepEqual(problems, []);
});

const root = process.env.BOT_CREATOR_DIR;
const shared = root && join(root, 'packages', 'shared');
let dartOk = false;
try { execFileSync('dart', ['--version'], { stdio: 'ignore' }); dartOk = true; } catch { /* dart not installed */ }

test('recorded behaviour still matches the real engine', { skip: !(shared && existsSync(shared) && dartOk) && 'set BOT_CREATOR_DIR to a bot-creator checkout (with `dart pub get` done) to run the cases against the engine' }, async () => {
  const dir = await mkdtemp(join(tmpdir(), 'bdfd-cases-'));
  const file = join(dir, 'cases.json');
  await writeFile(file, JSON.stringify(cases.map(c => c.src)));
  await copyFile(new URL('../scripts/probe-bdfd.dart', import.meta.url), join(shared, 'tool', 'probe-bdfd.dart'));
  const raw = execFileSync('dart', ['run', 'tool/probe-bdfd.dart', file], { cwd: shared, encoding: 'utf8', maxBuffer: 1 << 26, timeout: 300_000 });
  const results = JSON.parse(raw.slice(raw.indexOf('[')));
  assert.equal(results.length, cases.length);
  const diffs = [];
  results.forEach((r, i) => {
    const want = cases[i];
    const got = 'out' in r ? { out: r.out } : { error: r.error };
    const expected = 'out' in want ? { out: want.out } : { error: want.error };
    if (JSON.stringify(got) !== JSON.stringify(expected)) diffs.push({ page: want.page, src: want.src, expected, got });
  });
  assert.deepEqual(diffs, [], 'The engine changed: review the listed pages, then update tests/bdfd_engine_behavior.json.');
});
