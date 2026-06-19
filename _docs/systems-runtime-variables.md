---
layout: doc
title: "Système — Runtime Variables"
translation_key: docs
category: systems
description: >
  Documentation du système d'hydratation des variables d'exécution (runtime variables)
  pour l'exécution BDFD. Couvre la chaîne d'hydratation complète : variables globales,
  variables scopées (guild/channel/user/member/message), compatibilité legacy BDFD v1,
  injection événementielle et aliases de workflow.
---

# Système — Runtime Variables

Le système de **Runtime Variables** est le mécanisme central qui peuple le dictionnaire `Map<String, String>` utilisé par le moteur d'exécution BDFD. Il est implémenté dans `packages/shared/lib/utils/runtime_variables.dart` (603 lignes) avec des fonctions complémentaires dans `template_resolver.dart`, `event_contexts.dart` et les exécuteurs (`command_executor.dart`, `event_dispatcher.dart`).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                    CHAÎNE D'HYDRATATION COMPLÈTE                  │
│                                                                   │
│  1. injectAlwaysAvailableVariables  ← timestamps, bot.id, etc.   │
│  2. extractBotRuntimeDetails         ← bot.guildCount, ping, ...  │
│  3. _injectBaseVariables             ← bot.uptime                 │
│  4. sessionVariableInjector          ← bot.ownerId, commands      │
│  5. Contexte événementiel            ← event.name, guildId, ...   │
│  6. _hydrateEventContext             ← guild, member, channel     │
│  7. injectGlobalRuntimeVariables     ← global.{key}               │
│  8. injectScopedRuntimeVariables × 5 ← guild/channel/user/        │
│     (parallèle : guild, channel,       member/message.scope.key    │
│      user, guildMember, message)                                  │
│  9. applyEventVariableAliases        ← aliases de workflow        │
└──────────────────────────────────────────────────────────────────┘
```

## Fonctions helpers (privées)

### `_isInvalidContextId(value)`

Détecte les identifiants de contexte invalides. Retourne `true` si la valeur normalisée (trim + lowerCase) est vide, égale à `'unknown user'` ou égale à `'dm'`.

```dart
bool _isInvalidContextId(String? value) {
  final normalized = (value ?? '').trim().toLowerCase();
  return normalized.isEmpty ||
      normalized == 'unknown user' ||
      normalized == 'dm';
}
```

### `_normalizeContextId(value)`

Normalise un contextId : le trim, puis retourne `null` s'il est invalide (via `_isInvalidContextId`).

### `_normalizeScopedStorageKey(key)`

Strip le préfixe `bc_` si présent au début de la clé. Utilisé pour la normalisation des clés de stockage dans le store.

### `_isMissingOrEmptyValue(value)`

Retourne `true` si la valeur est `null` ou une chaîne vide (après trim). Utilisé pour décider si une `defaultValue` de définition scopée doit être appliquée.

### `_legacyContextIdsForScope(scope, canonicalContextId)`

Génère les identifiants de contexte legacy pour compatibilité BDFD v1. Selon le scope :

| Scope       | Legacy Context IDs générés                                     |
|-------------|---------------------------------------------------------------|
| `user`      | `['Unknown User']`                                            |
| `guild`     | `['DM']`                                                      |
| `channel`   | `['DM']`                                                      |
| `guildMember` | `['DM:Unknown User']` + si guild non vide `'{guild}:Unknown User'` + si user non vide `'DM:{user}'` |
| autres      | `[]`                                                          |

### `stringifyRuntimeVariableValue(value)`

Convertit une valeur dynamique en `String` pour le dictionnaire de variables :
- `null` → `''`
- `String` → retournée telle quelle
- `List` ou `Map` → `jsonEncode(value)`
- Autre → `value.toString()`

---

## Injection globale

### `injectGlobalRuntimeVariables(store, botId, runtimeVariables)`

Récupère toutes les variables globales du store et les injecte dans le dictionnaire :

```dart
Future<void> injectGlobalRuntimeVariables({
  required BotDataStore store,
  required String botId,
  required Map<String, String> runtimeVariables,
}) async {
  final globalVars = await store.getGlobalVariables(botId);
  for (final entry in globalVars.entries) {
    runtimeVariables['global.${entry.key}'] = stringifyRuntimeVariableValue(entry.value);
  }
  runtimeVariables['variables.count'] = globalVars.length.toString();
}
```

Variables produites :
- `global.{nom}` : chaque variable globale
- `variables.count` : nombre total de variables globales

---

## Injection scopée

### `injectScopedRuntimeVariables(store, botId, scope, contextId, runtimeVariables, legacyContextIds, scopedDefinitions)`

Hydrate les variables liées à un scope spécifique (guild, channel, user, guildMember, message). Cette fonction est la plus riche du système.

#### Algorithme

1. **Normalisation** du `contextId` via `_normalizeContextId` → si invalide (`null`), aucune variable scopée n'est chargée.

2. **Récupération** des valeurs depuis le store via `store.getScopedVariables(botId, scope, normalizedContextId)`.

3. **Fallback legacy** : si aucune valeur trouvée, itère sur `legacyContextIds` et tente `store.getScopedVariables` avec chaque ID legacy. Si trouvé, **migre** les valeurs vers le nouveau contextId via `store.setScopedVariable` puis s'arrête (`break`).

4. **ScopedDefinitions** : pour chaque définition statique (configured scoped var with `defaultValue`) :
   - Vérifie que le `scope` de la définition correspond
   - Normalise la clé (`_normalizeScopedStorageKey`)
   - Si la valeur existante est manquante/vide (`_isMissingOrEmptyValue`) et qu'un `defaultValue` non-trivial existe → applique la valeur par défaut et la persiste dans le store

5. **Injection** : pour chaque entrée du map de valeurs, injecte **quatre** formes de clés :
   - `{scope}.bc_{key}` : forme canonique avec préfixe bc_
   - `{scope}.{key}` : forme sans préfixe
   - `{scope}[{contextId}].bc_{key}` : forme qualifiée avec contextId
   - `{scope}[{contextId}].{key}` : forme qualifiée sans préfixe

Cela permet aux scripts BDFD de référencer les variables de plusieurs façons (par ex. `$getUserVar[cash;{userId}]` ou `((user.bc_cash))`).

---

## Fonction principale d'hydratation

### `hydrateRuntimeVariables(store, botId, runtimeVariables, guildContextId?, channelContextId?, userContextId?, messageContextId?)`

C'est la **fonction maîtresse** qui orchestre toute la chaîne d'hydratation. Appelée avant chaque exécution de commande ou workflow.

```dart
Future<void> hydrateRuntimeVariables({
  required BotDataStore store,
  required String botId,
  required Map<String, String> runtimeVariables,
  String? guildContextId,
  String? channelContextId,
  String? userContextId,
  String? messageContextId,
  int guildCount = 0,
  int uptimeMs = 0,
  int pingMs = 0,
}) async
```

#### Séquence d'exécution

1. **Variables always-available** : appelle `injectAlwaysAvailableVariables` (timestamps, bot.id, bot.guildCount, bot.uptime, etc.)

2. **Scoped definitions** : récupère les définitions scopées (`store.getScopedVariableDefinitions(botId)`) — ignore silencieusement les erreurs.

3. **Variables globales** : appelle `injectGlobalRuntimeVariables`.

4. **Normalisation des context IDs** :
   - `normalizedGuildId = _normalizeContextId(guildContextId)`
   - `normalizedUserId = _normalizeContextId(userContextId)`
   - `guildMemberContextId = '{guild}:{user}'` si les deux sont valides, sinon `null`

5. **Injection scopée parallèle** : les 5 scopes sont hydratés simultanément via `Future.wait` :

   | Scope        | contextId              | legacyContextIds                                   |
   |-------------|------------------------|---------------------------------------------------|
   | `guild`      | `guildContextId`       | `_legacyContextIdsForScope('guild', ...)` → `['DM']` |
   | `channel`    | `channelContextId`     | `_legacyContextIdsForScope('channel', ...)` → `['DM']` |
   | `user`       | `userContextId`        | `_legacyContextIdsForScope('user', ...)` → `['Unknown User']` |
   | `guildMember` | `guildMemberContextId`  | `_legacyContextIdsForScope('guildMember', ...)`    |
   | `message`    | `messageContextId`     | `_legacyContextIdsForScope('message', ...)` → `[]` |

   Chaque appel à `injectScopedRuntimeVariables` reçoit également les `scopedDefinitions` pour appliquer les valeurs par défaut.

### `hydrateSpecificScopedVariables(store, botId, scope, contextId, runtimeVariables)`

Version simplifiée utilisée pour l'hydratation à la demande (ex: quand un placeholder `user[ID].bc_var` est découvert dans une action). Injecte uniquement les formes qualifiées avec contextId :

- `{scope}[{contextId}].bc_{key}`
- `{scope}[{contextId}].{key}`

### `hydrateActionPlaceholders(store, botId, actions, variables, discordFetcher, hydratedActions)`

Scanne récursivement les actions (strings, maps, listes, objets `Action`) pour détecter :

1. **Placeholders scopés avec propriété** : `member[((message.mentions[0]))].displayName` ou `user[ID].bc_cash` — utilise un walker bracket-depth-aware pour gérer correctement les crochets imbriqués.

2. **Placeholders sans propriété** : `getReactions[channelId;messageId;emoji]` ou `emoji[name]`.

3. **Fonctions BDFD legacy** : `$getUserVar[name;ID]`, `$getGuildVar[...]`, `$getChannelVar[...]`, `$getMessageVar[...]`.

Les placeholders dont la propriété commence par `bc_` sont ajoutés à `scopedContextsToFetch` (hydratation depuis le store). Les autres (ex: `displayName`, `username`) sont ajoutés à `discordContextsToFetch` (hydratation via DiscordEntityFetcher).

---

## Legacy aliases

### `_legacyContextIdsForScope(scope, canonicalContextId)`

Système de fallback pour la compatibilité avec BDFD v1. Dans l'ancien BDFD, les variables étaient stockées sous :
- `Unknown User` pour les utilisateurs non identifiés
- `DM` pour les channels/guilds en DM

Ce mécanisme garantit que les anciennes données sont :
1. **Retrouvées** via les IDs legacy
2. **Migrées** automatiquement vers les nouveaux IDs canoniques lors de la première lecture

### `applyEventVariableAliases(runtimeVariables, workflowData)`

Applique les alias de variables définis au niveau d'un workflow. Si le workflow définit un champ `eventVariableAliases` (Map `originalName → alias`), chaque alias reçoit une copie de la valeur originale.

```dart
void applyEventVariableAliases(
  Map<String, String> runtimeVariables,
  Map<String, dynamic>? workflowData,
) {
  final rawAliases = workflowData?['eventVariableAliases'];
  if (rawAliases is! Map || rawAliases.isEmpty) return;

  for (final entry in rawAliases.entries) {
    final original = entry.key.toString();
    final alias = entry.value?.toString() ?? '';
    if (original.isEmpty || alias.isEmpty) continue;

    final value = runtimeVariables[original];
    if (value != null) {
      runtimeVariables[alias] = value;
    }
  }
}
```

**Important** : les clés originales sont conservées — l'alias est une **copie**, pas un renommage.

---

## Variables always-available

### `injectAlwaysAvailableVariables` (template_resolver.dart)

Injecte les variables de base toujours disponibles, indépendamment du contexte :

| Variable           | Description                                         |
|--------------------|-----------------------------------------------------|
| `bot.id`           | ID du bot                                           |
| `bot.guildCount`   | Nombre de guilds                                    |
| `bot.uptime`       | Uptime en millisecondes                             |
| `bot.ping`         | Latence gateway en ms                               |
| `getTimestamp`     | Timestamp Unix (secondes)                           |
| `getTimestampMs`   | Timestamp Unix (millisecondes)                      |
| `day`              | Jour actuel UTC (1-31)                              |
| `month`            | Mois actuel UTC (1-12)                              |
| `year`             | Année actuelle UTC                                  |
| `hour`             | Heure actuelle UTC (0-23)                           |
| `minute`           | Minute actuelle UTC (0-59)                          |
| `second`           | Seconde actuelle UTC (0-59)                         |
| `time`             | Heure formatée `HH:MM:SS`                           |
| `date`             | Date formatée `YYYY-MM-DD`                          |

### `extractBotRuntimeDetails` (global.dart)

Injecte les détails runtime du bot provenant du client gateway :

| Variable            | Description                                    |
|---------------------|------------------------------------------------|
| `bot.id`            | ID du bot                                      |
| `bot.guildCount`    | Nombre de guilds (cache)                       |
| `bot.guildNames`    | Noms des guilds séparés par `, `               |
| `bot.invite`        | URL d'invitation OAuth2                        |
| `bot.ping` / `ping` | Latence gateway (ou `'0'` si indisponible)      |
| `bot.uptime` / `bot.uptimeMs` | Uptime en ms (si `botStartTimes` dispo) |

### `_injectBaseVariables` (command_executor.dart / event_dispatcher.dart)

Injecte les variables de session calculées à partir du `startedAt` :

```dart
void _injectBaseVariables(Map<String, String> variables, {
  required String botId,
  required DateTime? startedAt,
}) {
  if (startedAt != null) {
    final uptimeMs = DateTime.now().difference(startedAt).inMilliseconds;
    variables['bot.uptime'] = uptimeMs.toString();
    variables['bot.uptimeMs'] = uptimeMs.toString();
  }
}
```

### `BotSession.injectVariables` (bot_session.dart)

Injecte les variables liées à la session active du bot :

| Variable                  | Description                      |
|---------------------------|----------------------------------|
| `bot.ownerId`             | ID du propriétaire du bot       |
| `bot.commands`            | Nombre de commandes             |
| `bot.commandsCount`       | Alias de `bot.commands`         |
| `bot.slashCommandsCount`  | Alias de `bot.commands`         |
| `bot.uptime`              | Uptime depuis `_startedAt` (ms) |

---

## Variables événementielles

### Contexte d'événement (`_baseEventContext`)

Chaque événement Discord produit un `EventExecutionContext` via `_baseEventContext` qui injecte :

| Variable      | Source                              |
|---------------|-------------------------------------|
| `event.name`  | Nom de l'événement (ex: `messageCreate`) |
| `timestamp`   | `DateTime.now().millisecondsSinceEpoch` |
| `actualTime`  | `DateTime.now().toIso8601String()`  |
| `guildId`     | ID de la guild (ou `''`)            |
| `channelId`   | ID du channel (ou `''`)             |
| `userId`      | ID de l'utilisateur (ou `''`)       |

### Variables message (`_messageExtra`)

Injectées pour les événements liés aux messages (`messageCreate`, `messageUpdate`, etc.) :

| Variable                        | Description                               |
|---------------------------------|-------------------------------------------|
| `message.id`                    | ID du message                             |
| `message.content`               | Contenu texte du message                  |
| `message.word.count`            | Nombre de mots dans le contenu            |
| `message.content[0]` à `[9]`   | Mots individuels (max 10)                 |
| `message.isBot`                 | `'true'` si l'auteur est un bot           |
| `message.channelId`             | ID du channel                             |
| `message.isDM`                  | `'true'` si DM                            |
| `message.isSystem`              | `'true'` si message système               |
| `message.type`                  | Type numérique du message                 |
| `message.mentions`              | IDs des utilisateurs mentionnés (CSV)     |
| `message.mention.count`         | Nombre de mentions utilisateur            |
| `message.mentions[0]` à `[9]`  | IDs individuels des mentions (max 10)     |
| `message.timestamp`             | Timestamp du message (ms epoch)           |
| `message.isEdited`              | `'true'` si édité                         |
| `message.editedTimestamp`       | Timestamp d'édition (si édité)            |
| `message.isPinned`              | `'true'` si épinglé                       |
| `message.attachments`           | URLs des pièces jointes (CSV)             |
| `message.attachments.count`     | Nombre de pièces jointes                  |
| `message.embeds.count`          | Nombre d'embeds                           |
| `message.roleMentions`          | IDs des rôles mentionnés (CSV)            |
| `message.roleMentions.count`    | Nombre de mentions de rôles               |
| `message.mentionsEveryone`      | `'true'` si @everyone/@here               |
| `message.referencedMessage.id` | ID du message référencé (reply)           |
| `message.url`                   | URL du message sur Discord                |

### Variables utilisateur (`_userExtra`)

Injectées pour l'auteur du message ou l'utilisateur d'une interaction :

| Variable             | Description                                    |
|----------------------|------------------------------------------------|
| `user.id`            | ID de l'utilisateur                            |
| `user.username`      | Nom d'utilisateur                              |
| `user.globalName`    | Nom global (display name)                      |
| `user.displayName`   | Alias de `globalName`                          |
| `user.tag`           | Discriminateur                                 |
| `user.avatar`        | URL de l'avatar                                |
| `user.banner`        | URL de la bannière                             |
| `user.createdAt`     | Date de création du compte (ISO 8601)          |
| `user.bannerColor`   | Couleur d'accent (`#RRGGBB`)                   |
| `user.isBot`         | Non injecté par `_userExtra` (géré ailleurs)   |
| `user.mention`       | Non injecté par `_userExtra` (géré ailleurs)   |

Si `enrichAuthor: true` → injecte également `author.*` (id, username, globalName, tag, avatar, banner, displayName).

### Variables membre (`_memberExtra`)

Injectées pour les événements en guild :

| Variable                          | Description                                  |
|-----------------------------------|----------------------------------------------|
| `member.id`                       | ID du membre                                 |
| `member.nick`                     | Surnom sur le serveur                        |
| `member.displayName`              | Surnom ou nom global                         |
| `member.avatar`                   | URL de l'avatar de serveur                   |
| `member.joinedAt`                 | Date d'arrivée sur le serveur (ISO 8601)     |
| `member.roles`                    | IDs des rôles (CSV)                          |
| `member.roles.count`              | Nombre de rôles                              |
| `member.isBooster`                | `'true'` si booste le serveur                |
| `member.isAdmin`                  | `'true'` si permission Administrateur        |
| `member.communicationDisabledUntil` | Timeout jusqu'à (ISO 8601, si timeouté)   |
| `member.permissions`              | Non injecté par `_memberExtra` (géré ailleurs) |
| `member.mention`                  | Non injecté par `_memberExtra` (géré ailleurs) |
| `member.highestRole`              | Non injecté par `_memberExtra` (géré ailleurs) |
| `member.lowestRole`               | Non injecté par `_memberExtra` (géré ailleurs) |

Si `prefix == 'member'` → injecte également toutes les variables `user.*` de l'utilisateur sous-jacent.

### Variables d'interaction (`buildInteractionRuntimeVariables`)

Injectées pour les événements `interactionCreate` (slash commands, boutons, selects, modals) :

**Générales :**

| Variable                     | Description                                       |
|------------------------------|---------------------------------------------------|
| `interaction.kind`           | Type : `'command'`, `'button'`, `'select'`, `'modal'`, `'autocomplete'` |
| `interaction.id`             | ID de l'interaction                               |
| `interaction.token`          | Token de l'interaction                            |
| `interaction.applicationId`  | ID de l'application                               |
| `interaction.customId`       | custom_id (boutons, selects, modals)              |
| `interaction.values`         | Valeurs sélectionnées (CSV)                       |
| `interaction.values.count`   | Nombre de valeurs                                 |
| `interaction.guildId`        | ID de la guild                                    |
| `interaction.channelId`      | ID du channel                                     |
| `interaction.userId`         | ID de l'utilisateur                               |
| `interaction.messageId`      | ID du message (composants)                        |
| `interaction.command.name`   | Nom de la commande slash                          |
| `interaction.command.id`     | ID de la commande                                 |
| `interaction.command.type`   | Type de commande                                  |
| `interaction.command.route`  | Route de sous-commande (ex: `parent sub`)         |
| `interaction.data.type`      | Type de données (sauf modal)                      |

**Select components :**

| Variable                                | Description                              |
|-----------------------------------------|------------------------------------------|
| `interaction.stringSelect.value`        | Première valeur string sélectionnée      |
| `interaction.stringSelect.values`       | Toutes les valeurs (CSV)                 |
| `interaction.stringSelect.count`        | Nombre de valeurs                        |
| `interaction.stringSelect.value[1..N]`  | Valeurs indexées (1-based)               |
| `interaction.channelSelect.channelId`   | Premier channel sélectionné              |
| `interaction.channelSelect.channelIds`  | Tous les channels (CSV)                  |
| `interaction.channelSelect.channelCount`| Nombre de channels                       |
| `interaction.userSelect.userId`         | Premier utilisateur sélectionné          |
| `interaction.userSelect.userIds`        | Tous les utilisateurs (CSV)              |
| `interaction.userSelect.userCount`      | Nombre d'utilisateurs                    |
| `interaction.roleSelect.roleId`         | Premier rôle sélectionné                 |
| `interaction.roleSelect.roleIds`        | Tous les rôles (CSV)                     |
| `interaction.roleSelect.roleCount`      | Nombre de rôles                          |
| `interaction.mentionableSelect.userId`  | Premier mentionnable sélectionné         |
| `interaction.mentionableSelect.userIds` | Tous les mentionnables (CSV)             |
| `interaction.mentionableSelect.userCount`| Nombre de mentionnables                 |

**Collections JSON** (pour usage dans `$jsonParse`) :

Pour chaque select, une variable `__collection.{pluralKey}` contient le tableau JSON complet (ex: `__collection.interaction.stringSelect.values`).

**Modal inputs :**

Pour chaque champ de modal, 4 alias sont créés :

| Variable               | Exemple                         |
|------------------------|---------------------------------|
| `modal.{customId}`     | `modal.reason`                  |
| `opts.{customId}`      | `opts.reason`                   |
| `arg.{customId}`       | `arg.reason`                    |
| `workflow.arg.{customId}` | `workflow.arg.reason`        |

### Hydratation du contexte événementiel (`_hydrateEventContext`)

Après l'injection initiale, `_hydrateEventContext` enrichit les variables avec des données fraîches de l'API Discord :

1. Si `guildId` présent → fetch la guild (cache ou API) et injecte :
   - `guild.id`, `guild.name`, `guild.memberCount` (fetch async), `guild.systemChannelId`, `guild.ownerId`, `guild.preferredLocale`
   - `guildName`, `guild.name`, `interaction.guild.name`

2. Si `userId` présent dans une guild → fetch le membre et injecte `member.*` (nick, roles, permissions, etc.)

3. Si `channelId` présent → fetch le channel et injecte `channel.id`, `channel.name`, `channel.type`

---

## Chaîne d'hydratation complète par type d'exécution

### Exécution de commande Slash (command_executor.dart)

```
1. extractBotRuntimeDetails(gateway)      → bot.id, bot.guildCount, ping, ...
2. _injectBaseVariables(...)              → bot.uptime, bot.uptimeMs
3. sessionVariableInjector(...)            → bot.ownerId, bot.commands, ...
4. interaction.isSlash = 'true'
5. hydrateRuntimeVariables(...)            → global + 5 scopes parallèles
6. interaction.command.route = ...
```

### Exécution de workflow événementiel (event_dispatcher.dart)

```
1. EventExecutionContext (via _baseEventContext)
   → event.name, timestamp, actualTime, guildId, channelId, userId
   → Variables spécifiques à l'événement (_messageExtra, _userExtra, ...)
2. _injectBaseVariables(...)              → bot.uptime
3. extractBotRuntimeDetails(gateway)      → bot.*, ping
4. sessionVariableInjector(...)            → bot.ownerId, bot.commands, ...
5. _hydrateEventContext(gateway, ...)     → guild.*, channel.*, member.*
6. hydrateRuntimeVariables(...)            → global + 5 scopes parallèles
7. applyEventVariableAliases(...)          → aliases de workflow (par workflow)
```

### Exécution de message / commande legacy (event_dispatcher.dart)

```
1. _injectBaseVariables(...)              → bot.uptime
2. extractBotRuntimeDetails(gateway)      → bot.*, ping
3. sessionVariableInjector(...)            → bot.ownerId, bot.commands, ...
4. [_tryHandleLegacyCommand]              → exécution si préfixe match
5. [_handleEvent('messageCreate', ...)]   → chaîne événementielle complète
```

---

## Résumé des clés injectées par scope

### Scope `global`

| Clé                    | Source                      |
|------------------------|-----------------------------|
| `global.{key}`         | `store.getGlobalVariables`  |
| `variables.count`      | Nombre de variables globales|

### Scopes `guild`, `channel`, `user`, `guildMember`, `message`

Pour chaque scope et chaque variable stockée (ex: `cash` avec scope `user` et contextId `123456`) :

| Clé                                    | Exemple                              |
|----------------------------------------|--------------------------------------|
| `{scope}.bc_{key}`                     | `user.bc_cash`                       |
| `{scope}.{key}`                        | `user.cash`                          |
| `{scope}[{contextId}].bc_{key}`        | `user[123456].bc_cash`               |
| `{scope}[{contextId}].{key}`           | `user[123456].cash`                  |

Les clés avec `bc_` sont la forme canonique de stockage. Les formes sans `bc_` et avec contextId sont des commodités pour les templates BDFD.
