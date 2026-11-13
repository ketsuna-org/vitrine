// Conformité des ports JS du graphe (validation, conversion, ensureGraph) avec les corpus écrits par
// les tests Dart de `packages/shared` (copiés dans tests/fixtures). Chaque entrée de chaque corpus
// doit produire exactement la même sortie qu'en Dart.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { existsSync } from "node:fs";
import { execFileSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import { validateGraph } from "../functions/api/mcp/graph_validate.mjs";
import { convertActionsToGraph } from "../functions/api/mcp/graph_convert.mjs";
import { ensureGraph } from "../functions/api/mcp/graph_ensure.mjs";
import { dartIntParse } from "../functions/api/mcp/graph_convert.mjs";
import { LOOP_TYPES, REGION_OWNER_TYPES } from "../functions/api/mcp/graph_model.mjs";

const fixture = async (name) => JSON.parse(await readFile(new URL(`./fixtures/${name}`, import.meta.url), "utf8"));
const grammar = JSON.parse(await readFile(new URL("../_data/blocks_grammar.json", import.meta.url), "utf8"));
// Les types connus du validateur sont ceux de la grammaire (= le registre des types de nœud).
const knownTypes = new Set(Object.keys(grammar));
const codes = (issues) => [...new Set(issues.map((i) => i.code))].sort();

// Les deux fichiers « loops » et « dartint » sont calculés par le Dart réel et complètent les corpus principaux
// (types de boucle, `int.tryParse`) : à fusionner dans packages/shared/test/fixtures côté bot-creator.
const validation = [...(await fixture("graph_validation_corpus.json")), ...(await fixture("graph_validation_loops_corpus.json"))];
const conversion = [...(await fixture("graph_conversion_corpus.json")), ...(await fixture("graph_conversion_dartint_corpus.json"))];
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

// `dart_int_parse.json` : sortie réelle de `int.tryParse` (Dart VM) ; le port JS doit lire les entiers pareil.
test("dartIntParse lit les entiers comme int.tryParse de Dart", async () => {
  const table = await fixture("dart_int_parse.json");
  assert.ok(Object.keys(table).length >= 80);
  for (const [input, want] of Object.entries(table)) {
    const got = dartIntParse(input);
    assert.equal(got === null ? null : got.toString(), want, JSON.stringify(input));
  }
});

// Les types de boucle sont dans la grammaire (le validateur n'accepte que ses types) ET suivent le registre extrait de l'app.
test("les types de boucle du validateur suivent le registre de l'app", async () => {
  const registry = JSON.parse(await readFile(new URL("../_data/blocks_registry.json", import.meta.url), "utf8"));
  assert.deepEqual([...LOOP_TYPES].sort(), [...registry.graph.loopTypes].sort());
  assert.deepEqual([...REGION_OWNER_TYPES].sort(), [...registry.graph.regionOwners].sort());
  for (const type of [...registry.graph.regionOwners, "breakLoop", "continueLoop"]) assert.ok(knownTypes.has(type), `grammaire : ${type}`);
});

// Les quatre corpus sont des COPIES exactes des fixtures Dart (scripts/sync-graph-corpora.mjs les recopie).
const appCheckout = [process.env.BOT_CREATOR_APP_DIR, new URL("../../bot-creator", import.meta.url).pathname]
  .filter(Boolean)
  .find((dir) => existsSync(`${dir}/packages/shared/test/fixtures`));
test("les corpus sont identiques aux fixtures Dart", { skip: !appCheckout && "dépôt bot-creator absent" }, () => {
  execFileSync("node", [fileURLToPath(new URL("../scripts/sync-graph-corpora.mjs", import.meta.url)), "--app", appCheckout, "--check"], { stdio: "pipe" });
});
