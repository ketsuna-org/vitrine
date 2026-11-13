// Migration des très anciennes réponses (`data.response`) vers des actions : port JS de
// `packages/shared/lib/utils/command_migration.dart` (partie « exécution », en mémoire). Elle
// s'applique EN AMONT de la conversion en graphe : ancien -> actions -> graphe (contrat §3, règle 7).
//
// Elle modifie l'objet reçu en place (l'appelant travaille sur une copie) et reste idempotente grâce
// au marqueur `_migrated`.

import { isPlainObject } from "./graph_model.mjs";

const RESPONSE_ACTION_TYPES = new Set(["respondWithMessage", "respondWithComponentV2", "respondWithModal", "reply"]);

/** Au-delà de ce nombre d'actions, un `deferInteraction` est ajouté pour tenir les 3 s de Discord. */
const DEFER_THRESHOLD = 2;

/** Actions qui font un appel réseau (Discord ou HTTP) : un defer est alors forcé. */
const HEAVY_ACTION_TYPES = new Set([
  "banUser", "unbanUser", "kickUser", "muteUser", "unmuteUser", "serverMuteMember", "serverDeafenMember",
  "sendMessage", "editMessage", "deleteMessages", "sendDm", "getMessage", "pinMessage", "unpinMessage",
  "createChannel", "updateChannel", "removeChannel", "createThread", "addThreadMember", "removeThreadMember",
  "addRole", "removeRole", "editChannelPermissions", "deleteChannelPermission",
  "sendWebhook", "editWebhook", "deleteWebhook",
  "updateGuild", "updateAutoMod", "createAutoModRule", "deleteAutoModRule", "registerGuildCommands", "unregisterGuildCommands", "updateGuildOnboarding",
  "createInvite", "deleteInvite", "moveToVoiceChannel", "disconnectFromVoice",
  "createEmoji", "updateEmoji", "deleteEmoji", "createPoll", "endPoll",
  "setNickname", "updateSelfUser", "leaveGuild", "httpRequest",
]);

const str = (v, fallback = "") => (v === undefined || v === null ? fallback : typeof v === "object" ? JSON.stringify(v) : String(v));
const objectOr = (v) => (isPlainObject(v) ? v : {});

/** Migre `data.response` (et celles des sous-commandes) de [data] en place. */
export function migrateCommandDataResponse(data) {
  migrateOne(data);
  const routes = data.subcommandWorkflows;
  if (isPlainObject(routes)) for (const payload of Object.values(routes)) if (isPlainObject(payload)) migrateOne(payload);
}

/** Migre le bloc `response` de [holder] (la commande ou une route de sous-commande). */
function migrateOne(holder) {
  const response = holder.response;
  if (!isPlainObject(response)) return;
  if (response._migrated === true) return;

  const existing = Array.isArray(holder.actions) ? holder.actions.filter(isPlainObject) : [];
  // Une action de réponse explicite existe déjà : rien à injecter.
  if (existing.some((a) => RESPONSE_ACTION_TYPES.has(str(a.type)))) {
    response._migrated = true;
    return;
  }
  if (!isLegacyResponseMigrable(response)) {
    response._migrated = true;
    return;
  }

  const actions = existing.map((a) => ({ ...a }));
  const injected = buildRespondActions(response);
  const hasHeavy = existing.some((a) => HEAVY_ACTION_TYPES.has(str(a.type)));
  if (hasHeavy || actions.length + injected.length > DEFER_THRESHOLD) {
    actions.unshift(buildDeferAction(resolveVisibility(response) === "ephemeral"));
  }
  actions.push(...injected);
  holder.actions = actions;
  response._migrated = true;
}

function isLegacyResponseMigrable(response) {
  const type = str(response.type, "normal");
  const mode = str(response.mode, "message");
  if (mode === "modal" || type === "modal") return isPlainObject(response.modal) && Object.keys(response.modal).length > 0;
  if (type === "componentV2" || mode === "componentV2") return isPlainObject(response.components) && Object.keys(response.components).length > 0;
  if (str(response.text).trim() !== "") return true;
  if (Array.isArray(response.embeds) && response.embeds.length > 0) return true;
  const conditional = isPlainObject(response.workflow) ? response.workflow.conditional : null;
  return isPlainObject(conditional) && conditional.enabled === true;
}

function buildRespondActions(response) {
  const conditional = objectOr(objectOr(response.workflow).conditional);
  return conditional.enabled === true ? [buildConditionalIfBlock(response, conditional)] : [buildSingleRespondAction(response)];
}

const resolveVisibility = (response) => (isPlainObject(response.workflow) ? str(response.workflow.visibility, "public").toLowerCase() : "public");

const given = (v) => v !== undefined && v !== null;

function buildSingleRespondAction(response, o = {}) {
  const type = str(response.type, "normal");
  const mode = str(response.mode, "message");
  const ephemeral = given(o.ephemeral) ? o.ephemeral : resolveVisibility(response) === "ephemeral";
  const base = { enabled: true, depend_on: [], error: { mode: "stop" } };

  if (mode === "modal" || type === "modal") {
    return { type: "respondWithModal", ...base, payload: { modal: given(o.modal) ? o.modal : { ...objectOr(response.modal) } } };
  }
  if (type === "componentV2" || mode === "componentV2") {
    const components = given(o.components) ? o.components : { ...objectOr(response.components) };
    return { type: "respondWithComponentV2", ...base, payload: { components, ephemeral } };
  }
  const text = given(o.text) ? o.text : str(response.text);
  const embeds = given(o.embeds) ? o.embeds : Array.isArray(response.embeds) ? [...response.embeds] : [];
  const components = given(o.components) ? o.components : { ...objectOr(response.components) };
  return {
    type: "respondWithMessage",
    ...base,
    payload: {
      content: text,
      ...(embeds.length > 0 ? { embeds } : {}),
      ...(Object.keys(components).length > 0 ? { components } : {}),
      ephemeral,
    },
  };
}

function buildConditionalIfBlock(response, conditional) {
  const branch = (which) => {
    const branchType = str(conditional[`when${which}Type`], "message");
    const componentsKey = branchType === "componentV2" ? `when${which}Components` : `when${which}NormalComponents`;
    const rawComponents = conditional[componentsKey];
    const branchVisibility = str(conditional[`when${which}Visibility`]).toLowerCase();
    return buildSingleRespondAction(response, {
      text: str(conditional[`when${which}Text`]),
      embeds: Array.isArray(conditional[`when${which}Embeds`]) ? [...conditional[`when${which}Embeds`]] : [],
      components: isPlainObject(rawComponents) && Object.keys(rawComponents).length > 0 ? rawComponents : null,
      modal: isPlainObject(conditional[`when${which}Modal`]) ? conditional[`when${which}Modal`] : null,
      // Visibilité propre à la branche, sinon celle du bloc `workflow`.
      ephemeral: branchVisibility === "ephemeral" ? true : branchVisibility === "public" ? false : resolveVisibility(response) === "ephemeral",
    });
  };
  return {
    type: "ifBlock",
    enabled: true,
    depend_on: [],
    error: { mode: "stop" },
    payload: { condition: str(conditional.variable), actions: [branch("True")], elseActions: [branch("False")] },
  };
}

const buildDeferAction = (ephemeral) => ({ type: "deferInteraction", enabled: true, depend_on: [], error: { mode: "stop" }, payload: { ephemeral } });
