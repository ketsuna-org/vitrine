---
layout: doc
title: "Système — Global Utils"
translation_key: docs
category: systems
description: >
  Documentation du module d'utilitaires globaux pour le runtime BDFD.
  Constantes, fonctions de cache, extracteurs de variables runtime (bot, membre, permissions, channel, guild),
  helpers d'URL d'avatar/bannière/icône, et générateur de key-values pour les interactions.
---

# Système — Global Utils

Le module **Global Utils** est la boîte à outils centrale du runtime BDFD, fournissant les constantes, caches, extracteurs de variables et helpers nécessaires à l'exécution des commandes et événements. Il est implémenté dans `packages/shared/lib/utils/global.dart` (1324 lignes).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────────┐
│                      MODULE GLOBAL UTILS                              │
│                                                                       │
│  Constantes & Caches                                                   │
│  ├─ discordUrl = "https://discord.com/api/v10"                        │
│  ├─ botStartTimes : Map<String, DateTime>                             │
│  └─ guildMemberCounts : Map<Snowflake, int>                           │
│                                                                       │
│  Helpers de conversion                                                 │
│  ├─ _asSnowflake(value) → Snowflake?                                  │
│  └─ getChannelName(channel) → String                                  │
│                                                                       │
│  Fonctions de cache & fetch                                            │
│  ├─ getGuildMemberCount(guild, client?, guildId?)                     │
│  ├─ _fetchUserCached(client, userId)                                  │
│  ├─ _fetchMemberCached(interaction, guildId, userId)                  │
│  ├─ fetchGuildCached(client, guildId)                                 │
│  └─ fetchChannelCached(client, channelId)                             │
│                                                                       │
│  Extracteurs de variables runtime                                      │
│  ├─ extractBotRuntimeDetails(client)                                  │
│  ├─ extractMemberRuntimeDetails(member, guild, guildId)               │
│  ├─ extractPermissionsByIdRuntimeDetails(userId, memberDetails)       │
│  ├─ extractChannelRuntimeDetails(channel)                             │
│  ├─ extractGuildRuntimeDetails(guild, client?, guildId?)              │
│  └─ generateKeyValues(interaction)                                    │
│                                                                       │
│  Helpers d'URL                                                         │
│  ├─ makeAvatarUrl(userId, avatarId?, isAnimated?, ...)                │
│  ├─ makeBannerUrl(userId, bannerId?, isAnimated?, ...)                │
│  └─ makeGuildIcon(guildId, iconId?)                                   │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Constantes et caches globaux

### `discordUrl`

URL de base de l'API Discord v10.

```dart
const String discordUrl = "https://discord.com/api/v10";
```

### `botStartTimes`

Map associant l'ID du bot (String) à son timestamp de démarrage. Alimenté au lancement de chaque session bot.

```dart
final Map<String, DateTime> botStartTimes = {};
```

### `guildMemberCounts`

Cache en mémoire des comptes de membres par serveur. Alimenté automatiquement par `getGuildMemberCount`.

```dart
final Map<Snowflake, int> guildMemberCounts = {};
```

---

## Helpers de conversion

### `_asSnowflake(value)`

Convertit une valeur de type `Snowflake`, `int` ou `String` en `Snowflake`. Retourne `null` si la conversion échoue.

```dart
Snowflake? _asSnowflake(dynamic value)
```

| Entrée      | Comportement                                |
|-------------|---------------------------------------------|
| `null`      | Retourne `null`                             |
| `Snowflake` | Retourne tel quel                           |
| `int`       | Wrappe dans `Snowflake(int)`                |
| `String`    | Parse avec `int.tryParse`, wrappe si réussi |
| Autre       | Retourne `null`                             |

### `getChannelName(channel)`

Retourne le nom d'un canal selon son type :

| Type de canal          | Valeur retournée    |
|------------------------|---------------------|
| `GuildTextChannel`     | `channel.name`      |
| `GuildVoiceChannel`    | `channel.name`      |
| `ThreadsOnlyChannel`   | `channel.name`      |
| `GuildStageChannel`    | `channel.name`      |
| `DmChannel`            | `"DM"`              |
| Autre / `null`         | `"Unknown Channel"` |

---

## Fonctions de cache et fetch

### `getGuildMemberCount(guild, {client, guildId})`

Récupère le nombre de membres d'un serveur avec une cascade de fallbacks :

1. **Objet Guild** → `guild.approximateMemberCount`
2. **Objet dynamique** → `dynGuild.memberCount` (standard bot) ou `dynGuild.approximateMemberCount` (si `with_counts=true`)
3. **Cache mémoire** → `guildMemberCounts[resolvedGuildId]`
4. **API via NyxxRest** → `client.guilds.fetch(guildId, withCounts: true)` puis `approximateMemberCount`
5. **Fallback** → `0`

Chaque niveau alimente automatiquement le cache `guildMemberCounts`.

### `_fetchUserCached(client, userId)`

Fetch un utilisateur Discord depuis le cache nyxx (`client.users.get`). Retourne `null` en cas d'échec.

### `_fetchMemberCached(interaction, guildId, userId)`

Fetch un membre depuis le cache nyxx via la guilde (`guild.members.get`). Passe par `fetchGuildCached` pour obtenir la guilde. Retourne `null` en cas d'échec.

### `fetchGuildCached(client, guildId)`

Récupère une guilde avec fallback cache → API :

1. `client.guilds.get(guildId)` — cache nyxx
2. Si le résultat est un `Guild` complet → retour immédiat
3. Sinon → `client.guilds.fetch(guildId)` — appel API

### `fetchChannelCached(client, channelId)`

Fetch un canal via `client.channels.get(channelId)`. Retourne `null` en cas d'échec.

### `getDiscordUser(botToken)`

Crée une connexion REST nyxx temporaire avec le token fourni pour récupérer l'utilisateur du bot (`client.user.fetch()`). Utile pour valider un token ou obtenir les informations du bot sans session gateway.

---

## Extracteurs de variables runtime

### `extractBotRuntimeDetails(client)`

Extrait 8 à 10 variables relatives au bot dans une `Map<String, String>` :

| Clé                 | Source                                            | Fallback |
|---------------------|---------------------------------------------------|----------|
| `bot.id`            | `client.user.id`                                  | —        |
| `bot.guildCount`    | `client.guilds.cache.length`                      | —        |
| `bot.guildNames`    | `guildCache.values.map(name).join(', ')`          | —        |
| `bot.invite`        | URL d'invitation construite avec `botUserId`      | —        |
| `bot.ping` / `ping` | `client.gateway.latency.inMilliseconds` (si NyxxGateway) | `'0'` |
| `bot.uptime`        | `DateTime.now().difference(botStartTimes[id])`     | `'0'`    |
| `bot.uptimeMs`      | Idem (identiques, pour compatibilité)             | `'0'`    |
| `bot.shardId`       | `'0'` (single-shard)                              | `'0'`    |
| `bot.nodeVersion`   | Version Dart extraite de `Platform.version`       | `'Dart'` |
| `bot.username`      | `client.users.cache[botUserId].username`           | absent   |

### `extractMemberRuntimeDetails({member, guild, guildId})`

Calcule les permissions, rôles et métadonnées d'un membre de guilde. Logique :

1. **Récupération des roleIds** depuis `member.roleIds` (convertit chaque entrée avec `_asSnowflake`)
2. **Permissions de base** : `member.permissions` (depuis le payload d'interaction Discord)
3. **Permissions des rôles** : itère `guild.roleList`, pour chaque rôle du membre, combine les bits de permission avec OU binaire (`mask |= rolePerms`)
4. **Détection du propriétaire** : si `member.id == guild.ownerId`, applique TOUS les flags de permission (via `_permissionTokenFlags`)
5. **Highest role** : suit le rôle ayant la position la plus élevée (ignore `@everyone`)

Variables produites :

| Clé                                     | Description                                         |
|-----------------------------------------|-----------------------------------------------------|
| `member.isAdmin`                        | `'true'` si permission `administrator`              |
| `member.permissions`                    | Liste des tokens de permission (séparés par `,`)    |
| `interaction.member.isAdmin`            | Alias de `member.isAdmin` (compatibilité BDFD)      |
| `interaction.member.permissions`        | Alias de `member.permissions`                       |
| `member.roles`                          | Liste des IDs de rôles (séparés par `,`)            |
| `member.highestRole`                    | ID du rôle le plus élevé (si trouvé)                |
| `member.joinedAt`                       | Date d'arrivée au format ISO 8601                   |
| `member.isBooster`                      | `'true'` / `'false'` selon `premiumSince`           |
| `member.premiumSince`                   | Date de boost au format ISO 8601                    |
| `member.communicationDisabledUntil`     | Date de timeout au format ISO 8601                  |

### `extractPermissionsByIdRuntimeDetails({userId, memberDetails})`

Injecte les permissions pour un utilisateur spécifique dans le format `byId` :

| Clé                              | Source                                   |
|----------------------------------|------------------------------------------|
| `permissions.byId.<userId>`      | `memberDetails['member.permissions']`    |
| `isAdmin.byId.<userId>`          | `memberDetails['member.isAdmin']`        |

### `_permissionTokenFlags`

Liste de 40 flags de permission mappés (`MapEntry<Flag<Permissions>, String>`) couvrant toutes les permissions Discord (de `addReactions` à `viewGuildInsights`). Utilisée par `extractMemberRuntimeDetails` pour produire la liste textuelle des permissions et pour la détection du propriétaire de guilde.

### `extractChannelRuntimeDetails(channel)`

Extrait les métadonnées d'un canal dans une `Map<String, String>`. Utilise un helper `trySet` qui capture silencieusement les propriétés indisponibles (selon le type de canal).

Variables extraites (si disponibles) :

| Clé                               | Source                        |
|-----------------------------------|-------------------------------|
| `channel.kind`                    | `channel.runtimeType`         |
| `channel.id`                      | `_asSnowflake(channel.id)`    |
| `channel.topic`                   | `channel.topic`               |
| `channel.parentId`                | `_asSnowflake(channel.parentId)` |
| `channel.position`                | `channel.position`            |
| `channel.nsfw`                    | `channel.isNsfw`              |
| `channel.slowmode`                | `channel.rateLimitPerUser`    |
| `channel.bitrate`                 | `channel.bitrate`             |
| `channel.userLimit`               | `channel.userLimit`           |
| `channel.categoryId`              | `_asSnowflake(channel.parentId)` |
| `channel.thread.archived`         | `channel.isArchived`          |
| `channel.thread.locked`           | `channel.isLocked`            |
| `channel.thread.ownerId`          | `_asSnowflake(channel.ownerId)` |
| `channel.thread.autoArchiveDuration` | `channel.autoArchiveDuration` |
| `channel.mention`                 | `<#channelId>` (si PartialChannel) |
| `channel.typeValue`               | `channel.type.value`          |

### `extractGuildRuntimeDetails(guild, {client, guildId})`

Extrait les métadonnées d'un serveur. Même pattern `trySet`. Inclut en plus :

- `guild.features` : liste des features (join avec `,`)
- `guild.features.count` : nombre de features
- `guild.memberCount` / `guild.count` : via `getGuildMemberCount`
- `guild.roleCount` / `guild.roleNames` : via `guild.roleList`
- `guild.stickerCount` : via `guild.stickerList`
- `guild.emojiCount` : via `guild.emojiList`

Retire les paires clé/valeur vides en fin de traitement.

### `generateKeyValues(interaction)`

Point d'entrée principal pour l'hydratation des variables d'une interaction de commande. Exécute en parallèle :

1. `fetchGuildCached`
2. `fetchChannelCached`
3. `_fetchMemberCached`

Puis agrège les résultats dans une `Map<String, String>` contenant ~80+ variables couvrant :

- **Timestamps** : `timestamp`, `actualTime`
- **Utilisateur** : `userName`, `userId`, `userUsername`, `userTag`, `userAvatar`, `userBanner`, `user.id`, `user.username`, `user.tag`, `user.avatar`, `user.banner`, `user.mention`, `user.displayName`
- **Auteur** : `author.id`, `author.username`, `author.tag`, `author.avatar`, `author.banner`, `author.displayName`, `author.mention`
- **Membre** : `member.id`, `member.nick`, `member.avatar`, `member.displayName`, `member.mention`
- **Interaction** : `interaction.member.*`, `interaction.user.*`, `interaction.guild.*`, `interaction.channel.*`, `interaction.locale`, `interaction.guild_locale`
- **Guilde** : `guildName`, `guild.name`, `guildId`, `guild.id`, `guildIcon`, `guildCount`, `guild.count`
- **Canal** : `channelName`, `channel.name`, `channelType`, `channel.type`, `channel.mention`, `channelId`, `channel.id`
- **Commande** : `commandName`, `commandId`, `commandType`, `commandTypeValue`, `command.type`, `interaction.command.type`
- **Locale** : `interaction.locale`, `interaction.guild_locale`, `target.locale`
- **Options** : préfixées `opts.`, `arg.`, `workflow.arg.` (avec qualification hiérarchique pour sous-commandes et groupes)
- **Cible** : `target.*` (user/member/message selon le type de commande)
- **Contexte** : `target.id`, `interaction.target.id`

Gère les commandes de type `ApplicationCommandType.user` (résolution du membre cible avec fetch fallback) et `ApplicationCommandType.message` (fetch du message complet si PartialMessage).

### `generateKeyValuesFromInteractionOption(value, interaction)`

Résout une option d'interaction individuelle en paires clé/valeur. Switch sur `value.type` :

| Type                   | Comportement                                               |
|------------------------|------------------------------------------------------------|
| `string`               | `{name: value}`                                            |
| `integer`              | `{name: value.toString()}`                                 |
| `boolean`              | `{name: value.toString()}`                                 |
| `number`               | `{name: value.toString()}`                                 |
| `user`                 | Fetch user + member, injecte `{name}.id`, `{name}.username`, `{name}.tag`, `{name}.avatar`, `{name}.banner`, `{name}.permissions`, `{name}.isAdmin` |
| `channel`              | Fetch channel, injecte `{name}`, `{name}.id`, `{name}.type` |
| `role`                 | Fetch role, injecte `{name}`, `{name}.id`                   |
| `mentionable`          | Fetch user, injecte `{name}.id`, `{name}.username`, `{name}.tag`, `{name}.avatar`, `{name}.banner` |

### `generateInteractionContextKeyValues(interaction)`

Version allégée de `generateKeyValues` pour les interactions hors commande (composants, modals). Extrait les mêmes catégories de variables mais sans les options de commande. Inclut `interaction.guildId`, `interaction.channelId`, `interaction.messageId`, `interaction.userId`.

### `findFocusedOption(options)`

Délégation vers `findFocusedInteractionOption(options)` (défini dans `command_autocomplete.dart`). Retourne l'option actuellement focusée pour l'autocomplétion.

---

## Helpers d'URL

### `makeAvatarUrl(userId, {avatarId, isAnimated, legacyFormat, discriminator})`

Construit l'URL d'avatar Discord avec logique de fallback :

1. **Avatar personnalisé** : si `avatarId` est présent et non vide / non `"0"` → `https://cdn.discordapp.com/avatars/{userId}/{avatarId}.{format}?size=1024`
2. **Avatar par défaut (legacy)** : si `discriminator` est fourni et ≠ `"0"` / `"0000"` → `https://cdn.discordapp.com/embed/avatars/{discriminator % 5}.png`
3. **Avatar par défaut (moderne)** : fallback → `https://cdn.discordapp.com/embed/avatars/{(userId >> 22) % 6}.png`

| Paramètre        | Défaut    | Description                                  |
|------------------|-----------|----------------------------------------------|
| `userId`         | *(requis)*| ID de l'utilisateur Discord                  |
| `avatarId`       | `null`    | Hash de l'avatar                             |
| `isAnimated`     | `false`   | Indique si l'avatar est animé (gif)          |
| `legacyFormat`   | `"webp"`  | Format d'image (`webp`, `png`, `gif`, `jpg`) |
| `discriminator`  | `null`    | Discriminateur legacy (ex: `"1234"`)         |

### `makeBannerUrl(userId, {bannerId, isAnimated, legacyFormat})`

Construit l'URL de bannière utilisateur :

1. Si `bannerId` est absent / vide / `"0"` → chaîne vide
2. Si `isAnimated` et `legacyFormat == 'gif'` → `https://cdn.discordapp.com/banners/{userId}/{bannerId}.gif?size=1024`
3. Sinon → `https://cdn.discordapp.com/banners/{userId}/{bannerId}.{format}?size=1024`

### `makeGuildIcon(guildId, iconId)`

Construit l'URL d'icône de serveur :

1. Si `guildId == "DM"` ou `iconId` absent/vide → fallback `https://cdn.discordapp.com/embed/avatars/0.png`
2. Sinon → `https://cdn.discordapp.com/icons/{guildId}/{iconId}.webp?size=1024`

---

## Graphe de dépendances

```
generateKeyValues
├── fetchGuildCached          → client.guilds.get / fetch
├── fetchChannelCached        → client.channels.get
├── _fetchMemberCached        → fetchGuildCached + guild.members.get
│   └── fetchGuildCached
├── getGuildMemberCount       → cascade cache/API
├── extractMemberRuntimeDetails
│   ├── _asSnowflake (roleIds, memberId, ownerId)
│   ├── member.permissions (payload interaction)
│   ├── guild.roleList → permissions des rôles
│   ├── ownerId → tous les flags (_permissionTokenFlags)
│   ├── _permissionTokensFromPermissions
│   ├── highestRole (position tracking)
│   ├── joinedAt, premiumSince, communicationDisabledUntil
├── extractPermissionsByIdRuntimeDetails
├── extractBotRuntimeDetails
│   ├── botStartTimes
│   ├── client.gateway.latency (si NyxxGateway)
│   └── Platform.version → Dart version
├── extractChannelRuntimeDetails → trySet(pattern)
├── extractGuildRuntimeDetails → getGuildMemberCount + trySet(pattern)
├── generateKeyValuesFromInteractionOption (× N options)
│   ├── _fetchUserCached
│   ├── _fetchMemberCached
│   ├── fetchGuildCached
│   └── fetchChannelCached
├── getChannelName
├── makeAvatarUrl / makeBannerUrl / makeGuildIcon
└── findFocusedOption → findFocusedInteractionOption
```
