// Conversion TOTALE d'une ancienne liste d'actions en graphe (contrat §3, règles 1 à 6).
//
// Port JS de `packages/shared/lib/graph/graph_conversion.dart`. Fonction pure : elle ne modifie pas
// l'entrée et ne lève (GraphFormatError) que sur une action sans `type`. Les dégradations sémantiques
// que le graphe ne peut pas reproduire sont rendues en avertissements `{ code, message, key }`.
// Les corpus `graph_conversion_corpus.json` et `ensure_graph_corpus.json` imposent la même sortie
// que le code Dart.
//
// Deux passes : la première crée les nœuds (`n1`, `n2`… dans l'ordre d'un parcours en profondeur), la
// seconde émet les liens et les avertissements dans le même ordre.

import {
  GRAPH_START_ID,
  GRAPH_FORMAT_VERSION,
  IF_TYPE,
  FOR_LOOP_TYPE,
  JSON_FOR_EACH_TYPE,
  TRY_CATCH_TYPE,
  SWITCH_TYPE,
  PINS,
  elseIfPin,
  caseOfPin,
  isPlainObject,
  GraphFormatError,
} from "./graph_model.mjs";

/** Types dont `payload.actions` est la liste EN LIGNE d'un gestionnaire : elle devient `payload.graph`. */
export const INLINE_HANDLER_TYPES = new Set([
  "listenForButtonClick",
  "listenForSelectMenu",
  "listenForModalSubmit",
  "listenAndExecute",
  "respondWithModal",
]);

const JUMP_TYPE = "jumpToAction";
const SKIP_TYPE = "skipActions";
const JUMP_PREFIX = "JUMP_TO_";
const SKIP_PREFIX = "SKIPPED_";
const ITER_REFERENCE = /action\.[^()]*?\.iter\d+/;

// Espaces ignorés autour du nombre par `int.tryParse` (VM Dart) : \s de JS moins U+180E, plus U+0085 (pas dans \s).
const DART_SPACE = /^[\t-\r \u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+|[\t-\r \u0085\u00a0\u1680\u2000-\u200a\u2028\u2029\u202f\u205f\u3000\ufeff]+$/g;

/**
 * Équivalent de `int.tryParse` de Dart (entier 64 bits) : espaces autour ignorés, signe `+`/`-`, décimal ou
 * hexadécimal `0x`. Rend un BigInt ou `null`. Un hexadécimal positif tient sur 64 bits et se replie comme en Dart
 * (`0xFFFFFFFFFFFFFFFF` = -1). Pas de `_`, pas d'espace entre le signe et les chiffres.
 */
export function dartIntParse(text) {
  const m = String(text).replace(DART_SPACE, "").match(/^([+-]?)(?:(0[xX])([0-9a-fA-F]+)|([0-9]+))$/);
  if (m === null) return null;
  const negative = m[1] === "-";
  const magnitude = BigInt(m[2] ? `0x${m[3]}` : m[4]);
  if (negative) return magnitude > 1n << 63n ? null : -magnitude;
  if (magnitude >= 1n << 64n) return null;
  if (m[2]) return BigInt.asIntN(64, magnitude);
  return magnitude >= 1n << 63n ? null : magnitude;
}

const dartString = (v) => (v !== null && typeof v === "object" ? JSON.stringify(v) : String(v));

/**
 * Convertit [actions] (JSON des anciennes actions) en `{ graph, warnings }`.
 * [keyPrefix] est ajouté tel quel devant les clés des actions de la racine.
 */
export function convertActionsToGraph(actions, { keyPrefix = "" } = {}) {
  return new Converter().run(actions, keyPrefix);
}

/** Copie profonde des seuls éléments objets (l'entrée n'est jamais modifiée). */
const objectsOf = (raw) => (Array.isArray(raw) ? raw.filter(isPlainObject).map((o) => JSON.parse(JSON.stringify(o))) : []);

const isComputed = (value) => value.includes("((");

const truthyFlag = (value) => ["true", "1", "yes", "on"].includes((value === undefined || value === null ? "" : String(value)).trim().toLowerCase());

/** Première référence `action.<…>.iter<N>` dans les chaînes de [value] (récursif), ou null. */
function firstIterReference(value, root = true) {
  if (typeof value === "string") return value.match(ITER_REFERENCE)?.[0] ?? null;
  if (Array.isArray(value)) {
    for (const element of value) {
      const found = firstIterReference(element, false);
      if (found !== null) return found;
    }
  } else if (isPlainObject(value)) {
    for (const [k, v] of Object.entries(value)) {
      if (root && k === "graph") continue; // le sous-graphe a ses propres avertissements
      const found = firstIterReference(v, false);
      if (found !== null) return found;
    }
  }
  return null;
}

class Item {
  constructor(node, legacyType, rawKey, actionId) {
    this.node = node;
    this.legacyType = legacyType;
    this.rawKey = rawKey; // clé d'origine (null si absente ou vide) et `_actionId` : les noms par lesquels on saute ici
    this.actionId = actionId;
    this.branches = [];
    this.subWarnings = [];
    this.errorSkip = 0; // mode d'erreur `skip` (N > 0) ou `jump` (cible) à convertir en lien `error`
    this.errorJump = null;
  }
  get id() {
    return this.node.id;
  }
  get key() {
    return this.node.key;
  }
  get isIf() {
    return this.node.type === IF_TYPE;
  }
  get isBlock() {
    return this.branches.length > 0;
  }
}

/** [protectedBranch] : enfants protégés (`tryCatch`, `suppressErrors`) : aucun mode d'erreur ne s'y applique. */
const newBranch = (pin, items, region, protectedBranch = false) => ({ pin, items, region, wrapper: null, protected: protectedBranch });

/** Plafond de liens `case:` des sauts calculés d'une conversion (un lien ≈ 60 octets de JSON). */
const MAX_JUMP_TABLE_LINKS = 4000;

class Converter {
  constructor() {
    this.counter = 0;
    this.nodes = [];
    this.links = [];
    this.warnings = [];
    this.jumpTableLinks = 0;
  }

  run(actions, keyPrefix) {
    const items = this.build(objectsOf(actions), keyPrefix, false);
    if (items.length > 0) this.link(GRAPH_START_ID, PINS.next, items[0].id);
    this.emitList(items, null);
    return { graph: this.toGraph(), warnings: this.warnings };
  }

  toGraph() {
    return {
      version: GRAPH_FORMAT_VERSION,
      nodes: this.nodes.map((n) => {
        const out = { id: n.id, type: n.type, key: n.key, enabled: n.enabled, payload: n.payload };
        if (Object.keys(n.error).length > 0) out.error = n.error;
        return out;
      }),
      links: this.links,
      data: [],
    };
  }

  // ─── Passe 1 : nœuds ────────────────────────────────────────────────────

  build(raws, prefix, protectedList) {
    return raws.map((raw, i) => this.makeItem(raw, i, prefix, protectedList));
  }

  makeItem(raw, index, prefix, isProtected) {
    const legacyType = raw.type;
    if (typeof legacyType !== "string" || legacyType === "") {
      throw new GraphFormatError(`Action sans type : ${prefix}${raw.key ?? `action_${index}`}.`);
    }
    const rawKey = typeof raw.key === "string" && raw.key !== "" ? raw.key : null;
    const key = `${prefix}${rawKey ?? `action_${index}`}`;
    let payload = isPlainObject(raw.payload) ? { ...raw.payload } : {};
    const actionId = payload._actionId === undefined || payload._actionId === null ? null : dartString(payload._actionId);

    const take = (from, name) => {
      const value = from[name];
      delete from[name];
      return objectsOf(value);
    };

    let type = legacyType;
    const isIf = legacyType === IF_TYPE;
    const isTryCatch = isIf && payload.tryCatch === true;
    const suppress = isIf && !isTryCatch && truthyFlag(payload.suppressErrors);
    if (isIf) {
      delete payload.tryCatch;
      delete payload.suppressErrors;
    }
    if (isTryCatch) type = TRY_CATCH_TYPE;

    // Les sous-listes sont détachées AVANT la création du nœud, mais construites APRÈS (ordre des ids).
    const thenRaw = isIf ? take(payload, "thenActions") : null;
    const elseRaw = isIf ? take(payload, "elseActions") : null;
    const elseIfRaws = [];
    let droppedElseIf = false;
    if (isIf) {
      const conditions = payload.elseIfConditions;
      if (isTryCatch) {
        droppedElseIf = Array.isArray(conditions) && conditions.length > 0;
        delete payload.elseIfConditions;
      } else if (Array.isArray(conditions)) {
        for (const entry of conditions) elseIfRaws.push(isPlainObject(entry) ? take(entry, "actions") : []);
      }
    }
    const bodyRaw = legacyType === FOR_LOOP_TYPE || legacyType === JSON_FOR_EACH_TYPE ? take(payload, "bodyActions") : null;

    // Navigation : toujours un `switch` (contrat §3 règle 4).
    if (legacyType === JUMP_TYPE || legacyType === SKIP_TYPE) {
      const isJump = legacyType === JUMP_TYPE;
      const field = isJump ? "targetKey" : "count";
      const taken = payload[field];
      delete payload[field];
      const value = taken === undefined || taken === null ? (isJump ? "" : "0") : dartString(taken);
      delete payload.value;
      delete payload.mode;
      delete payload.resultPrefix;
      payload = { value, mode: isJump ? "text" : "int", resultPrefix: isJump ? JUMP_PREFIX : SKIP_PREFIX, ...payload };
      type = SWITCH_TYPE;
    }

    // Écouteurs et modals : la liste en ligne devient un sous-graphe.
    let subWarnings = [];
    // Les actions (plus récentes) l'emportent sur un graphe déjà présent ; une liste vide n'est PAS un
    // gestionnaire : pas de `graph` (le moteur teste sa présence, et `workflowName` doit alors s'exécuter).
    if (INLINE_HANDLER_TYPES.has(legacyType) && Array.isArray(payload.actions)) {
      const inline = payload.actions;
      delete payload.actions;
      if (inline.length > 0) {
        const sub = convertActionsToGraph(inline);
        if ("graph" in payload) {
          subWarnings = [
            {
              code: "legacy_actions_overwrite",
              message: "Des actions et un graphe coexistent sur ce gestionnaire : les actions (écrites par une ancienne version) l'emportent.",
              key,
            },
          ];
        }
        payload.graph = sub.graph;
        subWarnings = [...subWarnings, ...sub.warnings.map((w) => ({ code: w.code, message: w.message, key: `${key}#${w.key}` }))];
      }
    }

    const enabled = typeof raw.enabled === "boolean" ? raw.enabled : true;
    const errorMap = isPlainObject(raw.error) ? raw.error : {};
    const error = {};
    let errorSkip = 0;
    let errorJump = null;
    if (!isProtected) {
      switch (dartString(errorMap.mode)) {
        case "continue":
          error.mode = "continue";
          break;
        case "skip":
          errorSkip = Number(dartIntParse(errorMap.skipCount === undefined || errorMap.skipCount === null ? "" : dartString(errorMap.skipCount)) ?? 0n);
          if (errorSkip <= 0) {
            errorSkip = 0;
            error.mode = "continue";
          }
          break;
        case "jump":
          errorJump = errorMap.jumpToActionId === undefined || errorMap.jumpToActionId === null ? "" : dartString(errorMap.jumpToActionId);
          break;
      }
    }

    const node = { id: `n${++this.counter}`, type, key, enabled, payload, error };
    this.nodes.push(node);
    const item = new Item(node, legacyType, rawKey, actionId);
    item.subWarnings = subWarnings;
    item.errorSkip = errorSkip;
    item.errorJump = errorJump;
    if (droppedElseIf) {
      item.subWarnings = [
        ...subWarnings,
        {
          code: "try_catch_elseif_ignored",
          message: "Les conditions « sinon si » d'un bloc essayer/attraper n'ont jamais été exécutées : elles sont retirées.",
          key,
        },
      ];
    }

    const childPrefix = `${key}.`;
    const branch = (pin, raws, { region, wrap = false, childProtected = false }) => {
      // L'enveloppe d'un `suppressErrors` reçoit son id avant les actions de la branche (ordre des ids).
      const wrapper = wrap && raws.length > 0 ? this.makeWrapper(key, pin, payload) : null;
      const b = newBranch(pin, this.build(raws, childPrefix, childProtected), region, childProtected);
      b.wrapper = wrapper;
      item.branches.push(b);
    };

    if (isTryCatch) {
      branch(PINS.try, thenRaw, { region: true, childProtected: true });
      branch(PINS.catch, elseRaw, { region: true, childProtected: true });
    } else if (isIf) {
      const inner = isProtected || suppress;
      branch(PINS.then, thenRaw, { region: false, wrap: suppress, childProtected: inner });
      elseIfRaws.forEach((raws, j) => branch(elseIfPin(j), raws, { region: false, wrap: suppress, childProtected: inner }));
      branch(PINS.else, elseRaw, { region: false, wrap: suppress, childProtected: inner });
    } else if (bodyRaw !== null) {
      branch(PINS.body, bodyRaw, { region: true, childProtected: isProtected });
    }
    return item;
  }

  makeWrapper(ifKey, pin, ifPayload) {
    const payload = {};
    for (const name of ["suppressErrorsMessage", "suppressErrorsEmbed"]) if (name in ifPayload) payload[name] = ifPayload[name];
    const node = { id: `n${++this.counter}`, type: TRY_CATCH_TYPE, key: `${ifKey}.suppress_${pin.replaceAll(":", "_")}`, enabled: true, payload, error: {} };
    this.nodes.push(node);
    return new Item(node, TRY_CATCH_TYPE, null, null);
  }

  // ─── Passe 2 : liens et avertissements ──────────────────────────────────

  link(from, pin, to) {
    if (to === null || to === undefined) return;
    this.links.push({ from: { node: from, pin }, to });
  }

  warn(code, key, message) {
    this.warnings.push({ code, message, key });
  }

  /**
   * [cont] : le nœud qui suit la liste (celui de la liste englobante), ou null. [handler] : où mène l'échec
   * non rattrapé d'un enfant, quand le mode d'erreur d'un `ifBlock` englobant doit le rattraper (`{ target }`).
   */
  emitList(items, cont, handler = null) {
    for (let i = 0; i < items.length; i++) this.emitItem(items, i, cont, handler);
  }

  emitItem(items, i, cont, handler) {
    const item = items[i];
    const next = i + 1 < items.length ? items[i + 1].id : cont;
    const node = item.node;

    const reference = firstIterReference(node.payload);
    if (reference !== null) {
      this.warn(
        "iter_reference",
        item.key,
        `La référence « ${reference} » vise une itération : il n'y a plus de clés d'itération, le dernier tour écrase les résultats.`,
      );
    }
    this.warnings.push(...item.subWarnings);

    if (item.legacyType === JUMP_TYPE) this.emitJump(items, i, cont);
    else if (item.legacyType === SKIP_TYPE) this.emitSkip(items, i, cont);
    else if (item.isBlock) this.emitBlock(item, next);
    else this.link(item.id, PINS.next, next);
    if (node.enabled) this.emitErrorLink(items, i, cont, handler);

    // Le mode d'erreur d'un `ifBlock` rattrape l'échec de ses descendants libres (ancien moteur).
    const own = item.isIf && node.enabled ? this.handlerOf(items, i, cont) : null;
    for (const branch of item.branches) {
      const wrapper = branch.wrapper;
      if (wrapper !== null) {
        this.link(wrapper.id, PINS.try, branch.items[0].id);
        this.link(wrapper.id, PINS.done, next);
      }
      const free = !branch.region && wrapper === null && !branch.protected;
      this.emitList(branch.items, branch.region || wrapper !== null ? null : next, free ? (own ?? handler) : null);
    }
  }

  /**
   * Le rattrapage que pose le mode d'erreur (`continue`, `skip`, `jump`) de l'`ifBlock` [i], ou null
   * (mode `stop`, ou cible de saut introuvable : l'erreur continue de remonter).
   */
  handlerOf(items, i, cont) {
    const item = items[i];
    if (item.errorSkip > 0) return { target: this.afterSkipping(items, i, item.errorSkip, cont) };
    const jump = item.errorJump;
    if (jump !== null) {
      const target = jump === "" ? undefined : this.names(items).get(jump);
      return target !== undefined && target > i ? { target: items[target].id } : null;
    }
    if (item.node.error.mode === "continue") return { target: i + 1 < items.length ? items[i + 1].id : cont };
    return null;
  }

  /**
   * Un nœud sans action qui termine silencieusement la région où il est lié : cible d'un lien `error`
   * qui doit « sortir par la fin » de la liste. Désactivé (aucun résultat, aucune trame).
   */
  endNode(ownerKey) {
    const node = { id: `n${++this.counter}`, type: "log", key: `${ownerKey}.end`, enabled: false, payload: {}, error: {} };
    this.nodes.push(node);
    return node.id;
  }

  emitBlock(item, next) {
    if (!item.node.enabled) {
      // Bloc désactivé : le flux passe sans entrer dans les branches (elles restent des orphelins).
      // Le runner garde vivants `else` (ifBlock) et `done` (boucles) d'un nœud désactivé.
      this.link(item.id, item.isIf ? PINS.else : PINS.done, next);
      return;
    }
    for (const branch of item.branches) {
      let target;
      if (branch.items.length === 0) target = branch.region ? null : next;
      else target = branch.wrapper ? branch.wrapper.id : branch.items[0].id;
      this.link(item.id, branch.pin, target);
    }
    if (!item.isIf) this.link(item.id, PINS.done, next);
  }

  /** L'identifiant de l'action `i + 1 + skipped` de [items], ou [cont] au-delà de la fin. */
  afterSkipping(items, i, skipped, cont) {
    const index = i + 1 + skipped;
    return index < items.length ? items[index].id : cont;
  }

  emitSkip(items, i, cont) {
    const item = items[i];
    const next = this.afterSkipping(items, i, 0, cont);
    if (!item.node.enabled) {
      this.link(item.id, PINS.default, next);
      return;
    }
    const value = dartString(item.node.payload.value);
    if (isComputed(value)) {
      const last = items.length - i - 1; // actions qui suivent
      // Une table `case:` par saut calculé est quadratique : même plafond que le saut calculé (jumpToAction).
      if (last >= 1 && this.jumpTableLinks + last > MAX_JUMP_TABLE_LINKS) {
        this.link(item.id, PINS.default, next);
        this.warn(
          "computed_jump_table_truncated",
          item.key,
          "La table des nombres de ce saut d'actions calculé est trop grosse pour le graphe (trop de sauts calculés dans la liste) : aucune action n'est sautée.",
        );
        return;
      }
      if (last >= 1) this.jumpTableLinks += last;
      this.link(item.id, caseOfPin("0"), next);
      for (let k = 1; k < last; k++) this.link(item.id, caseOfPin(`${k}`), this.afterSkipping(items, i, k, cont));
      if (last < 1) {
        this.link(item.id, PINS.default, next);
        return;
      }
      // Un nombre calculé peut dépasser la fin : un garde (`ifBlock`) sur `default` envoie un entier
      // >= au nombre d'actions restantes à la continuation (fin de la région si elle n'en a pas),
      // tout autre texte (négatif, non entier) passe à l'action suivante, comme l'ancien moteur.
      const guard = {
        id: `n${++this.counter}`,
        type: IF_TYPE,
        key: `${item.key}.overflow`,
        enabled: true,
        payload: {
          "condition.group": "and",
          "condition.conditions": [
            { variable: value, operator: "matches", value: "^\\s*\\+?\\d+\\s*$" },
            { variable: value, operator: "greaterOrEqual", value: `${last}` },
          ],
        },
        error: {},
      };
      this.nodes.push(guard);
      this.link(item.id, PINS.default, guard.id);
      this.link(guard.id, PINS.then, cont ?? this.endNode(item.key));
      this.link(guard.id, PINS.else, next);
      return;
    }
    const count = dartIntParse(value);
    if (count !== null && count > 0n) {
      this.link(item.id, caseOfPin(`${count}`), this.afterSkipping(items, i, Number(count), cont));
      return;
    }
    if (count === null && value.trim() !== "") {
      this.warn("invalid_skip_count", item.key, `Le nombre d'actions à sauter « ${value} » n'est pas un entier : aucune action n'est sautée.`);
    }
    this.link(item.id, PINS.default, next);
  }

  /** Les noms par lesquels on saute à une action de [items] : clé puis `_actionId`, la première gagne. */
  names(items) {
    const names = new Map();
    items.forEach((it, j) => {
      for (const name of [it.rawKey, it.actionId]) if (name !== null && name !== "" && !names.has(name)) names.set(name, j);
    });
    return names;
  }

  /**
   * Où mène la cible [target] d'un `jumpToAction` placé à l'indice [own] : l'indice de l'action, ou
   * null si l'ancien moteur ne saute pas. [backwardPosition] : position numérique qui revient en arrière.
   */
  resolveJump(items, names, own, target, backwardPosition) {
    if (target === "") return null;
    const named = names.get(target);
    if (named !== undefined) return named > own ? named : null;
    const position = dartIntParse(target);
    if (position !== null && position >= 1n && position <= BigInt(items.length)) {
      if (Number(position) - 1 > own) return Number(position) - 1;
      backwardPosition();
    }
    return null;
  }

  emitJump(items, i, cont) {
    const item = items[i];
    const next = i + 1 < items.length ? items[i + 1].id : cont;
    if (!item.node.enabled) {
      this.link(item.id, PINS.default, next);
      return;
    }
    const value = dartString(item.node.payload.value);
    const names = this.names(items);

    if (isComputed(value)) {
      // Table complète : clé, `_actionId`, puis position de chaque action située APRÈS le saut.
      const table = [];
      const seen = new Set();
      for (let j = i + 1; j < items.length; j++) {
        for (const name of [items[j].rawKey, items[j].actionId, `${j + 1}`]) {
          if (name === null || name.trim() === "" || seen.has(name.trim())) continue;
          if (this.resolveJump(items, names, i, name, () => {}) === j) {
            seen.add(name.trim());
            table.push([name.trim(), items[j].id]);
          }
        }
      }
      // Une table par saut calculé est quadratique : au-delà du plafond (graphe qui ne tiendrait plus
      // dans `GRAPH_MAX_JSON_BYTES`), le saut n'a que sa suite normale, avec un avertissement.
      const truncated = this.jumpTableLinks + table.length > MAX_JUMP_TABLE_LINKS;
      if (!truncated) {
        this.jumpTableLinks += table.length;
        for (const [name, target] of table) this.link(item.id, caseOfPin(name), target);
      }
      this.link(item.id, PINS.default, next);
      this.warn(
        truncated ? "computed_jump_table_truncated" : "computed_jump",
        item.key,
        truncated
          ? "La table des cibles de ce saut calculé est trop grosse pour le graphe (trop de sauts calculés dans la liste) : le saut passe à l'action suivante."
          : "La cible du saut est calculée : un saut en arrière (redémarrage de l'ancien moteur) ne peut pas être détecté et ne sera pas suivi.",
      );
      return;
    }

    let backward = false;
    const target = this.resolveJump(items, names, i, value, () => {
      backward = true;
    });
    if (target !== null) {
      this.link(item.id, caseOfPin(value.trim()), items[target].id);
    } else if (backward) {
      this.warn(
        "backward_jump",
        item.key,
        `Saut en arrière vers la position ${value} : l'ancien moteur redémarrait la liste sans jamais continuer ensuite, le graphe n'a pas de cycle. Le nœud n'a aucune suite.`,
      );
    } else {
      if (value !== "") {
        this.warn("unresolved_jump", item.key, `La cible « ${value} » ne mène à aucune action située après le saut : aucun saut n'a lieu.`);
      }
      this.link(item.id, PINS.default, next);
    }
  }

  /**
   * Modes d'erreur `skip` / `jump` : un lien sur le pin `error`. À défaut, l'échec non rattrapé d'un
   * enfant libre d'un `ifBlock` en mode `continue` / `skip` / `jump` mène à son [handler].
   */
  emitErrorLink(items, i, cont, handler) {
    const item = items[i];
    let linked = false;
    if (item.errorSkip > 0) {
      const target = this.afterSkipping(items, i, item.errorSkip, cont);
      if (target !== null && target !== undefined) {
        this.link(item.id, PINS.error, target);
      } else if (i === items.length - 1) {
        // Dernière action d'une liste sans suite : « continuer » finit la liste de la même façon.
        item.node.error.mode = "continue";
      } else {
        // Au-delà de la fin de la région : la région se termine sans erreur (ancien `i += count`).
        this.link(item.id, PINS.error, this.endNode(item.key));
      }
      linked = true;
    }
    const jump = item.errorJump;
    if (jump !== null) {
      const target = jump === "" ? undefined : this.names(items).get(jump);
      if (target !== undefined && target > i) {
        this.link(item.id, PINS.error, items[target].id);
        linked = true;
      } else {
        this.warn(
          "unresolved_jump",
          item.key,
          `Le mode d'erreur « aller à » vise « ${jump} » qui n'est pas une action située après : l'erreur remonte, comme avant.`,
        );
      }
    }
    // Un `switch` (saut, skip) ne peut pas échouer : pas de lien d'erreur à poser.
    if (!linked && item.node.type !== SWITCH_TYPE && handler !== null && item.node.error.mode !== "continue") {
      this.link(item.id, PINS.error, handler.target ?? this.endNode(item.key));
    }
  }
}
