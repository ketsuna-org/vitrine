#!/usr/bin/env node
/**
 * Extracts the REAL block registry of the Bot Creator app into
 * `_data/blocks_registry.json`, the single source the Blocks docs render from.
 *
 *   node scripts/extract-blocks-registry.mjs --app ../bot-creator [--check] [--icons <dir>]
 *
 * Sources read from the app checkout (packages/ui/lib/src/…):
 *   - shared/lib/types/action.dart            enum BotCreatorActionType (the node types)
 *   - shared/lib/graph/workflow_graph.dart    graph constants: control node types, loop types, region owners,
 *                                             GraphPins, data types, start id
 *   - shared/lib/graph/graph_validation.dart  node types left out of the closed list (legacy navigation types)
 *   - shared/lib/graph/graph_conversion.dart  types whose inline action list became a `graph` sub-graph
 *   - editor/catalog/action_type_extension.dart  icon + parameterDefinitions (fields, hints, options)
 *   - editor/catalog/action_categories.dart   category, listener / interaction-only / legacy canvas blocks
 *   - editor/graph/graph_palette.dart         what the graph palette never offers (see `paletteExcluded`)
 *   - theme/block_family.dart                    family colour + family of each category
 *   - l10n/app_en.arb                            displayed name (the app has no per-block description any more)
 *
 * There is no "final block" notion any more: in the graph a node simply has no `next` link, so
 * the registry carries no `terminal` field.
 *
 * `--check` regenerates in memory and exits 1 when the committed JSON differs
 * (used by tests/blocks_registry.test.mjs when an app checkout is available).
 * `--icons <dir>` builds assets/icons/app-blocks.svg from a Material icons
 * `filled` SVG directory (npm: @material-design-icons/svg).
 */
import { readFile, writeFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const args = process.argv.slice(2);
const opt = (name) => { const i = args.indexOf(name); return i >= 0 ? args[i + 1] : undefined; };
const appDir = path.resolve(opt('--app') ?? process.env.BOT_CREATOR_APP_DIR ?? path.join(root, '..', 'bot-creator'));
const check = args.includes('--check');
const iconsDir = opt('--icons');

const files = {
  action: path.join(appDir, 'packages/shared/lib/types/action.dart'),
  graph: path.join(appDir, 'packages/shared/lib/graph/workflow_graph.dart'),
  validation: path.join(appDir, 'packages/shared/lib/graph/graph_validation.dart'),
  conversion: path.join(appDir, 'packages/shared/lib/graph/graph_conversion.dart'),
  ext: path.join(appDir, 'packages/ui/lib/src/editor/catalog/action_type_extension.dart'),
  palette: path.join(appDir, 'packages/ui/lib/src/editor/catalog/action_categories.dart'),
  graphPalette: path.join(appDir, 'packages/ui/lib/src/editor/graph/graph_palette.dart'),
  family: path.join(appDir, 'packages/ui/lib/src/theme/block_family.dart'),
  arb: path.join(appDir, 'packages/ui/lib/src/l10n/app_en.arb'),
  events: path.join(appDir, 'packages/shared/lib/utils/event_catalog.dart'),
  variables: path.join(appDir, 'packages/shared/lib/utils/variable_catalog.dart'),
};

// ───────────────────────── Dart helpers ─────────────────────────

/** Returns the source between the brace/paren that opens at `open` and its match. */
function balanced(src, open) {
  const pairs = { '(': ')', '[': ']', '{': '}' };
  const stack = [];
  let i = open;
  while (i < src.length) {
    const c = src[i];
    if (c === "'" || c === '"') { i = skipString(src, i); continue; }
    if (c === '/' && src[i + 1] === '/') { i = src.indexOf('\n', i); if (i < 0) break; continue; }
    if (pairs[c]) stack.push(pairs[c]);
    else if (c === ')' || c === ']' || c === '}') {
      stack.pop();
      if (stack.length === 0) return src.slice(open + 1, i);
    }
    i++;
  }
  throw new Error('unbalanced source');
}

function skipString(src, i) {
  const q = src[i];
  i++;
  while (i < src.length && src[i] !== q) { if (src[i] === '\\') i++; i++; }
  return i + 1;
}

/** Splits on top-level commas. */
function splitTop(src) {
  const out = [];
  let depth = 0, start = 0;
  for (let i = 0; i < src.length; i++) {
    const c = src[i];
    if (c === "'" || c === '"') { i = skipString(src, i) - 1; continue; }
    if (c === '(' || c === '[' || c === '{') depth++;
    else if (c === ')' || c === ']' || c === '}') depth--;
    else if (c === ',' && depth === 0) { out.push(src.slice(start, i)); start = i + 1; }
  }
  if (src.slice(start).trim()) out.push(src.slice(start));
  return out;
}

/** Evaluates a Dart string literal expression (adjacent literals are concatenated). */
function dartString(expr) {
  const parts = [];
  const re = /'((?:\\.|[^'\\])*)'|"((?:\\.|[^"\\])*)"/gs;
  let m;
  while ((m = re.exec(expr))) parts.push((m[1] ?? m[2]).replace(/\\(.)/g, '$1'));
  return parts.join('');
}

function dartValue(expr, consts) {
  const e = expr.trim();
  if (/^r?['"]/.test(e)) return dartString(e);
  if (e === 'true') return true;
  if (e === 'false') return false;
  if (e === 'null') return null;
  if (/^-?\d+(\.\d+)?$/.test(e)) return Number(e);
  if (consts[e]) return consts[e];
  if (e.startsWith('[') || e.startsWith('const [')) {
    const inner = balanced(e, e.indexOf('['));
    return splitTop(inner).map((x) => dartValue(x, consts));
  }
  if (e.startsWith('<') && e.includes('[')) {
    return splitTop(balanced(e, e.indexOf('['))).map((x) => dartValue(x, consts));
  }
  if (/^(const\s*)?(<[^>]*>)?\s*\{/.test(e)) {
    const inner = balanced(e, e.indexOf('{'));
    const obj = {};
    for (const entry of splitTop(inner)) {
      const k = entry.indexOf(':');
      obj[dartString(entry.slice(0, k))] = dartValue(entry.slice(k + 1), consts);
    }
    return obj;
  }
  return { expr: e };
}

/** Parses `switch (this) { case X: case Y: return …; }` bodies into {type: returnExpr}. */
function parseSwitch(body, typeRe) {
  const out = {};
  let pending = [];
  const re = new RegExp(`case\\s+${typeRe}\\.(\\w+)\\s*:|default\\s*:|return\\s+([^;]*?);`, 'gs');
  let m;
  while ((m = re.exec(body))) {
    if (m[1]) pending.push(m[1]);
    else if (m[0].startsWith('default')) pending = [];
    else { for (const t of pending) out[t] ??= m[2].trim(); pending = []; }
  }
  return out;
}

function methodBody(src, signature) {
  const at = src.indexOf(signature);
  if (at < 0) throw new Error(`not found: ${signature}`);
  return balanced(src, src.indexOf('{', at));
}

// ───────────────────────── extraction ─────────────────────────

const [actionSrc, graphSrc, validationSrc, conversionSrc, extSrc, paletteSrc, graphPaletteSrc, familySrc, arbRaw, eventsSrc, variablesSrc] = await Promise.all(
  Object.values(files).map((f) => readFile(f, 'utf8')),
);
const arb = JSON.parse(arbRaw);

// 1. Block types, in declaration order. Doc comments marking deprecation are kept.
const enumBody = methodBody(actionSrc, 'enum BotCreatorActionType');
const types = [];
const deprecated = new Set();
let sawDeprecated = false;
for (const line of enumBody.split('\n')) {
  const t = line.trim();
  if (/^\/\/\/.*Deprecated/i.test(t)) sawDeprecated = true;
  const m = t.match(/^(\w+),$/);
  if (m) { types.push(m[1]); if (sawDeprecated) deprecated.add(m[1]); sawDeprecated = false; }
}

// 1b. Graph model (workflow_graph.dart): constants only, so the docs never restate them by hand.
const dartConst = (src, name) => {
  const m = src.match(new RegExp(`const\\s+(?:String|int)\\s+${name}\\s*=\\s*('(?:\\\\.|[^'\\\\])*'|\\d+)\\s*;`));
  if (!m) throw new Error(`workflow_graph.dart: constant ${name} not found`);
  return m[1].startsWith("'") ? dartString(m[1]) : Number(m[1]);
};
const graphFormat = dartConst(graphSrc, 'graphFormatVersion');
const controlTypes = ['If', 'ForLoop', 'JsonForEachLoop', 'TryCatch', 'Switch'].map((n) => dartConst(graphSrc, `graph${n}Type`));
// Loop types: a Set literal in workflow_graph.dart; the ones that are not in the enum are
// the `$while` / `$async` / `$break` / `$continue` function blocks.
const dartIdentSet = (src, name) => {
  const body = balanced(src, src.indexOf('{', src.indexOf(`Set<String> ${name} =`)));
  return splitTop(body).map((x) => x.trim()).filter(Boolean).flatMap((x) => (x.startsWith('...')
    ? dartIdentSet(src, x.slice(3)) : [dartConst(src, x)]));
};
const loopTypes = dartIdentSet(graphSrc, 'graphLoopTypes');
const [whileType, asyncType, breakType, continueType] = ['WhileLoop', 'AsyncBlock', 'Break', 'Continue']
  .map((n) => dartConst(graphSrc, `graph${n}Type`));
const pinsBody = methodBody(graphSrc, 'abstract final class GraphPins');
const pins = Object.fromEntries([...pinsBody.matchAll(/static const String (\w+)\s*=\s*('[^']*')\s*;/g)].map((m) => [m[1], dartString(m[2])]));
const dataTypes = [...methodBody(graphSrc, 'abstract final class GraphDataTypes').matchAll(/static const String (\w+)\s*=\s*'(\w+)'/g)].map((m) => m[2]);
const regionOwners = dartIdentSet(graphSrc, 'graphRegionOwnerTypes');
// Types left out of the closed list of node types (they became `switch` nodes): `t != BotCreatorActionType.X`.
const legacyTypes = [...validationSrc.matchAll(/t\s*!=\s*BotCreatorActionType\.(\w+)/g)].map((m) => m[1]);
const inlineGraphTypes = [...methodBody(conversionSrc, 'const Set<String> graphInlineHandlerTypes = ').matchAll(/'(\w+)'/g)].map((m) => m[1]);

// 2. Icons (Material icon names).
const iconBody = methodBody(extSrc, 'IconData get icon');
const icons = parseSwitch(iconBody, 'BotCreatorActionType');

// 3. Constants used in parameter definitions.
const consts = {};
for (const m of extSrc.matchAll(/static const (_\w+)\s*=\s*(\[)/g)) {
  const at = m.index + m[0].length - 1;
  consts[m[1]] = dartValue('[' + balanced(extSrc, at) + ']', consts);
}

// 4. Parameter definitions.
const paramBody = methodBody(extSrc, 'List<ParameterDefinition> get parameterDefinitions');
const params = {};
{
  const re = /case\s+BotCreatorActionType\.(\w+)\s*:\s*return\s*\[/g;
  let m;
  while ((m = re.exec(paramBody))) {
    // Typed literals like `<Map<String, dynamic>>[]` hold commas: drop the type arguments.
    const list = balanced(paramBody, m.index + m[0].length - 1)
      .replace(/<(?:[\w?]+|[\s,<>?])*>(?=\s*[\[{])/g, '');
    const defs = [];
    const dre = /ParameterDefinition\(/g;
    let d;
    while ((d = dre.exec(list))) {
      const inner = balanced(list, d.index + d[0].length - 1);
      dre.lastIndex = d.index + d[0].length + inner.length;
      const named = {};
      for (const part of splitTop(inner)) {
        const k = part.indexOf(':');
        named[part.slice(0, k).trim()] = part.slice(k + 1).trim();
      }
      const def = {
        key: dartString(named.key),
        type: named.type.replace('ParameterType.', ''),
        default: dartValue(named.defaultValue, consts),
      };
      if (named.hint) def.hint = dartString(named.hint);
      if (named.options) def.options = dartValue(named.options, consts);
      if (named.visibleWhen) def.visibleWhen = dartValue(named.visibleWhen, consts);
      if (named.minValue) def.min = Number(named.minValue);
      if (named.maxValue) def.max = Number(named.maxValue);
      if (named.required === 'true') def.required = true;
      if (named.allowDynamic === 'false') def.allowDynamic = false;
      defs.push(def);
    }
    params[m[1]] = defs;
  }
}

// 5. Palette: category, terminal blocks, hidden blocks.
const category = parseSwitch(methodBody(paletteSrc, 'String getCategoryForAction'), 'BotCreatorActionType');
const caseSet = (sig) => {
  const body = methodBody(paletteSrc, sig);
  const set = new Set();
  for (const m of body.matchAll(/case BotCreatorActionType\.(\w+):/g)) set.add(m[1]);
  return set;
};
const hidden = caseSet('bool _isCanvasAction');
const autocompleteOnly = new Set([...methodBody(paletteSrc, 'bool isAutocompleteOnlyAction').matchAll(/BotCreatorActionType\.(\w+)/g)].map((m) => m[1]));
// graph_palette.dart skips these types whatever the context (`type == …` / `t == …` tests, then the
// `continue` that follows): composed from the same source so the docs say "not offered" like the app.
const paletteExcluded = new Set([
  ...[...graphPaletteSrc.slice(graphPaletteSrc.indexOf('List<GraphPaletteEntry> graphPaletteEntries('), graphPaletteSrc.indexOf('filterGraphPalette(')).matchAll(/(?:type|t)\s*==\s*BotCreatorActionType\.(\w+)(?:\.name)?/g)].map((m) => m[1]),
  'callFunction', // `type == graphFunctionNodeType` (functions are offered as `fn:<name>` entries)
]);
const listeners = caseSet('bool isListenerAction');
const interactionOnly = caseSet('bool isInteractionOnlyAction');

// 6. Families: colour per family and family of each category.
const familyColors = {};
for (const m of familySrc.matchAll(/^\s*(\w+)\(Color\(0x([0-9A-Fa-f]{8})\),\s*'(\w+)'\)/gm)) {
  familyColors[m[1]] = { color: '#' + m[2].slice(2).toUpperCase(), l10nKey: m[3] };
}
const familyOfCategory = {};
{
  const body = methodBody(familySrc, 'static BlockFamily fromCategoryName');
  let pending = [];
  for (const m of body.matchAll(/case '([^']+)':|return BlockFamily\.(\w+);/g)) {
    if (m[1]) pending.push(m[1]);
    else { for (const c of pending) familyOfCategory[c] = m[2]; pending = []; }
  }
}
const familyLabel = { http: 'HTTP & Variables', logic: 'Logic & Flow', messages: 'Messages', moderation: 'Moderation', data: 'Data', events: 'Events' };

// 7. Field label, exactly like ActionCard._formatParameterName.
const fieldLabel = (key) => key
  .replace(/([A-Z])/g, ' $1').split(' ')
  .map((w) => w[0].toUpperCase() + w.slice(1)).join(' ');

// 8. Graph node types: every action type except the legacy navigation ones (now `switch` nodes),
// plus the control types that are not in the enum (`tryCatch`, `switch`).
const [ifType, forType, jsonForType, tryType, switchType] = controlTypes;
const extraTypes = [whileType, asyncType, breakType, continueType];
const nodeTypes = [...types.filter((t) => !legacyTypes.includes(t)), ...controlTypes.filter((t) => !types.includes(t)), ...extraTypes];

// Output pins of a node type (contract §2; same rule as `_allowedPins` in graph_validation.dart).
const pinsOf = (t) => {
  if (t === ifType) return [pins.then, 'elseif:<i>', pins.elseBranch, pins.error];
  if (t === forType || t === jsonForType || loopTypes.includes(t)) return [pins.body, pins.done, pins.error];
  if (t === breakType || t === continueType) return [pins.error]; // they leave the loop: nothing follows
  if (t === tryType) return [pins.tryBody, pins.catchBody, pins.done, pins.error];
  if (t === switchType) return ['case:<value>', pins.defaultCase, pins.error];
  return [pins.next, pins.error];
};

// Control nodes that do not exist in the app's enum: described here, from the contract (§2).
const controlNodes = {
  [tryType]: {
    name: 'Try / Catch',
    icon: 'security',
    fields: [],
  },
  [switchType]: {
    name: 'Switch',
    icon: 'shuffle',
    fields: [
      { key: 'value', type: 'string', default: '', hint: 'Value to compare, resolved at run time', required: true },
      { key: 'mode', type: 'multiSelect', default: 'text', options: ['text', 'int'] },
      { key: 'resultPrefix', type: 'string', default: '', hint: 'Prefix of the result written as <prefix><value>' },
    ],
  },
};

// Loop-function blocks (`$while`, `$async`, `$break`, `$continue`): not enum values, no l10n entry.
// `whileLoop` evaluates the same condition as `ifBlock` (native_node_executor.dart `_while`).
Object.assign(controlNodes, {
  [whileType]: {
    name: 'While',
    icon: 'loop',
    fields: (params[ifType] ?? []).filter((d) => d.key.startsWith('condition.')),
  },
  [asyncType]: {
    name: 'Async',
    icon: 'play_arrow',
    fields: [],
  },
  [breakType]: { name: 'Break', icon: 'stop_circle', fields: [] },
  [continueType]: { name: 'Continue', icon: 'skip_next', fields: [] },
});

// Fields that exist only for the old nested-list model: the graph has pins and sub-graphs instead.
const droppedFields = { [ifType]: ['tryCatch', 'suppressErrors'] };
const graphField = { key: 'graph', type: 'graph', default: null, hint: 'Sub-graph run later (opens the graph editor)' };
const graphFields = (t, defs) => defs.flatMap((d) => {
  if (droppedFields[t]?.includes(d.key)) return [];
  if (d.type !== 'nestedActions') return [d];
  return inlineGraphTypes.includes(t) && d.key === 'actions' ? [graphField] : [];
});

const blocks = nodeTypes.map((t) => {
  const control = controlNodes[t];
  const cat = control ? 'Logic & Flow' : category[t]?.replace(/^'|'$/g, '');
  const fam = familyOfCategory[cat.toLowerCase()] ?? 'logic';
  return {
    type: t,
    name: arb[`action_name_${t}`] ?? control?.name ?? null,
    category: cat,
    family: fam,
    icon: control ? control.icon : (icons[t] ?? 'Icons.extension').replace('Icons.', ''),
    deprecated: deprecated.has(t),
    inPalette: !(hidden.has(t) || autocompleteOnly.has(t) || paletteExcluded.has(t)),
    workflowOnly: listeners.has(t),
    interactionOnly: interactionOnly.has(t),
    pins: pinsOf(t),
    fields: graphFields(t, control ? control.fields : (params[t] ?? [])).map((p) => ({ label: fieldLabel(p.key), ...p })),
  };
});

const missingName = blocks.filter((b) => !b.name).map((b) => b.type);
if (missingName.length) console.warn('no l10n name for:', missingName.join(', '));

// Events of the "Event trigger" entry point (shared/lib/utils/event_catalog.dart).
const events = [...eventsSrc.matchAll(/WorkflowEventDefinition\(\s*category:\s*('(?:\\.|[^'\\])*'),\s*event:\s*('(?:\\.|[^'\\])*'),\s*label:\s*('(?:\\.|[^'\\])*')/g)]
  .map((m) => ({ category: dartString(m[1]), event: dartString(m[2]), label: dartString(m[3]) }));

// Built-in ((variables)) the app suggests (shared/lib/utils/variable_catalog.dart).
const variables = [...new Set([
  ...[...variablesSrc.matchAll(/^\s*'([\w.\[\]]+)':\s/gm)].map((m) => m[1]),
  ...[...variablesSrc.matchAll(/name:\s*'([\w.\[\]]+)'/g)].map((m) => m[1]),
])].sort();

const registry = {
  _generated: 'scripts/extract-blocks-registry.mjs — do not edit by hand',
  families: Object.fromEntries(Object.entries(familyColors).map(([k, v]) => [k, { label: familyLabel[k], color: v.color }])),
  // ActionCard "Advanced settings" panel shown under the fields of every block (forms/action_card.dart).
  common: {
    title: arb.action_advanced_settings,
    fields: [
      { key: 'key', label: arb.action_key_field },
      { key: 'enabled', label: arb.common_enabled },
      { key: 'error.mode', label: arb.action_on_error, options: [arb.action_error_stop, arb.action_error_continue] },
    ],
  },
  entryPoint: {
    name: arb.scratch_block_entry_point,
    family: 'events',
    icon: 'play_circle_outline',
    question: arb.scratch_entry_point_listen,
    // Segmented control "When does this command run?" (label) and the badge shown in the header (badge).
    segments: [
      { kind: 'slash', label: arb.scratch_meta_type_slash, badge: arb.scratch_meta_type_slash, desc: arb.scratch_meta_type_slash_desc, prefix: '/' },
      { kind: 'prefix', label: arb.scratch_entry_message, badge: arb.scratch_meta_type_prefix, desc: arb.scratch_meta_type_prefix_desc, prefix: '!' },
      { kind: 'user', label: arb.scratch_meta_type_user, badge: arb.scratch_meta_type_user, desc: arb.scratch_meta_type_user_desc, prefix: '' },
      { kind: 'message', label: arb.scratch_meta_type_message, badge: arb.scratch_meta_type_message, desc: arb.scratch_meta_type_message_desc, prefix: '' },
    ],
    event: {
      title: arb.scratch_entry_event_trigger,
      icon: 'flash_on',
      // getCategoryColor('EntryPoint') = Colors.lime.shade700 (action_categories.dart)
      color: '#AFB42B',
      categoryLabel: arb.scratch_event_category,
      nameLabel: arb.scratch_event_name,
      customIdLabel: arb.scratch_custom_id_filter_label,
      variablesLabel: arb.scratch_event_variables,
    },
    executionModeLabel: arb.scratch_execution_mode,
    executionModes: [arb.scratch_mode_blocks, arb.scratch_mode_bdfd, arb.cmd_execution_mode_javascript],
  },
  // Labels of the embed editor (forms/response_embeds_editor.dart), used to render embed values.
  events,
  variables,
  embedLabels: Object.fromEntries(
    ['embed_label_title', 'common_description', 'embed_label_color', 'embed_label_url', 'embed_label_footer_text',
      'embed_label_timestamp', 'embed_add_field', 'common_name', 'common_value', 'embed_label_inline']
      .map((k) => [k, arb[k] ?? null]),
  ),
  // The graph model (contract §2), read from packages/shared/lib/graph/*.dart.
  graph: {
    version: graphFormat,
    startId: dartConst(graphSrc, 'graphStartId'),
    controlTypes,
    loopTypes,
    regionOwners,
    inlineGraphTypes,
    legacyTypes,
    pins,
    dataTypes,
  },
  blocks,
};

const out = JSON.stringify(registry, null, 2) + '\n';
const outPath = path.join(root, '_data/blocks_registry.json');

if (check) {
  const current = await readFile(outPath, 'utf8');
  if (current !== out) { console.error('blocks_registry.json is out of date with the app sources'); process.exit(1); }
  console.log('blocks_registry.json matches the app sources');
} else {
  await writeFile(outPath, out);
  console.log(`wrote ${blocks.length} node types, ${blocks.reduce((n, b) => n + b.fields.length, 0)} fields`);
}

// 8. Icon sprite (Material filled icons, the set Flutter's `Icons.*` uses).
if (iconsDir) {
  const names = new Set(blocks.map((b) => b.icon).concat(registry.entryPoint.icon, registry.entryPoint.event.icon, 'expand_less', 'expand_more', 'more_vert', 'edit'));
  const have = new Set((await readdir(iconsDir)).map((f) => f.replace(/\.svg$/, '')));
  const outlinedDir = path.join(path.dirname(iconsDir), 'outlined');
  // Flutter names that differ from the Material icon package names.
  const resolve = (n) => {
    if (have.has(n)) return path.join(iconsDir, `${n}.svg`);
    if (n === 'play_circle_fill') return path.join(iconsDir, 'play_circle.svg');
    if (n === 'info_outline') return path.join(outlinedDir, 'info.svg');
    if (n.endsWith('_outlined')) return path.join(outlinedDir, `${n.slice(0, -'_outlined'.length)}.svg`);
    return null;
  };
  const symbols = [];
  const missing = [];
  for (const n of [...names].sort()) {
    const file = resolve(n);
    let svg;
    try { svg = file && await readFile(file, 'utf8'); } catch { svg = null; }
    if (!svg) { missing.push(n); continue; }
    const inner = svg.replace(/^[\s\S]*?<svg[^>]*>/, '').replace(/<\/svg>\s*$/, '');
    symbols.push(`<symbol id="${n}" viewBox="0 0 24 24">${inner}</symbol>`);
  }
  await writeFile(path.join(root, 'assets/icons/app-blocks.svg'),
    `<svg xmlns="http://www.w3.org/2000/svg" style="display:none">\n${symbols.join('\n')}\n</svg>\n`);
  console.log(`icon sprite: ${symbols.length} icons${missing.length ? `, missing: ${missing.join(', ')}` : ''}`);
}
