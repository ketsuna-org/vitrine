---
layout: doc
title: "Système — CommandMigration"
translation_key: docs
category: systems
description: >
  Documentation du module de migration transparente des commandes legacy.
  Conversion des blocs data.response (message, componentV2, modal) en actions
  inline modernes (respondWithMessage, respondWithComponentV2, respondWithModal),
  injection automatique de defer, et support des blocs conditionnels ifBlock.
---

# Système — CommandMigration

Le module `CommandMigration` assure la migration transparente des blocs `data.response` legacy (format historique de Bot Creator) vers des actions inline modernes. Il est implémenté dans `packages/shared/lib/utils/command_migration.dart` (679 lignes).

La migration est appliquée à l'exécution (runtime) par `BotDataStore.normalizeCommandData` et **n'est jamais persistée** dans les données stockées (sauf via `migrateCommandDataResponsePermanently`). Le module est également responsable de l'injection automatique d'un `deferInteraction` lorsque le nombre ou le type d'actions dépasse la fenêtre d'acquittement de 3 secondes de Discord.

---

## Constantes

### `_kResponseActionTypes`

Types d'actions reconnus comme des réponses explicites. Quand une action de ce type est déjà présente, la migration ne fait rien pour éviter les doublons.

```dart
const _kResponseActionTypes = {
  'respondWithMessage',
  'respondWithComponentV2',
  'respondWithModal',
  'reply',
};
```

### `_kDeferThreshold`

Seuil d'actions au-dessus duquel un `deferInteraction` est automatiquement ajouté.

```dart
const _kDeferThreshold = 2;
```

**Règle :** si le nombre total d'actions (existantes + injectées) dépasse 2, un defer est inséré en première position.

### `_kHeavyActionTypes`

Liste de 40+ types d'actions réseau qui forcent un defer **indépendamment du nombre d'actions**.

| Catégorie        | Types d'actions                                             |
|------------------|-------------------------------------------------------------|
| Modération       | `banUser`, `unbanUser`, `kickUser`, `muteUser`, `unmuteUser`, `serverMuteMember`, `serverDeafenMember` |
| Messages         | `sendMessage`, `editMessage`, `deleteMessages`, `sendDm`, `getMessage`, `pinMessage`, `unpinMessage` |
| Salons           | `createChannel`, `updateChannel`, `removeChannel`, `createThread`, `addThreadMember`, `removeThreadMember` |
| Rôles/Permissions| `addRole`, `removeRole`, `editChannelPermissions`, `deleteChannelPermission` |
| Webhooks         | `sendWebhook`, `editWebhook`, `deleteWebhook`               |
| Serveur/AutoMod  | `updateGuild`, `updateAutoMod`, `createAutoModRule`, `deleteAutoModRule`, `registerGuildCommands`, `unregisterGuildCommands`, `updateGuildOnboarding` |
| Invitations      | `createInvite`, `deleteInvite`                              |
| Vocal            | `moveToVoiceChannel`, `disconnectFromVoice`                 |
| Emojis           | `createEmoji`, `updateEmoji`, `deleteEmoji`                 |
| Sondages         | `createPoll`, `endPoll`                                     |
| Membre           | `setNickname`, `updateSelfUser`, `leaveGuild`               |
| HTTP externe     | `httpRequest`                                               |

---

## Fonctions principales

### `migrateCommandDataResponse(data)`

Migration runtime (en mémoire uniquement, non persistée). Idempotente grâce au sentinel `_migrated`.

```dart
void migrateCommandDataResponse(Map<String, dynamic> data)
```

**Étapes :**

1. Appelle `_migrateResponseBlock(data)` — migre le bloc `data.response` racine.
2. Appelle `_migrateSubcommandWorkflows(data)` — migre les workflows de sous-commandes (`data.subcommandWorkflows`).

---

### `migrateCommandDataResponsePermanently(data)`

Version persistante de la migration. Contrairement à `migrateCommandDataResponse`, cette fonction **vide** le contenu du bloc `response` pour que la migration soit sauvegardée.

```dart
bool migrateCommandDataResponsePermanently(Map<String, dynamic> data)
```

**Retour :** `true` si du contenu a été migré, `false` si le bloc `response` était déjà vide ou déjà migré.

**Étapes :**

1. Vérifie si `data.response` est un `Map` non trivial (`_isLegacyResponseMigrable`).
2. Si des actions de réponse existent déjà (`_hasExplicitResponseAction`), vide simplement le bloc réponse.
3. Sinon, applique la migration runtime (injection des actions respond/defer), puis vide le bloc réponse.
4. Le bloc réponse vidé conserve une structure minimale pour compatibilité ascendante :

```json
{
  "mode": "message",
  "type": "normal",
  "text": "",
  "embeds": [],
  "components": {},
  "modal": {},
  "workflow": {
    "autoDeferIfActions": true,
    "visibility": "public",
    "onError": "edit_error",
    "conditional": { "enabled": false }
  }
}
```

5. Applique également `_migrateSubcommandWorkflowsPermanently(data)`.

---

### `stripMigratedCommandData(commands)`

Optimise les maps de commandes pour la transmission en supprimant les clés legacy (`response` et `simpleConfig`) lorsque le sentinel `_migrated` est présent.

```dart
bool stripMigratedCommandData(List<Map<String, dynamic>> commands)
```

**Retour :** `true` si au moins une modification a été effectuée.

---

## Logique de migration interne

### `_migrateResponseBlock(data)`

Migre le bloc `data.response` racine en actions inline.

1. Extrait `data.response` — si absent ou pas un `Map`, ne fait rien.
2. Vérifie le sentinel `_migrated` — si `true`, déjà migré dans ce cycle.
3. Vérifie si une action de réponse explicite existe déjà — si oui, marque `_migrated` et termine.
4. Vérifie si le bloc réponse est migrable (`_isLegacyResponseMigrable`) — si non, marque `_migrated` et termine.
5. Construit les actions injectées via `_buildRespondActions(response)`.
6. Vérifie si un defer est nécessaire :
   - **Condition 1 :** une action existante est dans `_kHeavyActionTypes`.
   - **Condition 2 :** le nombre total d'actions après injection > `_kDeferThreshold`.
7. Si defer nécessaire : insère `deferInteraction` en première position, tenant compte de la visibilité `ephemeral`.
8. Ajoute les actions injectées à la liste d'actions existantes.
9. Marque `_migrated = true`.

---

### `_buildRespondActions(response)`

Construit la ou les action(s) de réponse à partir d'un bloc `response` legacy.

Deux cas :
1. **Conditionnel activé** (`workflow.conditional.enabled == true`) → construit un `ifBlock` avec branche true/false.
2. **Normal** → construit une seule action `respondWithMessage`, `respondWithComponentV2` ou `respondWithModal`.

### `_buildSingleRespondAction(response, overrides...)`

Construit une action de réponse unique selon le type/mode :

| Type legacy        | Action générée            | Payload principal                       |
|--------------------|---------------------------|-----------------------------------------|
| `modal`            | `respondWithModal`        | `response.modal`                        |
| `componentV2`      | `respondWithComponentV2`  | `response.components` + `ephemeral`     |
| normal (message)   | `respondWithMessage`      | `content` (texte), `embeds`, `components`, `ephemeral` |

Chaque action inclut :
- `type` : le type d'action
- `enabled: true`
- `depend_on: []`
- `error: { mode: 'stop' }`
- `payload` : les données spécifiques

### `_buildConditionalIfBlock(response, conditional)`

Construit un bloc `ifBlock` avec deux branches (true/false) :

```json
{
  "type": "ifBlock",
  "enabled": true,
  "depend_on": [],
  "error": { "mode": "stop" },
  "payload": {
    "condition": "<variable>",
    "actions": [ <action branche true> ],
    "elseActions": [ <action branche false> ]
  }
}
```

Chaque branche supporte indépendamment :
- Type de réponse (`whenTrueType` / `whenFalseType`) : `message`, `componentV2`, `modal`
- Texte (`whenTrueText` / `whenFalseText`)
- Embeds (`whenTrueEmbeds` / `whenFalseEmbeds`)
- Composants (`whenTrueComponents` / `whenFalseComponents`, `whenTrueNormalComponents` / `whenFalseNormalComponents`)
- Modal (`whenTrueModal` / `whenFalseModal`)
- Visibilité (`whenTrueVisibility` / `whenFalseVisibility`) : `ephemeral` ou `public`

La visibilité de chaque branche est résolue via `_resolveConditionalVisibility` qui vérifie d'abord une clé spécifique à la branche, puis fallback sur la visibilité globale (`workflow.visibility`).

---

### `_isLegacyResponseMigrable(response)`

Détermine si un bloc réponse legacy contient effectivement quelque chose à migrer.

| Condition                                | Retour |
|------------------------------------------|--------|
| Mode `modal` avec un payload modal non vide   | `true` |
| Mode `componentV2` avec des composants non vides | `true` |
| Mode normal avec texte non vide ou embeds non vides | `true` |
| Bloc conditionnel activé (`workflow.conditional.enabled == true`) | `true` |
| Sinon                                     | `false` |

---

### `_buildDeferAction(isEphemeral)`

Construit une action `deferInteraction` :

```json
{
  "type": "deferInteraction",
  "enabled": true,
  "depend_on": [],
  "error": { "mode": "stop" },
  "payload": { "ephemeral": <bool> }
}
```

---

## Migration des sous-commandes

### `_migrateSubcommandWorkflows(data)`

Version runtime : itère sur `data.subcommandWorkflows` et migre chaque payload ayant un bloc `response`.

Chaque payload a la forme :
```json
{
  "route/subcommand": {
    "response": { ... },
    "actions": [ ... ]
  }
}
```

La logique est identique à celle de la migration racine (`_migrateResponseBlock`), appliquée individuellement à chaque sous-commande.

### `_migrateSubcommandWorkflowsPermanently(data)`

Version persistante : vide le bloc `response` de chaque sous-commande migrée, en conservant la structure minimale.

---

## Résumé du flux de migration

```
normalizeCommandData(raw)
    │
    ├── Deep copy du Map
    ├── Extraction du bloc 'data'
    ├── Normalisation des structures (bdfdScript, visualActions, executionMode)
    │
    ├── data.response présent ?
    │   └── migrateCommandDataResponse(data)
    │       ├── _migrateResponseBlock(data)
    │       │   ├── Vérifie _migrated
    │       │   ├── Vérifie actions explicites existantes
    │       │   ├── Vérifie si migrable
    │       │   ├── _buildRespondActions(response)
    │       │   │   ├── Conditionnel ? → _buildConditionalIfBlock
    │       │   │   └── Normal      → _buildSingleRespondAction
    │       │   ├── shouldAutoDefer ? → _buildDeferAction
    │       │   └── Injecte dans data.actions
    │       │
    │       └── _migrateSubcommandWorkflows(data)
    │           └── Pour chaque sous-commande :
    │               └── Même logique que _migrateResponseBlock
    │
    └── Normalisation des configs autocomplete
```
