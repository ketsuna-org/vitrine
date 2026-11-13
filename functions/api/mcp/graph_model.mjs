// Modèle de graphe (format v2) : constantes et normalisation du JSON.
//
// Port JS de `packages/shared/lib/graph/workflow_graph.dart` (contrat §2). Les constantes et la
// forme du JSON doivent rester identiques ; les corpus de conformité (tests/fixtures) le vérifient.

export const GRAPH_START_ID = "start";
export const GRAPH_FORMAT_VERSION = 2;
export const IF_TYPE = "ifBlock";
export const FOR_LOOP_TYPE = "forLoop";
export const JSON_FOR_EACH_TYPE = "jsonForEachLoop";
export const TRY_CATCH_TYPE = "tryCatch";
export const SWITCH_TYPE = "switch";
// Types ajoutés par « fonction = bloc » (`$while`, `$async`, `$break`, `$continue`) : pas des types d'action.
export const WHILE_LOOP_TYPE = "whileLoop";
export const ASYNC_BLOCK_TYPE = "asyncBlock";
export const BREAK_LOOP_TYPE = "breakLoop";
export const CONTINUE_LOOP_TYPE = "continueLoop";
/** Boucles : région fermée `body`, sortie `done`. */
export const LOOP_TYPES = new Set([FOR_LOOP_TYPE, JSON_FOR_EACH_TYPE, WHILE_LOOP_TYPE, ASYNC_BLOCK_TYPE]);
/** Types dont les pins `body` / `try` / `catch` ouvrent une RÉGION FERMÉE. */
export const REGION_OWNER_TYPES = new Set([...LOOP_TYPES, TRY_CATCH_TYPE]);

export const PINS = Object.freeze({
  next: "next",
  then: "then",
  else: "else",
  body: "body",
  try: "try",
  catch: "catch",
  done: "done",
  default: "default",
  error: "error",
});
export const elseIfPin = (i) => `elseif:${i}`;
export const caseOfPin = (value) => `case:${value}`;
export const isCasePin = (pin) => pin.startsWith("case:");

export const DATA_TYPES = new Set(["any", "text", "number", "list", "object", "boolean"]);

/** Erreur de forme (l'équivalent d'une `FormatException` de Dart). */
export class GraphFormatError extends Error {}

export const isPlainObject = (v) => v !== null && typeof v === "object" && !Array.isArray(v);

const stringKeyed = (raw) => (isPlainObject(raw) ? { ...raw } : {});

/**
 * Normalise un graphe JSON comme `WorkflowGraph.fromJson(...).toJson()` : ordre des clés, valeurs par
 * défaut, éléments mal formés ignorés. Lève `GraphFormatError` si la version n'est pas 2 ou si un
 * nœud (sans id ni type) ou un lien est incomplet.
 */
export function normalizeGraph(raw) {
  if (!isPlainObject(raw)) throw new GraphFormatError("The graph must be an object { version, nodes, links, data }.");
  if (raw.version !== GRAPH_FORMAT_VERSION) throw new GraphFormatError(`Unsupported graph version: ${raw.version}`);
  const maps = (list) => (Array.isArray(list) ? list.filter(isPlainObject) : []);
  const nodes = maps(raw.nodes).map((n) => {
    const { id, type, key } = n;
    if (typeof id !== "string" || !id) throw new GraphFormatError("Graph node without an id.");
    if (typeof type !== "string" || !type) throw new GraphFormatError(`Graph node ${id} without a type.`);
    // Une clé absente ou vide n'est pas une erreur de forme : le validateur la signale (`empty_key`).
    const out = { id, type, key: typeof key === "string" ? key : "", enabled: typeof n.enabled === "boolean" ? n.enabled : true, payload: stringKeyed(n.payload) };
    const error = stringKeyed(n.error);
    if (Object.keys(error).length > 0) out.error = error;
    if (isPlainObject(n.pos)) out.pos = { x: Number(n.pos.x) || 0, y: Number(n.pos.y) || 0 };
    return out;
  });
  const links = maps(raw.links).map((l) => {
    const from = stringKeyed(l.from);
    if (typeof from.node !== "string" || typeof from.pin !== "string" || typeof l.to !== "string") {
      throw new GraphFormatError("Malformed graph link.");
    }
    return { from: { node: from.node, pin: from.pin }, to: l.to };
  });
  const data = maps(raw.data).map((d) => {
    const from = stringKeyed(d.from);
    const to = stringKeyed(d.to);
    if (typeof from.node !== "string" || typeof from.out !== "string" || typeof to.node !== "string" || typeof to.field !== "string") {
      throw new GraphFormatError("Malformed graph data link.");
    }
    return { from: { node: from.node, out: from.out }, to: { node: to.node, field: to.field }, type: typeof d.type === "string" ? d.type : "any" };
  });
  return { version: GRAPH_FORMAT_VERSION, nodes, links, data };
}
