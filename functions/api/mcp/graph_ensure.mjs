// `ensureGraph` : toute commande ou tout workflow qui entre dans le système en sort en mode `graph`
// (contrat §3, règle 7). Port JS de `packages/shared/lib/graph/ensure_graph.dart` : fonction pure,
// l'entrée n'est jamais modifiée. Une entité déjà en graphe (ou en `bdfd_script` / `javascript`) est
// rendue telle quelle (même instance, `converted: false`). Le corpus `ensure_graph_corpus.json`
// impose la même sortie que le code Dart.

import { convertActionsToGraph } from "./graph_convert.mjs";
import { migrateCommandDataResponse } from "./graph_command_migration.mjs";
import { isPlainObject, GraphFormatError } from "./graph_model.mjs";
import { GRAPH_MAX_NODES, GRAPH_MAX_JSON_BYTES } from "./graph_validate.mjs";

const BDFD_SCRIPT_KEYS = ["bdfdScriptContent", "scriptContent", "bdfdScript"];
const JS_SCRIPT_KEYS = ["jsScriptContent", "script"];

/** Anciennes références à un workflow nommé, portées par un bouton, un menu ou un modal. */
const LEGACY_WORKFLOW_KEYS = {
  workflowName: "workflowEntryPoint",
  onClickWorkflow: "onClickEntryPoint",
  onSelectWorkflow: "onSelectEntryPoint",
  onSubmitWorkflow: "onSubmitEntryPoint",
};
const LEGACY_ARGUMENT_KEYS = ["workflowArguments", "onSubmitArguments"];

const text = (v) => (v === undefined || v === null ? "" : typeof v === "object" ? JSON.stringify(v) : String(v));
const mode = (level) => text(level.executionMode).trim().toLowerCase();
const hasText = (level, keys) => keys.some((k) => text(level[k]).trim() !== "");

/** La racine et `data` s'il existe (commande, ou workflow événementiel). */
const holders = (entity) => [entity, ...(isPlainObject(entity.data) ? [entity.data] : [])];

/** Niveaux à convertir dans [entity] (vide : rien à faire). Lit seulement. */
function pendingLevels(entity) {
  const hasData = isPlainObject(entity.data);
  const levels = [];
  for (const holder of holders(entity)) {
    const m = mode(holder);
    if (m === "bdfd_script" || m === "javascript") continue;
    const actions = holder.actions;
    const hasActions = Array.isArray(actions);
    const isRootOfCommand = hasData && holder === entity;
    let legacy;
    if (m === "graph") legacy = hasActions && actions.length > 0;
    else if (m === "workflow" && !isRootOfCommand) legacy = true;
    else if (m === "" || m === "workflow") {
      // Mode absent : liste d'actions, ou ancienne réponse (`response`) à migrer. Un script sans actions est un script.
      const scripted = hasText(holder, BDFD_SCRIPT_KEYS) || hasText(holder, JS_SCRIPT_KEYS);
      legacy = hasActions || (!isRootOfCommand && !scripted && isPlainObject(holder.response));
    } else legacy = true; // mode inconnu (`blueprint`…) : l'ancien moteur le lisait comme un workflow
    if (legacy) levels.push({ map: holder, isHolder: true });

    if (isPlainObject(holder.workflow) && Array.isArray(holder.workflow.actions)) levels.push({ map: holder.workflow, isHolder: false });
    if (isPlainObject(holder.subcommandWorkflows)) {
      for (const route of Object.values(holder.subcommandWorkflows)) {
        if (isPlainObject(route) && Array.isArray(route.actions) && mode(route) !== "bdfd_script" && mode(route) !== "javascript") {
          levels.push({ map: route, isHolder: false });
        }
      }
    }
  }
  return levels;
}

/** Vrai si [entity] demande une conversion (test peu coûteux, sans copie). */
export function entityNeedsGraphConversion(entity) {
  return pendingLevels(entity).length > 0 || hasComponentActions(entity);
}

/** Convertit [entity] (ancien format ou non) en graphe. Rend `{ entity, converted, warnings }`. */
export function ensureGraph(entity) {
  if (!entityNeedsGraphConversion(entity)) return { entity, converted: false, warnings: [] };
  const name = entityName(entity);
  const out = JSON.parse(JSON.stringify(entity));
  const warnings = [];
  try {
    convertEntity(out, name, warnings);
  } catch (e) {
    if (e instanceof GraphTooLargeError) {
      // Le graphe converti dépasse les limites : l'entité est rendue INCHANGÉE, avec un avertissement.
      return { entity, converted: false, warnings: [{ code: "graph_too_large", message: `${name} : graphe converti trop gros, ancien format conservé (${e.message})`, key: "" }] };
    }
    if (!(e instanceof GraphFormatError)) throw e;
    // Une action sans `type` : l'entité est rendue INCHANGÉE (l'ancien format reste lisible, rien n'est perdu).
    return {
      entity,
      converted: false,
      warnings: [{ code: "conversion_failed", message: `${name} : conversion impossible, ancien format conservé (${e.message})`, key: "" }],
    };
  }
  return { entity: out, converted: true, warnings };
}

class GraphTooLargeError extends Error {}

/** Refuse (GraphTooLargeError) un graphe converti qui dépasse GRAPH_MAX_NODES nœuds ou GRAPH_MAX_JSON_BYTES octets. */
function checkLimits(graph) {
  if (graph.nodes.length > GRAPH_MAX_NODES) throw new GraphTooLargeError(`${graph.nodes.length} nœuds, maximum ${GRAPH_MAX_NODES}`);
  const bytes = new TextEncoder().encode(JSON.stringify(graph)).length;
  if (bytes > GRAPH_MAX_JSON_BYTES) throw new GraphTooLargeError(`${bytes} octets de JSON, maximum ${GRAPH_MAX_JSON_BYTES}`);
}

function entityName(entity) {
  const raw = entity.name ?? (isPlainObject(entity.data) ? entity.data.name : null);
  const name = text(raw).trim();
  return name === "" ? "(sans nom)" : name;
}

function convertEntity(out, name, warnings) {
  const add = (code, message, key) => warnings.push({ code, message: `${name} : ${message}`, key });
  const addAll = (site, from) => {
    for (const w of from) add(w.code, w.message, site === "" ? w.key : `${site}#${w.key}`);
  };

  // Anciennes réponses (`response`) -> actions, AVANT la conversion (ancien -> actions -> graphe).
  for (const level of pendingLevels(out).filter((l) => l.isHolder)) {
    if (mode(level.map) !== "graph" && isPlainObject(level.map.response)) migrateCommandDataResponse(level.map);
  }

  for (const level of pendingLevels(out)) {
    const map = level.map;
    const site = siteOf(out, map);
    let actions = Array.isArray(map.actions) ? [...map.actions] : [];
    if (mode(map) === "graph" && map.graph !== undefined && map.graph !== null) {
      add("legacy_actions_overwrite", "des actions et un graphe coexistent : les actions (écrites par une ancienne version) l'emportent", site);
    }
    if (level.isHolder && actions.length === 0) {
      const named = namedWorkflow(map);
      if (named !== null) {
        actions = [{ type: "runWorkflow", payload: { workflowName: named } }];
        add("named_workflow_fallback", `workflow nommé « ${named} » converti en nœud runWorkflow`, site);
      }
    }
    const conversion = convertActionsToGraph(actions);
    checkLimits(conversion.graph);
    addAll(site, conversion.warnings);
    map.graph = conversion.graph;
    delete map.actions;
    delete map.editorMode;
    if (level.isHolder || mode(map) === "workflow") map.executionMode = "graph";
  }
  // Le miroir `executionMode` de la racine d'une commande suit celui de `data`.
  for (const holder of holders(out)) {
    delete holder.editorMode;
    if (mode(holder) === "workflow") holder.executionMode = "graph";
  }

  convertComponents(out, add, addAll);
}

/** Lieu lisible d'un niveau pour les avertissements (`""` pour la racine ou `data`). */
function siteOf(out, level) {
  for (const holder of holders(out)) {
    if (isPlainObject(holder.subcommandWorkflows)) {
      for (const [route, value] of Object.entries(holder.subcommandWorkflows)) if (value === level) return `subcommandWorkflows[${route}]`;
    }
    if (holder.workflow === level) return "workflow";
  }
  return "";
}

/** Ancien repli : `response.workflow.name` quand la liste d'actions est vide. */
function namedWorkflow(holder) {
  const workflow = isPlainObject(holder.response) ? holder.response.workflow : null;
  const name = isPlainObject(workflow) && workflow.name !== undefined && workflow.name !== null ? text(workflow.name).trim() : "";
  return name === "" ? null : name;
}

// --- Composants V2, modals, écouteurs en ligne ---------------------------------------------

/**
 * Un composant qui porte un gestionnaire en ligne : un objet avec `customId` et soit une liste
 * `actions`, soit une ancienne référence de workflow (comme `ButtonNode.fromJson`).
 */
function isHandlerHolder(m) {
  if (typeof m.customId !== "string") return false;
  const hasGraph = m.graph !== undefined && m.graph !== null;
  // Comme au niveau racine, des actions NON VIDES l'emportent sur un graphe déjà présent (ancienne app
  // qui a écrit par-dessus) ; une liste vide à côté d'un graphe n'est pas un gestionnaire.
  if (Array.isArray(m.actions)) return !hasGraph || m.actions.length > 0;
  if (hasGraph) return false;
  return legacyWorkflowKey(m) !== null;
}

/** `workflowName` seul est aussi la charge utile d'actions (`runWorkflow`, écouteurs) : seuls les composants (qui ont un `type`) comptent. */
function legacyWorkflowKey(m) {
  for (const key of Object.keys(LEGACY_WORKFLOW_KEYS)) {
    if (text(m[key]).trim() === "") continue;
    if (key === "workflowName" && typeof m.type !== "string") continue;
    return key;
  }
  return null;
}

function hasComponentActions(value) {
  if (isPlainObject(value)) return isHandlerHolder(value) || Object.values(value).some(hasComponentActions);
  if (Array.isArray(value)) return value.some(hasComponentActions);
  return false;
}

function convertComponents(value, add, addAll) {
  if (isPlainObject(value)) {
    if (isHandlerHolder(value)) {
      const holderSite = `component:${value.customId}`;
      let actions;
      if (Array.isArray(value.actions)) actions = value.actions;
      else {
        const key = legacyWorkflowKey(value);
        const args = LEGACY_ARGUMENT_KEYS.map((k) => value[k]).find(isPlainObject) ?? {};
        actions = [{ type: "runWorkflow", payload: { workflowName: text(value[key]), entryPoint: text(value[LEGACY_WORKFLOW_KEYS[key]]), arguments: args } }];
      }
      // Les références héritées sont consommées dans tous les cas (comme `fromJson` : `actions` gagne).
      for (const [k, entry] of Object.entries(LEGACY_WORKFLOW_KEYS)) {
        delete value[k];
        delete value[entry];
      }
      for (const k of LEGACY_ARGUMENT_KEYS) delete value[k];
      delete value.actions;
      // Liste vide : pas de gestionnaire, donc pas de graphe (le moteur teste la présence de `graph`).
      if (actions.length > 0) {
        if (value.graph !== undefined && value.graph !== null) {
          add("legacy_actions_overwrite", "des actions et un graphe coexistent sur le composant : les actions (écrites par une ancienne version) l'emportent", holderSite);
        }
        const conversion = convertActionsToGraph(actions);
        checkLimits(conversion.graph);
        addAll(holderSite, conversion.warnings);
        value.graph = conversion.graph;
      }
    }
    for (const v of Object.values(value)) convertComponents(v, add, addAll);
  } else if (Array.isArray(value)) {
    for (const v of value) convertComponents(v, add, addAll);
  }
}
