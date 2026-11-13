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

const withInvalidFields = (out, invalid) => {
  // Jamais sérialisé : lu par `validateGraph` (`invalid_field`).
  Object.defineProperty(out, "invalidFields", { value: invalid, enumerable: false });
  return out;
};

/**
 * Normalise un graphe JSON comme `WorkflowGraph.fromJson(...).toJson()` : ordre des clés, valeurs par
 * défaut, éléments mal formés ignorés. Tolérant, comme Dart : seule une version autre que 2 lève
 * `GraphFormatError` ; un champ de mauvais type, une clé, un id ou un type vide sont signalés par
 * `validateGraph` (`empty_key`, `unknown_node_type`, `invalid_field`, nœud ou pin introuvable).
 */
export function normalizeGraph(raw) {
  if (!isPlainObject(raw)) throw new GraphFormatError("The graph must be an object { version, nodes, links, data }.");
  if (raw.version !== GRAPH_FORMAT_VERSION) throw new GraphFormatError(`Unsupported graph version: ${raw.version}`);
  const maps = (list) => (Array.isArray(list) ? list.filter(isPlainObject) : []);
  const text = (v) => (typeof v === "string" ? v : "");
  const nodes = maps(raw.nodes).map((n) => {
    const invalid = [];
    const id = text(n.id);
    if (id === "") invalid.push("id");
    const enabled = n.enabled;
    if (enabled !== undefined && enabled !== null && typeof enabled !== "boolean") invalid.push("enabled");
    const out = { id, type: text(n.type), key: text(n.key), enabled: typeof enabled === "boolean" ? enabled : true, payload: stringKeyed(n.payload) };
    const error = stringKeyed(n.error);
    if (Object.keys(error).length > 0) out.error = error;
    if (isPlainObject(n.pos)) {
      const coord = (v) => {
        if (v === undefined || v === null) return 0;
        if (typeof v !== "number") {
          if (!invalid.includes("pos")) invalid.push("pos");
          return 0;
        }
        return v;
      };
      out.pos = { x: coord(n.pos.x), y: coord(n.pos.y) };
    } else if (n.pos !== undefined && n.pos !== null) invalid.push("pos");
    return withInvalidFields(out, invalid);
  });
  const links = maps(raw.links).map((l) => {
    const from = stringKeyed(l.from);
    return { from: { node: text(from.node), pin: text(from.pin) }, to: text(l.to) };
  });
  const data = maps(raw.data).map((d) => {
    const from = stringKeyed(d.from);
    const to = stringKeyed(d.to);
    const hasType = d.type !== undefined && d.type !== null;
    const out = {
      from: { node: text(from.node), out: text(from.out) },
      to: { node: text(to.node), field: text(to.field) },
      type: typeof d.type === "string" ? d.type : "any",
    };
    return withInvalidFields(out, hasType && typeof d.type !== "string" ? ["type"] : []);
  });
  return { version: GRAPH_FORMAT_VERSION, nodes, links, data };
}
