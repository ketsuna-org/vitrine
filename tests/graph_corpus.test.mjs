// Conformité des ports JS du graphe (validation, conversion, ensureGraph) avec les corpus écrits par
// les tests Dart de `packages/shared` (copiés dans tests/fixtures). Chaque entrée de chaque corpus
// doit produire exactement la même sortie qu'en Dart.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { validateGraph } from "../functions/api/mcp/graph_validate.mjs";
import { convertActionsToGraph } from "../functions/api/mcp/graph_convert.mjs";
import { ensureGraph } from "../functions/api/mcp/graph_ensure.mjs";

const fixture = async (name) => JSON.parse(await readFile(new URL(`./fixtures/${name}`, import.meta.url), "utf8"));
const grammar = JSON.parse(await readFile(new URL("../_data/blocks_grammar.json", import.meta.url), "utf8"));
// Les types connus du validateur sont ceux de la grammaire (= le registre des types de nœud).
const knownTypes = new Set(Object.keys(grammar));
const codes = (issues) => [...new Set(issues.map((i) => i.code))].sort();

const validation = await fixture("graph_validation_corpus.json");
const conversion = await fixture("graph_conversion_corpus.json");
const ensure = await fixture("ensure_graph_corpus.json");
const roundtrip = await fixture("bdfd_roundtrip_corpus.json");

test("les corpus sont complets", () => {
  assert.ok(validation.length >= 60, `validation: ${validation.length}`);
  assert.ok(conversion.length >= 40, `conversion: ${conversion.length}`);
  assert.ok(ensure.length >= 12, `ensure: ${ensure.length}`);
});

for (const entry of validation) {
  test(`validation: ${entry.name}`, () => {
    const result = validateGraph(entry.graph, knownTypes);
    assert.deepEqual(codes(result.errors), entry.errors, "codes d'erreur");
    assert.deepEqual(codes(result.warnings), entry.warnings, "codes d'avertissement");
    assert.equal(result.valid, entry.errors.length === 0);
  });
}

for (const entry of conversion) {
  test(`conversion: ${entry.name}`, () => {
    const input = JSON.parse(JSON.stringify(entry.input));
    const result = convertActionsToGraph(input);
    assert.deepEqual(input, entry.input, "l'entrée n'est pas modifiée");
    // Comparaison en texte : l'ordre des clés fait partie du contrat (JSON déterministe).
    assert.equal(JSON.stringify(result.graph), JSON.stringify(entry.graph));
    assert.deepEqual(result.warnings.map((w) => w.code), entry.warnings);
  });
}

for (const entry of ensure) {
  test(`ensureGraph: ${entry.name}`, () => {
    const input = JSON.parse(JSON.stringify(entry.input));
    const result = ensureGraph(input);
    assert.deepEqual(input, entry.input, "l'entrée n'est pas modifiée");
    assert.equal(JSON.stringify(result.entity), JSON.stringify(entry.output));
    assert.equal(result.converted, entry.converted);
    assert.deepEqual(result.warnings.map((w) => w.code), entry.warnings);
    if (!entry.converted) assert.equal(result.entity, input, "rendue telle quelle");
  });
}

test("ensureGraph est idempotent sur tout le corpus", () => {
  for (const entry of ensure) {
    const once = ensureGraph(JSON.parse(JSON.stringify(entry.input))).entity;
    const twice = ensureGraph(once);
    assert.equal(twice.converted, false, entry.name);
    assert.equal(twice.entity, once, entry.name);
  }
});

test("tout graphe produit par la conversion est valide (aucune erreur)", () => {
  for (const entry of conversion) {
    const { graph } = convertActionsToGraph(JSON.parse(JSON.stringify(entry.input)));
    assert.deepEqual(validateGraph(graph, knownTypes).errors, [], entry.name);
  }
});

test("les graphes du corpus d'aller-retour BDFD sont valides", () => {
  assert.ok(roundtrip.cases.length > 0);
  for (const c of roundtrip.cases) {
    const codes = validateGraph(c.graph, knownTypes).errors.map((e) => e.code);
    // `libre:parallele` lance exprès deux branches parallèles qui répondent : seul cas attendu en erreur.
    assert.deepEqual(codes, c.name === "libre:parallele" ? ["concurrent_response"] : [], c.name);
  }
});
