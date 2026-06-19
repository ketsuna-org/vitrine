---
layout: doc
translation_key: docs
category: systems
title: "Systèmes — VariableCatalog"
description: >
  Documentation du VariableCatalog : catalogue central des variables
  disponibles dans les expressions BDFD et les workflows visuels,
  descriptions human-readable, inférence de catégorie, suggestions
  always-available, base hydratée et suggestions par événement.
---

# Systèmes — VariableCatalog

Le `VariableCatalog` est le catalogue central de toutes les variables disponibles dans le moteur d'expression BDFD et les workflows visuels de Bot Creator. Il fournit trois services principaux :

1. **Descriptions human-readable** — un dictionnaire de 88 descriptions pour les variables les plus courantes, affichées comme sous-titres dans l'UI d'autocomplétion.
2. **Inférence de catégorie** — détermine automatiquement la catégorie logique d'une variable à partir de son préfixe.
3. **Suggestions contextuelles** — trois méthodes statiques qui produisent la liste des variables disponibles selon le contexte : suggestions permanentes, base hydratée, et suggestions spécifiques à un événement Discord.

Fichier source : `packages/shared/lib/utils/variable_catalog.dart` (695 lignes).

---

## Types associés

### VariableSuggestionKind

Défini dans `packages/shared/lib/types/variable_suggestion.dart`.

| Valeur       | Signification                                      |
|-------------|----------------------------------------------------|
| `numeric`   | La variable est de type numérique (ID, compteur, timestamp) |
| `nonNumeric`| La variable est de type texte/non-numérique         |
| `unknown`   | Le type est inconnu ou mixte (ex: fonctions, args)  |

### VariableCategory

| Catégorie    | Signification                                       |
|-------------|-----------------------------------------------------|
| `context_`  | Contexte d'exécution (workflow, event, timestamp)   |
| `bot`       | Informations sur le bot                             |
| `guild`     | Informations sur le serveur (guild)                 |
| `channel`   | Informations sur le salon                           |
| `member`    | Informations sur le membre (guild-specific)         |
| `author`    | Auteur du message / utilisateur ayant déclenché     |
| `user`      | Utilisateur Discord (global)                        |
| `message`   | Message ayant déclenché l'exécution                 |
| `interaction`| Interactions (slash commands, autocomplete)        |
| `function_` | Fonctions built-in (helpers)                        |
| `temp`      | Variables temporaires                               |
| `other`     | Événements spécifiques (voice, reaction, etc.)      |

---

## 1. Descriptions (`_descriptions`)

La map privée `_descriptions` contient 88 entrées associant un nom de variable (en minuscules) à une description en anglais. La fonction publique `variableDescription(name)` retourne la description correspondante, ou `null` si aucune n'existe.

### Catégorie Context (Contexte)

| Variable              | Description                                      |
|-----------------------|--------------------------------------------------|
| `workflow.name`       | Nom du workflow en cours d'exécution              |
| `workflow.entryPoint` | Point d'entrée qui a déclenché ce workflow        |
| `workflow.args`       | Arguments passés à ce workflow                    |
| `event.name`          | Nom de l'événement ayant déclenché l'exécution    |
| `timestamp`           | Timestamp Unix actuel (secondes)                  |
| `actualtime`          | Date et heure actuelles en texte                  |
| `guildid`             | ID du serveur actuel                              |
| `channelid`           | ID du salon actuel                                |
| `userid`              | ID de l'utilisateur qui a déclenché la commande   |
| `messageid`           | ID du message déclencheur                         |

### Catégorie Bot

| Variable            | Description                                         |
|---------------------|-----------------------------------------------------|
| `bot.id`            | ID utilisateur du bot                               |
| `bot.username`      | Nom d'utilisateur du bot                            |
| `bot.guildcount`    | Nombre de serveurs où le bot est présent             |
| `bot.guildnames`    | Noms de tous les serveurs du bot                     |
| `bot.invite`        | Lien d'invitation du bot                            |
| `bot.ping`          | Latence du bot en millisecondes                     |
| `ping`              | Latence du bot en millisecondes (alias)             |
| `bot.uptime`        | Temps écoulé depuis le démarrage du bot             |
| `bot.shardid`       | ID du shard de cette instance du bot                |
| `bot.nodeversion`   | Version du runtime du bot                           |

### Catégorie Guild

| Variable              | Description                                       |
|-----------------------|---------------------------------------------------|
| `guild.id`            | ID du serveur                                     |
| `guild.name`          | Nom du serveur                                    |
| `guild.membercount`   | Nombre total de membres                           |
| `guild.count`         | Nombre total de membres (alias)                   |
| `guild.ownerid`       | ID du propriétaire du serveur                     |
| `guild.description`   | Description du serveur                            |
| `guild.icon`          | URL de l'icône du serveur                         |
| `guild.rolecount`     | Nombre de rôles dans le serveur                   |
| `guild.emojicount`    | Nombre d'emojis personnalisés                     |

### Catégorie Channel

| Variable            | Description                                        |
|---------------------|----------------------------------------------------|
| `channel.id`        | ID du salon                                        |
| `channel.name`      | Nom du salon                                       |
| `channel.topic`     | Sujet/description du salon                         |
| `channel.type`      | Type de salon (texte, vocal, etc.)                 |
| `channel.position`  | Position du salon dans la liste                    |
| `channel.nsfw`      | Si le salon est NSFW                               |
| `channel.slowmode`  | Délai du mode lent en secondes                     |
| `channel.mention`   | Tag de mention du salon                            |

### Catégorie Member

| Variable               | Description                                               |
|------------------------|-----------------------------------------------------------|
| `member.id`            | ID utilisateur du membre                                  |
| `member.displayname`   | Nom d'affichage (pseudo ou nom d'utilisateur)             |
| `member.nick`          | Pseudo du membre sur le serveur                           |
| `member.joinedat`      | Date d'arrivée du membre                                  |
| `member.roles`         | Liste des IDs de rôles du membre                          |
| `member.isadmin`       | Si le membre est administrateur                           |
| `member.isbooster`     | Si le membre est un booster du serveur                    |
| `member.permissions`   | Permissions calculées du membre                           |
| `member.mention`       | Tag de mention du membre                                  |
| `member.avatar`        | URL de l'avatar du membre                                 |

### Catégorie Message

| Variable                | Description                                      |
|-------------------------|--------------------------------------------------|
| `message.id`            | ID du message                                    |
| `message.content`       | Contenu texte complet du message                 |
| `message.mentions`      | Liste des IDs utilisateurs mentionnés            |
| `message.mention.count` | Nombre d'utilisateurs mentionnés                 |

### Catégorie Author

| Variable         | Description                              |
|------------------|------------------------------------------|
| `author.id`      | ID utilisateur de l'auteur               |
| `author.name`    | Nom d'utilisateur de l'auteur            |
| `author.isbot`   | Si l'auteur est un bot                   |
| `author.avatar`  | URL de l'avatar de l'auteur              |
| `author.mention` | Tag de mention de l'auteur               |

### Catégorie User

| Variable         | Description                              |
|------------------|------------------------------------------|
| `user.id`        | ID utilisateur                           |
| `user.name`      | Nom d'utilisateur                        |
| `user.username`  | Nom d'utilisateur (alias)                |
| `user.avatar`    | URL de l'avatar                          |
| `user.mention`   | Tag de mention                           |

### Catégorie Interaction

| Variable                    | Description                                                          |
|-----------------------------|----------------------------------------------------------------------|
| `interaction.isslash`       | Si déclenché par une commande slash                                  |
| `interaction.command.name`  | Nom de la commande slash                                             |
| `interaction.command.id`    | ID de la commande slash                                              |
| `interaction.locale`        | Locale de l'utilisateur (ex: fr, ja)                                 |
| `interaction.guild_locale`  | Locale du serveur (ex: en-US)                                        |
| `target.locale`             | Alias pour interaction.locale                                        |

### Catégorie Autocomplete

| Variable                  | Description                                       |
|---------------------------|---------------------------------------------------|
| `autocomplete.query`      | Texte de recherche actuel en autocomplétion        |
| `autocomplete.optionname` | Nom de l'option en cours d'autocomplétion          |

### Catégorie Execution

| Variable          | Description                                     |
|-------------------|-------------------------------------------------|
| `execution.time`  | Temps écoulé depuis le début de l'exécution      |

---

## 2. Inférence de catégorie (`inferCategory`)

La fonction `inferCategory(String name)` détermine la `VariableCategory` à partir du préfixe du nom de la variable. **L'ordre est critique** : les préfixes les plus spécifiques doivent être testés avant les plus généraux pour éviter les faux positifs.

### Algorithme

```
inferCategory(name)
  lower = name.toLowerCase()

  // 1. Sous-préfixes spécifiques (avant les préfixes généraux)
  IF lower.startsWith('channel.thread.') → channel
  IF lower.startsWith('interaction.')     → interaction
  IF lower.startsWith('autocomplete.')    → interaction
  IF lower.startsWith('opts.')            → interaction

  // 2. Préfixes d'entités principales
  IF lower.startsWith('guild.')           → guild
  IF lower.startsWith('channel.')         → channel
  IF lower.startsWith('member.')          → member
  IF lower.startsWith('author.')          → author
  IF lower.startsWith('user.')            → user
  IF lower.startsWith('bot.')             → bot
  IF lower.startsWith('message.')         → message
  IF lower.startsWith('temp.')            → temp

  // 3. Contexte / exécution
  IF lower.startsWith('workflow.')        → context_
  IF lower.startsWith('event.')           → context_
  IF lower.startsWith('execution.')       → context_

  // 4. IDs nus (bare IDs)
  IF lower == 'guildid' || 'guildname'    → guild
  IF lower == 'channelid' || 'channelname'→ channel
  IF lower == 'userid' || 'username'
     || 'usertag' || 'useravatar'
     || 'userbanner'                      → user
  IF lower == 'messageid'                 → message
  IF lower == 'timestamp' || 'actualtime' → context_

  // 5. Fonctions (contient une parenthèse)
  IF lower.contains('(')                  → function_

  // 6. Variables scopées globales
  IF lower.startsWith('global.')          → other
  IF lower.contains('.bc_')              → other

  // 7. Scopes génériques (guild.bc_*, user.bc_*, etc.)
  FOR scope IN [guild, user, channel, member, message]
    IF lower.startsWith('$scope.')        → other

  // 8. Préfixes spécifiques aux événements
  IF lower.startsWith('voice.')           → other
  IF lower.startsWith('presence.')        → other
  IF lower.startsWith('reaction.')        → other
  IF lower.startsWith('poll.')           → other
  IF lower.startsWith('role.')            → other
  IF lower.startsWith('thread.')          → other
  IF lower.startsWith('invite.')          → other
  IF lower.startsWith('auditlog.')        → other
  IF lower.startsWith('typing.')          → other

  // 9. Fallback
  RETURN other
```

### Points d'attention

- **`channel.thread.*` est testé avant `channel.*`** pour que les variables de thread de salon tombent dans `channel` et non dans `other`.
- **`interaction.` et `autocomplete.` sont testés avant `user.`** pour éviter que `interaction.user.*` ou `autocomplete.*` ne soient classés en `user`.
- **Les fonctions** sont détectées par la présence de `(` dans le nom (ex: `length(source)`, `randomint(1, 100)`).
- **Les IDs nus** (`guildId`, `channelId`, `userId`, etc.) sont reconnus comme des alias legacy et classés dans la catégorie de leur entité.
- **Les variables scopées** contenant `.bc_` (ex: `guild.bc_myVar`) tombent dans `other` — elles sont déjà capturées par l'étape 2 pour le préfixe d'entité, mais les formes génériques `scope.bc_key` sont couvertes par l'étape 7.

---

## 3. Suggestions Always-Available (`getAlwaysAvailableSuggestions`)

```dart
static List<VariableSuggestion> getAlwaysAvailableSuggestions({
  List<String> argumentNames = const [],
})
```

Ces suggestions sont toujours disponibles, quel que soit l'événement ou le contexte. Elles sont utilisées pour l'autocomplétion dans les expressions BDFD et les templates de workflows visuels.

### Workflow / Contexte

| Variable              | Kind        | Catégorie |
|-----------------------|-------------|-----------|
| `workflow.name`       | nonNumeric  | context_  |
| `workflow.entryPoint` | nonNumeric  | context_  |
| `workflow.args`       | nonNumeric  | context_  |

Si `argumentNames` est fourni, deux entrées supplémentaires sont générées **pour chaque nom d'argument** :

| Variable                | Kind    | Catégorie |
|-------------------------|---------|-----------|
| `arg.<name>`            | unknown | context_  |
| `workflow.arg.<name>`   | unknown | context_  |

### Bot

| Variable            | Kind       | Catégorie |
|---------------------|------------|-----------|
| `bot.id`            | numeric    | bot       |
| `bot.username`      | nonNumeric | bot       |
| `bot.guildCount`    | numeric    | bot       |
| `bot.guildNames`    | nonNumeric | bot       |
| `bot.invite`        | nonNumeric | bot       |
| `bot.ping`          | numeric    | bot       |
| `ping`              | numeric    | bot       |
| `bot.uptime`        | numeric    | bot       |
| `bot.shardId`       | numeric    | bot       |
| `bot.nodeVersion`   | nonNumeric | bot       |

### Autocomplete

| Variable                  | Kind       | Catégorie   |
|---------------------------|------------|-------------|
| `autocomplete.query`      | nonNumeric | interaction |
| `autocomplete.optionName` | nonNumeric | interaction |
| `autocomplete.optionType` | nonNumeric | interaction |

### Interaction — Locale

| Variable                    | Kind       | Catégorie   |
|-----------------------------|------------|-------------|
| `interaction.locale`        | nonNumeric | interaction |
| `interaction.guild_locale`  | nonNumeric | interaction |
| `target.locale`             | nonNumeric | interaction |

### Fonctions Built-in (Helpers)

| Variable                                        | Kind    | Catégorie  |
|-------------------------------------------------|---------|------------|
| `length(source)`                                | unknown | function_  |
| `at(source, 0)`                                 | unknown | function_  |
| `slice(source, 0, 10)`                          | unknown | function_  |
| `join(source, ", ")`                            | unknown | function_  |
| `formatEach(source, "{value}", ", ")`           | unknown | function_  |
| `embedFields(source, "{name}", "{value}", true)`| unknown | function_  |
| `coin()`                                        | unknown | function_  |
| `random()`                                      | unknown | function_  |
| `randomchoice("a", "b", "c")`                   | unknown | function_  |
| `randomint(1, 100)`                             | unknown | function_  |

---

## 4. Base hydratée (`getBaseHydratedSuggestions`)

```dart
static List<VariableSuggestion> getBaseHydratedSuggestions()
```

Ces suggestions représentent la base de contexte après hydratation des entités Discord. Elles sont disponibles pour tous les événements qui fournissent un contexte de guild, channel, member, user, author et message.

### Contexte brut

| Variable     | Kind       | Catégorie |
|-------------|------------|-----------|
| `event.name`| nonNumeric | context_  |
| `timestamp` | numeric    | context_  |
| `actualTime`| nonNumeric | context_  |
| `guildId`   | numeric    | guild     |
| `channelId` | numeric    | channel   |
| `userId`    | numeric    | user      |
| `messageId` | numeric    | message   |

### Guild (28 variables)

| Variable                         | Kind       |
|----------------------------------|------------|
| `guild.id`                       | numeric    |
| `guild.name`                     | nonNumeric |
| `guild.memberCount`              | numeric    |
| `guild.count`                    | numeric    |
| `guild.ownerId`                  | numeric    |
| `guild.preferredLocale`          | nonNumeric |
| `guild.description`              | nonNumeric |
| `guild.vanityUrlCode`            | nonNumeric |
| `guild.verificationLevel`        | nonNumeric |
| `guild.mfaLevel`                 | nonNumeric |
| `guild.nsfwLevel`                | nonNumeric |
| `guild.premiumTier`              | numeric    |
| `guild.premiumSubscriptionCount` | numeric    |
| `guild.features`                 | nonNumeric |
| `guild.features.count`           | numeric    |
| `guild.systemChannelId`          | numeric    |
| `guild.rulesChannelId`           | numeric    |
| `guild.afkChannelId`             | numeric    |
| `guild.afkTimeout`               | numeric    |
| `guild.icon`                     | nonNumeric |
| `guild.roleCount`                | numeric    |
| `guild.roleNames`                | nonNumeric |
| `guild.stickerCount`             | numeric    |
| `guild.emojiCount`               | numeric    |

### Channel (17 variables)

| Variable                              | Kind       |
|---------------------------------------|------------|
| `channel.id`                          | numeric    |
| `channel.name`                        | nonNumeric |
| `channel.type`                        | nonNumeric |
| `channel.typeValue`                   | numeric    |
| `channel.topic`                       | nonNumeric |
| `channel.parentId`                    | numeric    |
| `channel.categoryId`                  | numeric    |
| `channel.position`                    | numeric    |
| `channel.nsfw`                        | nonNumeric |
| `channel.slowmode`                    | numeric    |
| `channel.bitrate`                     | numeric    |
| `channel.userLimit`                   | numeric    |
| `channel.mention`                     | nonNumeric |
| `channel.thread.archived`             | nonNumeric |
| `channel.thread.locked`               | nonNumeric |
| `channel.thread.ownerId`              | numeric    |
| `channel.thread.autoArchiveDuration`  | numeric    |

### Member (14 variables)

| Variable                            | Kind       |
|-------------------------------------|------------|
| `member.id`                         | numeric    |
| `member.nick`                       | nonNumeric |
| `member.displayName`                | nonNumeric |
| `member.avatar`                     | nonNumeric |
| `member.joinedAt`                   | nonNumeric |
| `member.roles`                      | nonNumeric |
| `member.roles.count`                | numeric    |
| `member.isBooster`                  | nonNumeric |
| `member.premiumSince`               | nonNumeric |
| `member.communicationDisabledUntil` | nonNumeric |
| `member.isAdmin`                    | nonNumeric |
| `member.permissions`                | nonNumeric |
| `member.mention`                    | nonNumeric |

### User (10 variables)

| Variable           | Kind       |
|--------------------|------------|
| `user.id`          | numeric    |
| `user.username`    | nonNumeric |
| `user.globalName`  | nonNumeric |
| `user.displayName` | nonNumeric |
| `user.tag`         | nonNumeric |
| `user.avatar`      | nonNumeric |
| `user.banner`      | nonNumeric |
| `user.createdAt`   | nonNumeric |
| `user.bannerColor` | nonNumeric |
| `user.mention`     | nonNumeric |

### Author (9 variables)

| Variable            | Kind       |
|---------------------|------------|
| `author.id`         | numeric    |
| `author.username`   | nonNumeric |
| `author.globalName` | nonNumeric |
| `author.tag`        | nonNumeric |
| `author.avatar`     | nonNumeric |
| `author.banner`     | nonNumeric |
| `author.displayName`| nonNumeric |
| `author.isBot`      | nonNumeric |
| `author.mention`    | nonNumeric |

### Message (26 variables)

| Variable                       | Kind       |
|--------------------------------|------------|
| `message.id`                   | numeric    |
| `message.content`              | nonNumeric |
| `message.content[0]`           | nonNumeric |
| `message.content[1]`           | nonNumeric |
| `message.word.count`           | numeric    |
| `message.isBot`                | nonNumeric |
| `message.isDM`                 | nonNumeric |
| `message.isSystem`             | nonNumeric |
| `message.type`                 | numeric    |
| `message.channelId`            | numeric    |
| `message.timestamp`            | numeric    |
| `message.editedTimestamp`      | numeric    |
| `message.isEdited`             | nonNumeric |
| `message.isPinned`             | nonNumeric |
| `message.attachments`          | nonNumeric |
| `message.attachments.count`    | numeric    |
| `message.embeds.count`         | numeric    |
| `message.mentions`             | nonNumeric |
| `message.mentions[0]`          | numeric    |
| `message.mention.count`        | numeric    |
| `message.roleMentions`         | nonNumeric |
| `message.roleMentions.count`   | numeric    |
| `message.mentionsEveryone`     | nonNumeric |
| `message.referencedMessage.id` | numeric    |
| `message.url`                  | nonNumeric |

---

## 5. Suggestions par événement (`getSuggestionsForEvent`)

```dart
static List<VariableSuggestion> getSuggestionsForEvent(String eventName)
```

Retourne les suggestions spécifiques à un événement Discord Gateway. Chaque événement expose les variables générées par sa fonction `build*EventContext` correspondante.

### 5.1 Événements Message (`messageCreate`, `messageUpdate`, `messageDelete`)

**Condition** : `eventName.startsWith('message')` sauf `messageReaction*`, `messagePoll*`, `messageBulk*`.

**Runtime** : `_messageContentExtra` → `_messageExtra` + `_userExtra` + `_memberExtra`

#### Message (25 variables)

`message.id`, `message.content`, `message.content[0]`, `message.content[1]`, `message.content[2]`, `message.word.count`, `message.isBot`, `message.isDM`, `message.isSystem`, `message.type`, `message.channelId`, `message.timestamp`, `message.editedTimestamp`, `message.isEdited`, `message.isPinned`, `message.attachments`, `message.attachments.count`, `message.embeds.count`, `message.mentions`, `message.mentions[0]`, `message.mention.count`, `message.roleMentions`, `message.roleMentions.count`, `message.mentionsEveryone`, `message.referencedMessage.id`, `message.url`

#### Author (8 variables)

`author.id`, `author.username`, `author.globalName`, `author.tag`, `author.avatar`, `author.banner`, `author.displayName`, `author.isBot`

#### User (9 variables)

`user.id`, `user.username`, `user.globalName`, `user.displayName`, `user.tag`, `user.avatar`, `user.banner`, `user.createdAt`, `user.bannerColor`

#### Interaction aliases (4 variables)

`interaction.user.id`, `interaction.user.username`, `interaction.user.tag`, `interaction.user.avatar`

#### Legacy bare aliases (3 variables)

`userId`, `userName`, `userAvatar`

#### Member (11 variables)

`member.id`, `member.nick`, `member.displayName`, `member.avatar`, `member.joinedAt`, `member.roles`, `member.roles.count`, `member.isBooster`, `member.isAdmin`, `member.communicationDisabledUntil`, `member.permissions`

#### Update-specific (`messageUpdate` uniquement)

| Variable             | Kind       | Catégorie |
|----------------------|------------|-----------|
| `message.oldContent` | nonNumeric | message   |

---

### 5.2 Événements Guild Member (`guildMemberAdd`, `guildMemberRemove`, `guildMemberUpdate`)

**Runtime** : `_memberExtra(member)` + `_userExtra(user, enrichAuthor: true)`

#### Member (13 variables)

`member.id`, `member.name`, `member.username`, `member.tag`, `member.nick`, `member.displayName`, `member.avatar`, `member.joinedAt`, `member.roles`, `member.roles.count`, `member.isBooster`, `member.isAdmin`, `member.communicationDisabledUntil`

#### User (9 variables)

`user.id`, `user.username`, `user.globalName`, `user.displayName`, `user.tag`, `user.avatar`, `user.banner`, `user.createdAt`, `user.bannerColor`

#### Author aliases (7 variables)

`author.id`, `author.username`, `author.globalName`, `author.tag`, `author.avatar`, `author.banner`, `author.displayName`

#### Update-specific (`guildMemberUpdate` uniquement)

| Variable                  | Kind       | Catégorie |
|---------------------------|------------|-----------|
| `member.old.nick`         | nonNumeric | member    |
| `member.old.roles`        | nonNumeric | member    |
| `member.old.displayName`  | nonNumeric | member    |

---

### 5.3 Événements Channel (`channelCreate`, `channelDelete`, `channelUpdate`)

**Condition** : `eventName.startsWith('channel')` sauf `channelPins*`.

**Runtime** : `_channelExtra(channel)`

| Variable     | Kind       | Catégorie |
|-------------|------------|-----------|
| `channel.id` | numeric    | channel   |
| `channel.name` | nonNumeric | channel |
| `channel.type` | nonNumeric | channel |

#### Update-specific (`channelUpdate` uniquement)

| Variable            | Kind       | Catégorie |
|---------------------|------------|-----------|
| `channel.old.name`  | nonNumeric | channel   |
| `channel.old.type`  | nonNumeric | channel   |

---

### 5.4 Événements Guild (`guildCreate`, `guildDelete`, `guildUpdate`)

**Condition** : `eventName.startsWith('guild')` sauf `guildMember*`, `guildRole*`, `guildAudit*`.

**Runtime** : `_guildExtra`

| Variable                 | Kind       | Catégorie |
|--------------------------|------------|-----------|
| `guild.id`               | numeric    | guild     |
| `guild.name`             | nonNumeric | guild     |
| `guild.memberCount`      | numeric    | guild     |
| `guild.systemChannelId`  | numeric    | guild     |
| `guild.ownerId`          | numeric    | guild     |
| `guild.preferredLocale`  | nonNumeric | guild     |

#### `guildDelete` uniquement

| Variable           | Kind       | Catégorie |
|-------------------|------------|-----------|
| `guild.unavailable`| nonNumeric | guild     |

#### `guildUpdate` uniquement

| Variable               | Kind       | Catégorie |
|------------------------|------------|-----------|
| `guild.oldGuild.name`   | nonNumeric | guild     |
| `guild.oldGuild.ownerId`| numeric    | guild     |

---

### 5.5 Événements Voice (`voiceStateUpdate`, `voiceServerUpdate`, `voiceChannelEffectSend`)

#### `voiceStateUpdate`

**Runtime** : custom extra

| Variable                 | Kind       | Catégorie |
|--------------------------|------------|-----------|
| `voice.channel.id`       | numeric    | other     |
| `voice.user.id`          | numeric    | other     |
| `voice.state.sessionId`  | nonNumeric | other     |
| `voice.selfMute`         | nonNumeric | other     |
| `voice.selfDeafen`       | nonNumeric | other     |
| `voice.mute`             | nonNumeric | other     |
| `voice.deafen`           | nonNumeric | other     |

#### `voiceServerUpdate`

| Variable                | Kind       | Catégorie |
|-------------------------|------------|-----------|
| `voice.server.token`    | nonNumeric | other     |
| `voice.server.endpoint` | nonNumeric | other     |

#### `voiceChannelEffectSend`

| Variable               | Kind       | Catégorie |
|------------------------|------------|-----------|
| `voice.effect.emoji`   | nonNumeric | other     |
| `voice.effect.soundId` | numeric    | other     |

---

### 5.6 Événements Role (`guildRoleCreate`, `guildRoleDelete`, `guildRoleUpdate`)

**Runtime** : `_roleExtra`

| Variable           | Kind       | Catégorie |
|--------------------|------------|-----------|
| `role.id`          | numeric    | other     |
| `role.name`        | nonNumeric | other     |
| `role.color`       | nonNumeric | other     |
| `role.permissions` | nonNumeric | other     |
| `role.position`    | numeric    | other     |
| `role.mentionable` | nonNumeric | other     |
| `role.hoist`       | nonNumeric | other     |

---

### 5.7 Événements Reaction (`messageReactionAdd`, `messageReactionRemove`, etc.)

**Runtime** : `_reactionEmojiExtra`

| Variable                | Kind       | Catégorie |
|-------------------------|------------|-----------|
| `message.id`            | numeric    | message   |
| `reaction.emoji.name`   | nonNumeric | other     |
| `reaction.emoji.id`     | numeric    | other     |
| `reaction.emoji.animated`| nonNumeric | other    |
| `user.id`               | numeric    | user      |

---

### 5.8 Événements Poll Vote (`messagePollVoteAdd`, `messagePollVoteRemove`)

**Runtime** : `_pollVoteExtra`

| Variable              | Kind       | Catégorie |
|-----------------------|------------|-----------|
| `message.id`          | numeric    | message   |
| `poll.answer.id`      | nonNumeric | other     |
| `poll.question`       | nonNumeric | other     |
| `poll.vote.userId`    | numeric    | other     |
| `poll.vote.channelId` | numeric    | other     |
| `poll.vote.guildId`   | numeric    | other     |

---

### 5.9 Événements Invite (`inviteCreate`, `inviteDelete`)

**Runtime** : `_inviteExtra`

| Variable            | Kind       | Catégorie |
|---------------------|------------|-----------|
| `invite.code`       | nonNumeric | other     |
| `invite.channelId`  | numeric    | other     |
| `invite.inviterId`  | numeric    | other     |
| `invite.createdAt`  | nonNumeric | other     |
| `invite.maxAge`     | numeric    | other     |
| `invite.maxUses`    | numeric    | other     |
| `invite.isTemporary`| nonNumeric  | other     |
| `invite.uses`       | numeric    | other     |

---

### 5.10 Événement Presence (`presenceUpdate`)

**Runtime** : custom extra avec `presence.*`, `user.*`

| Variable                      | Kind       | Catégorie |
|-------------------------------|------------|-----------|
| `presence.status`             | nonNumeric | other     |
| `presence.activity.count`     | numeric    | other     |
| `presence.activity[0].name`   | nonNumeric | other     |
| `presence.activity[0].type`   | nonNumeric | other     |
| `presence.activity[0].typeName`| nonNumeric | other    |
| `presence.activity[0].details`| nonNumeric | other     |
| `presence.activity[0].state`  | nonNumeric | other     |
| `presence.activity[0].url`    | nonNumeric | other     |
| `user.id`                     | numeric    | user      |
| `user.username`               | nonNumeric | user      |
| `user.tag`                    | nonNumeric | user      |
| `user.avatar`                 | nonNumeric | user      |
| `user.banner`                 | nonNumeric | user      |

---

### 5.11 Événements Thread (`threadCreate`, `threadDelete`, `threadUpdate`, `threadMemberUpdate`, `threadMembersUpdate`)

**Runtime** : `_threadExtra`

| Variable                     | Kind       | Catégorie |
|------------------------------|------------|-----------|
| `thread.id`                  | numeric    | other     |
| `thread.name`                | nonNumeric | other     |
| `thread.parent.id`           | numeric    | other     |
| `thread.owner.id`            | numeric    | other     |
| `thread.archived`            | nonNumeric | other     |
| `thread.locked`              | nonNumeric | other     |
| `thread.autoArchiveDuration` | numeric    | other     |

---

### 5.12 Événement Typing (`typingStart`)

**Runtime** : custom extra

| Variable              | Kind       | Catégorie |
|-----------------------|------------|-----------|
| `typing.timestamp`    | nonNumeric | other     |
| `typing.member.id`    | numeric    | other     |
| `typing.member.name`  | nonNumeric | other     |
| `user.id`             | numeric    | user      |

---

### 5.13 Événement User Update (`userUpdate`)

**Runtime** : custom extra avec `user.*`

| Variable           | Kind       | Catégorie |
|--------------------|------------|-----------|
| `user.id`          | numeric    | user      |
| `user.username`    | nonNumeric | user      |
| `user.avatar`      | nonNumeric | user      |
| `user.banner`      | nonNumeric | user      |
| `user.accentColor` | nonNumeric | user      |

---

### 5.14 Événement Channel Pins Update (`channelPinsUpdate`)

| Variable                  | Kind       | Catégorie |
|---------------------------|------------|-----------|
| `channel.lastPinTimestamp`| nonNumeric | channel   |

---

### 5.15 Événement Guild Audit Log (`guildAuditLogCreate`)

| Variable               | Kind       | Catégorie |
|------------------------|------------|-----------|
| `auditLog.action`      | nonNumeric | other     |
| `auditLog.executorId`  | numeric    | other     |
| `auditLog.targetId`    | numeric    | other     |

---

## Résumé

Le `VariableCatalog` centralise la connaissance de toutes les variables du système :

- **`_descriptions`** : 88 entrées de descriptions human-readable, accessibles via `variableDescription(name)`.
- **`inferCategory(name)`** : algorithme en 9 étapes pour déterminer la catégorie d'une variable à partir de son nom.
- **`getAlwaysAvailableSuggestions(argumentNames)`** : 33+ suggestions permanentes (contexte, bot, autocomplete, interaction locale, fonctions built-in), extensibles avec les arguments de workflow.
- **`getBaseHydratedSuggestions()`** : 110 suggestions couvrant le contexte de base et 6 entités hydratées (Guild: 28, Channel: 17, Member: 14, User: 10, Author: 9, Message: 26).
- **`getSuggestionsForEvent(eventName)`** : suggestions spécifiques pour 15 familles d'événements Discord Gateway, reflétant exactement les variables générées par chaque fonction `build*EventContext`.
