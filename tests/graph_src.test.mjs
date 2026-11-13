// `src` (contrat §2) : origine `{line, col, fn}` d'un nœud dans le script BDFD converti. Le port JS la conserve
// (lecture, validation, sérialisation, ensureGraph) comme Dart et Go ; il ne l'interprète pas.
import { test } from "node:test";
import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import { normalizeGraph } from "../functions/api/mcp/graph_model.mjs";
import { validateGraph } from "../functions/api/mcp/graph_validate.mjs";
import { ensureGraph } from "../functions/api/mcp/graph_ensure.mjs";

const grammar = JSON.parse(await readFile(new URL("../_data/blocks_grammar.json", import.meta.url), "utf8"));
const knownTypes = new Set(Object.keys(grammar));
const roundtrip = JSON.parse(await readFile(new URL("./fixtures/bdfd_roundtrip_corpus.json", import.meta.url), "utf8"));

const graph = (src) => ({
  version: 2,
  nodes: [{ id: "n1", type: "log", key: "action_0", enabled: true, payload: { message: "x" }, ...(src === undefined ? {} : { src }) }],
  links: [{ from: { node: "start", pin: "next" }, to: "n1" }],
  data: [],
});

test("src : conservé, après error et avant pos, forme {line, col, fn}", () => {
  const raw = graph({ fn: "$channelName", col: 3, line: 2 });
  raw.nodes[0].pos = { x: 1, y: 2 };
  raw.nodes[0].error = { mode: "continue" };
  const out = normalizeGraph(raw);
  assert.equal(
    JSON.stringify(out.nodes[0]),
    '{"id":"n1","type":"log","key":"action_0","enabled":true,"payload":{"message":"x"},"error":{"mode":"continue"},"src":{"line":2,"col":3,"fn":"$channelName"},"pos":{"x":1,"y":2}}',
  );
  assert.deepEqual(out.nodes[0].invalidFields, []);
});

test("sans src : aucune clé", () => {
  assert.equal("src" in normalizeGraph(graph(undefined)).nodes[0], false);
});

test("src de mauvaise forme : ignoré et signalé invalid_field", () => {
  for (const bad of ["texte", { line: 0, col: 1, fn: "x" }, { line: 1, col: 1 }, { line: 1.5, col: 1, fn: "x" }, { line: 1, col: "1", fn: "x" }, { line: 1, col: 1, fn: 3 }]) {
    const out = normalizeGraph(graph(bad));
    assert.equal("src" in out.nodes[0], false, JSON.stringify(bad));
    assert.deepEqual(out.nodes[0].invalidFields, ["src"], JSON.stringify(bad));
    assert.deepEqual(validateGraph(graph(bad), knownTypes).errors.map((e) => e.code), ["invalid_field"], JSON.stringify(bad));
  }
  assert.deepEqual(validateGraph(graph({ line: 1, col: 1, fn: "" }), knownTypes).errors, []);
});

test("ensureGraph conserve src", () => {
  const result = ensureGraph({ graph: graph({ line: 2, col: 3, fn: "$channelName" }) });
  assert.match(JSON.stringify(result.entity), /"src":\{"line":2,"col":3,"fn":"\$channelName"\}/);
});

test("chaque src du corpus d'aller-retour BDFD traverse normalizeGraph à l'identique", () => {
  let seen = 0;
  for (const c of roundtrip.cases) {
    const out = normalizeGraph(JSON.parse(JSON.stringify(c.graph)));
    c.graph.nodes.forEach((n, i) => {
      if (n.src === undefined) return;
      seen++;
      assert.equal(JSON.stringify(out.nodes[i].src), JSON.stringify(n.src), c.name);
      assert.deepEqual(out.nodes[i].invalidFields, [], c.name);
    });
  }
  assert.ok(seen >= 100, `src dans le corpus : ${seen}`);
});
