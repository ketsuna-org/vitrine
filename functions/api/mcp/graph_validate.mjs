// Validation d'un graphe (format v2) : port JS de `packages/shared/lib/graph/graph_validation.dart`
// (contrat §2 et §5). Le corpus `graph_validation_corpus.json` impose les mêmes codes qu'en Dart et
// en Go. La validation ne modifie rien et ne lit que la FORME du graphe (types, pins, liens) ; les
// paramètres de chaque nœud sont vérifiés à part, par la grammaire (voir [[route]].js).

import {
  GRAPH_START_ID,
  IF_TYPE,
  LOOP_TYPES,
  BREAK_LOOP_TYPE,
  CONTINUE_LOOP_TYPE,
  TRY_CATCH_TYPE,
  SWITCH_TYPE,
  REGION_OWNER_TYPES,
  PINS,
  elseIfPin,
  isCasePin,
  DATA_TYPES,
  normalizeGraph,
} from "./graph_model.mjs";

export const GRAPH_MAX_NODES = 2000;
export const GRAPH_MAX_JSON_BYTES = 2000000;

/** Types d'action qui répondent à l'interaction (réponse initiale, modal, `defer`). */
export const INITIAL_RESPONSE_TYPES = new Set([
  "respondWithMessage",
  "respondWithComponentV2",
  "respondWithModal",
  "respondWithAutocomplete",
  "deferInteraction",
]);

const utf8Length = (text) => new TextEncoder().encode(text).length;

/**
 * Valide [rawGraph] (JSON d'un graphe v2). [knownTypes] : l'ensemble fermé des types de nœud
 * (`Set<string>`). Rend `{ valid, errors, warnings }` ; chaque problème est `{ code, message, nodeId? }`.
 * Lève `GraphFormatError` si la version n'est pas 2 ; le reste (champ de mauvais type, id vide…) est signalé.
 */
export function validateGraph(rawGraph, knownTypes) {
  const graph = normalizeGraph(rawGraph);
  const errors = [];
  const warnings = [];
  const add = (list, code, message, nodeId) => list.push(nodeId === undefined ? { code, message } : { code, message, nodeId });
  const err = (code, message, nodeId) => add(errors, code, message, nodeId);
  const warn = (code, message, nodeId) => add(warnings, code, message, nodeId);
  const done = () => ({ valid: errors.length === 0, errors, warnings });

  // Taille : un graphe trop gros est refusé avant toute analyse (qui resterait quadratique).
  let tooLarge = false;
  if (graph.nodes.length > GRAPH_MAX_NODES) {
    tooLarge = true;
    err("graph_too_large", `The graph has ${graph.nodes.length} nodes (maximum ${GRAPH_MAX_NODES}).`);
  }
  const jsonBytes = utf8Length(JSON.stringify(graph));
  if (jsonBytes > GRAPH_MAX_JSON_BYTES) {
    tooLarge = true;
    err("graph_json_too_large", `The graph JSON is ${jsonBytes} bytes (maximum ${GRAPH_MAX_JSON_BYTES}).`);
  }
  if (tooLarge) return done();

  // Identifiants, types et clés.
  const byId = new Map();
  for (const node of graph.nodes) {
    if (node.id === GRAPH_START_ID) err("reserved_node_id", `The id "${GRAPH_START_ID}" is reserved.`, node.id);
    else if (byId.has(node.id)) err("duplicate_node_id", `Two nodes share the id "${node.id}".`, node.id);
    else byId.set(node.id, node);
  }
  const exists = (id) => byId.has(id);

  const seenKeys = new Set();
  for (const node of graph.nodes) {
    if (!knownTypes.has(node.type)) err("unknown_node_type", `The node type "${node.type}" is unknown.`, node.id);
    for (const field of node.invalidFields ?? []) err("invalid_field", `The field "${field}" of the node "${node.id}" has the wrong type.`, node.id);
    if (node.key === "") err("empty_key", `The node "${node.id}" has no result key.`, node.id);
    else if (seenKeys.has(node.key)) {
      // Les clés ne sont pas uniques par conception (dernier écrivain gagnant) : avertissement seulement.
      warn("duplicate_key", `The result key "${node.key}" is used by several nodes.`, node.id);
    } else seenKeys.add(node.key);
  }

  // Liens de flux : nœuds connus, pins permis, pas de lien vers soi.
  for (const link of graph.links) {
    const { node: from, pin } = link.from;
    const fromOk = from === GRAPH_START_ID || exists(from);
    if (!fromOk) err("unknown_node", `A link starts at an unknown node "${from}".`, from);
    if (!exists(link.to)) err("unknown_node", `A link leads to an unknown node "${link.to}".`, link.to);
    if (from === link.to) err("self_link", `The node "${link.to}" is linked to itself.`, link.to);
    if (fromOk) {
      const allowed = from === GRAPH_START_ID ? pin === PINS.next : isAllowedPin(byId.get(from), pin);
      if (!allowed) err("invalid_pin", `The pin "${pin}" does not exist on ${from}.`, from);
    }
  }

  // Liens valides (source et cible connues), par nœud source et adjacence de flux.
  const linksBySource = new Map();
  const flow = new Map([[GRAPH_START_ID, []]]);
  for (const id of byId.keys()) flow.set(id, []);
  for (const link of graph.links) {
    if ((link.from.node === GRAPH_START_ID || exists(link.from.node)) && exists(link.to)) {
      if (!linksBySource.has(link.from.node)) linksBySource.set(link.from.node, []);
      linksBySource.get(link.from.node).push(link);
      flow.get(link.from.node).push(link.to);
    }
  }

  const reachFrom = (starts) => {
    const seen = new Set();
    const stack = [...starts];
    while (stack.length > 0) {
      const id = stack.pop();
      if (seen.has(id)) continue;
      seen.add(id);
      stack.push(...(flow.get(id) ?? []));
    }
    return seen;
  };
  const reach = (start) => reachFrom([start]);

  // Orphelins : non atteints depuis le départ (avertissement : ils ne s'exécutent jamais).
  const fromStart = reach(GRAPH_START_ID);
  for (const node of graph.nodes) {
    if (byId.has(node.id) && !fromStart.has(node.id)) warn("orphan", `The node "${node.id}" is not connected: it never runs.`, node.id);
  }
  if (graph.nodes.length > 0 && flow.get(GRAPH_START_ID).length === 0) warn("no_entry", "Nothing is linked to the start.");

  // Cycles de flux (la boucle revient implicitement : un cycle écrit est une erreur).
  const cycleNode = findCycle(flow);
  if (cycleNode !== null) err("flow_cycle", `The flow loops back on "${cycleNode}": use a loop node.`, cycleNode);

  // Régions fermées et nœuds de contrôle.
  for (const node of byId.values()) {
    const out = linksBySource.get(node.id) ?? [];
    const linked = (pin) => out.some((l) => l.from.pin === pin);

    if (LOOP_TYPES.has(node.type)) {
      if (!linked(PINS.body)) warn("empty_body", `The loop "${node.id}" has an empty body.`, node.id);
    } else if (node.type === TRY_CATCH_TYPE) {
      if (!linked(PINS.try) || !linked(PINS.catch)) warn("empty_try", `The try/catch "${node.id}" needs both a try and a catch branch.`, node.id);
    } else if (node.type === SWITCH_TYPE) {
      const value = node.payload.value;
      if (value === undefined || value === null || (typeof value === "string" && value.trim() === "")) {
        warn("missing_switch_value", `The switch "${node.id}" has no value to compare.`, node.id);
      }
    }

    if (!REGION_OWNER_TYPES.has(node.type)) continue;
    const regionPins = node.type === TRY_CATCH_TYPE ? [PINS.try, PINS.catch] : [PINS.body];
    for (const pin of regionPins) {
      const entries = out.filter((l) => l.from.pin === pin).map((l) => l.to);
      if (entries.length === 0) continue;
      const region = reachFrom(entries);
      // Sortie : la région atteint le propriétaire ou ce que ses autres pins (suite, autre région) atteignent.
      const others = reachFrom(out.filter((l) => l.from.pin !== pin).map((l) => l.to));
      let leaks = region.has(node.id) || [...region].some((id) => others.has(id));
      // Entrée : un lien vient de l'extérieur, hors du pin d'entrée du propriétaire.
      if (!leaks) {
        for (const l of graph.links) {
          if (!region.has(l.to) || !exists(l.to)) continue;
          // Un lien dont la source n'est pas atteignable depuis le départ est mort : il ne ferme pas la région.
          if (l.from.node !== GRAPH_START_ID && !fromStart.has(l.from.node)) continue;
          const fromOwnerPin = l.from.node === node.id && l.from.pin === pin;
          if (!fromOwnerPin && !region.has(l.from.node)) {
            leaks = true;
            break;
          }
        }
      }
      if (leaks) err("region_leak", `The region "${pin}" of "${node.id}" is linked to nodes outside of it.`, node.id);
    }
  }

  // Liens de données.
  const dataEdges = new Map();
  for (const d of graph.data) {
    for (const field of d.invalidFields ?? []) err("invalid_field", `The field "${field}" of a data link to "${d.to.node}" has the wrong type.`, d.to.node);
    if (!DATA_TYPES.has(d.type)) err("unknown_data_type", `Unknown data type "${d.type}".`, d.to.node);
    const fromOk = exists(d.from.node);
    const toOk = exists(d.to.node);
    if (!fromOk || !toOk) {
      err("unknown_node", "A data link uses an unknown node.", fromOk ? d.to.node : d.from.node);
      continue;
    }
    if (d.from.node === d.to.node) {
      err("data_self_link", `The node "${d.to.node}" feeds itself.`, d.to.node);
      continue;
    }
    if (!dataEdges.has(d.from.node)) dataEdges.set(d.from.node, []);
    dataEdges.get(d.from.node).push(d.to.node);
    // Le producteur doit s'exécuter avant le consommateur : il faut un chemin de flux de l'un à l'autre.
    if (!reach(d.from.node).has(d.to.node)) {
      err("data_order", `The node "${d.from.node}" does not run before "${d.to.node}", which reads its output.`, d.to.node);
    }
  }
  const dataCycleNode = findCycle(dataEdges);
  if (dataCycleNode !== null) err("data_cycle", `The data links loop back on "${dataCycleNode}".`, dataCycleNode);

  // Réponses concurrentes : un pin à plusieurs liens lance des branches parallèles ; pins distincts = exclusifs.
  for (const source of [GRAPH_START_ID, ...byId.keys()]) {
    const byPin = new Map();
    for (const link of linksBySource.get(source) ?? []) {
      if (!byPin.has(link.from.pin)) byPin.set(link.from.pin, []);
      byPin.get(link.from.pin).push(link.to);
    }
    for (const [pin, targets] of byPin) {
      if (targets.length < 2) continue;
      const reaches = targets.map(reach);
      const shared = new Set();
      for (let i = 0; i < reaches.length; i++) {
        for (let j = i + 1; j < reaches.length; j++) for (const id of reaches[i]) if (reaches[j].has(id)) shared.add(id);
      }
      let branchesThatRespond = 0;
      for (const r of reaches) {
        if ([...r].some((id) => !shared.has(id) && responds(byId.get(id)))) branchesThatRespond++;
      }
      if (branchesThatRespond >= 2) {
        err(
          "concurrent_response",
          `Parallel branches of ${source}.${pin} each answer the interaction: Discord accepts one initial response.`,
          source === GRAPH_START_ID ? undefined : source,
        );
      }
    }
  }

  return done();
}

function allowedPins(node) {
  if (LOOP_TYPES.has(node.type)) return new Set([PINS.body, PINS.done, PINS.error]);
  switch (node.type) {
    case IF_TYPE: {
      const conditions = node.payload.elseIfConditions;
      const count = Array.isArray(conditions) ? conditions.length : 0;
      return new Set([PINS.then, ...Array.from({ length: count }, (_, j) => elseIfPin(j)), PINS.else, PINS.error]);
    }
    case BREAK_LOOP_TYPE:
    case CONTINUE_LOOP_TYPE:
      // Sortent de la boucle : aucune suite.
      return new Set([PINS.error]);
    case TRY_CATCH_TYPE:
      return new Set([PINS.try, PINS.catch, PINS.done, PINS.error]);
    case SWITCH_TYPE:
      // `case:<valeur>` : un pin par valeur, vérifié à part (voir `isAllowedPin`).
      return new Set([PINS.default, PINS.error]);
    default:
      return new Set([PINS.next, PINS.error]);
  }
}

const isAllowedPin = (node, pin) => allowedPins(node).has(pin) || (node.type === SWITCH_TYPE && isCasePin(pin));

/** Un nœud qui répond à l'interaction sur sa branche (réponse initiale, modal, `defer`). */
const responds = (node) => node.enabled && INITIAL_RESPONSE_TYPES.has(node.type);

/** Un nœud qui appartient à un cycle de [edges] (Map id -> ids), ou `null` (parcours itératif). */
function findCycle(edges) {
  const IN_PROGRESS = 1;
  const DONE = 2;
  const state = new Map();
  for (const root of edges.keys()) {
    if (state.has(root)) continue;
    state.set(root, IN_PROGRESS);
    const path = [root];
    const cursor = [0];
    while (path.length > 0) {
      const id = path[path.length - 1];
      const next = edges.get(id) ?? [];
      const at = cursor[cursor.length - 1];
      if (at >= next.length) {
        state.set(id, DONE);
        path.pop();
        cursor.pop();
        continue;
      }
      cursor[cursor.length - 1] = at + 1;
      const target = next[at];
      const s = state.get(target);
      if (s === IN_PROGRESS) return target;
      if (s === undefined) {
        state.set(target, IN_PROGRESS);
        path.push(target);
        cursor.push(0);
      }
    }
  }
  return null;
}
