---
layout: doc
title: "Engine — DiscordEntityFetcher"
translation_key: docs
category: engine
description: >
  Documentation de la classe statique DiscordEntityFetcher, responsable de l'hydratation
  des entités Discord (users, members, channels, guilds, roles, messages, emojis)
  dans les variables d'exécution BDFD. Couvre le cache de session, la déduplication
  des requêtes en vol, et les variables peuplées pour chaque scope.
---

# Engine — DiscordEntityFetcher

La classe `DiscordEntityFetcher` est une classe statique située dans `packages/shared/lib/engine/discord_entity_fetcher.dart` (519 lignes). Elle est responsable de l'hydratation des entités Discord dans les variables d'exécution (runtime variables). Chaque fois qu'un script BDFD référence une entité (via `$username`, `$channelName`, `$guildName`, etc.), cette classe est appelée pour résoudre l'entité et peupler le dictionnaire de variables avec les champs appropriés.

## Vue d'ensemble

```
┌─────────────────────────────────────────────────────────────┐
│                  DiscordEntityFetcher                        │
│                                                              │
│  hydrateEntity(gateway, scope, contextId, variables, cache) │
│       │                                                      │
│       ├─ 1. Parse le snowflake depuis contextId             │
│       ├─ 2. Vérifie le cache de session (flightKey)         │
│       ├─ 3. Déduplication via _inFlight                     │
│       ├─ 4. Switch sur le scope → fetch + populate          │
│       ├─ 5. Stocke dans le cache pour les appels futurs     │
│       └─ 6. Nettoie _inFlight dans le finally               │
└─────────────────────────────────────────────────────────────┘
```

## Mécanismes clés

### Cache de session

Un cache optionnel (`Map<String, dynamic>? cache`) peut être passé à `hydrateEntity`. Avant toute requête réseau, la méthode vérifie si la clé `scope:contextId` (appelée `flightKey`) existe déjà dans ce cache. Si c'est le cas, les variables sont peuplées directement depuis l'entité en cache, sans nouvelle requête réseau.

Le cache stocke l'objet natif nyxx (`User`, `Member`, `Channel`, `Guild`, `Role`, `Message`, `Emoji`) et le type est déterminé dynamiquement au moment de la relecture pour appeler la bonne méthode de population.

### Déduplication des requêtes en vol

Une `Map` statique `_inFlight<String, Future<void>>` empêche les requêtes réseau redondantes pour la même entité. Si une requête avec la même `flightKey` est déjà en cours, les appels suivants attendent simplement la complétion de cette `Future` plutôt que de lancer une nouvelle requête. Une fois la requête originale terminée, les variables sont déjà peuplées pour tous les appelants.

```dart
static final Map<String, Future<void>> _inFlight = {};
```

Le nettoyage de `_inFlight` est garanti par un bloc `finally`, même en cas d'erreur.

### Résolution des identifiants

La méthode `_resolveGuildId` cherche l'ID du serveur dans les variables d'exécution, en essayant successivement :
- `guild.id`
- `interaction.guildId`
- `guildId`

La méthode `_resolveChannelId` fait de même avec :
- `channel.id`
- `interaction.channelId`
- `channelId`

### Format des clés de variables

Toutes les variables sont stockées dans le dictionnaire avec le format :

```
scope[contextId].field
```

Exemples :
- `user[123456789].username`
- `guild[987654321].name`
- `member[111222333].highestRole`
- `message[444555666].content`
- `role[777888999].color`
- `getMessage[chanId;msgId].author`
- `getReactions[chanId;msgId;emoji]` → count

## Scopes supportés

### `user`

Fetch un utilisateur Discord par son ID.

| Variable | Description |
|---|---|
| `user[id].username` | Nom d'utilisateur |
| `user[id].tag` | Discriminateur (ex: `1234`) |
| `user[id].avatar` | URL de l'avatar (gère avatar null, hash, et animé) |
| `user[id].globalName` | Nom d'affichage global (fallback: username) |
| `user[id].displayName` | Identique à globalName (fallback: username) |
| `user[id].createdAt` | Date de création du compte (ISO 8601) |
| `user[id].isBot` | `true` ou `false` |

### `member`

Fetch un membre d'un serveur. Résout d'abord le `guildId`, puis fetch le membre et le serveur pour calculer les rôles.

| Variable | Description |
|---|---|
| `member[id].nick` | Surnom sur le serveur |
| `member[id].avatar` | URL de l'avatar du membre (fallback: avatar utilisateur) |
| `member[id].displayName` | Surnom ou nom global ou username |
| `member[id].joinedAt` | Date d'arrivée sur le serveur (ISO 8601) |
| `member[id].roles` | Liste des IDs de rôles, séparés par `,` |
| `member[id].highestRole` | ID du rôle le plus élevé (hors @everyone) |
| `member[id].highestRoleWithPerms` | Alias de highestRole |
| `member[id].lowestRole` | ID du rôle le plus bas (hors @everyone) |
| `member[id].lowestRoleWithPerms` | Alias de lowestRole |

> **Note** : Si aucun `guildId` n'est trouvé dans les variables, le scope `member` dégrade vers un fetch `user` simple.

> **Note sur les rôles** : Le calcul de `highestRole` et `lowestRole` parcourt la `roleList` du serveur, ignore le rôle `@everyone` (position ≤ 0), et détermine le rôle avec la position maximale et minimale parmi les rôles du membre.

### `channel`

Fetch un canal par son ID.

| Variable | Description |
|---|---|
| `channel[id].name` | Nom du canal. `'DM'` pour les DmChannel, `'Unknown Channel'` sinon |
| `channel[id].id` | ID du canal |

La méthode `_getChannelName` gère les types : `GuildTextChannel`, `GuildVoiceChannel`, `ThreadsOnlyChannel`, `GuildStageChannel`, et `DmChannel`.

### `guild`

Fetch un serveur complet avec 16 variables.

| Variable | Description |
|---|---|
| `guild[id].name` | Nom du serveur |
| `guild[id].id` | ID du serveur |
| `guild[id].memberCount` | Nombre approximatif de membres |
| `guild[id].premiumSubscriptionCount` | Nombre de boosts |
| `guild[id].premiumTier` | Niveau de boost (0, 1, 2, 3) |
| `guild[id].emojiCount` | Nombre d'emojis (depuis le cache) |
| `guild[id].stickerCount` | Nombre de stickers (depuis le cache) |
| `guild[id].exists` | Toujours `'true'` si le fetch réussit |
| `guild[id].description` | Description du serveur |
| `guild[id].ownerId` | ID du propriétaire |
| `guild[id].verificationLevel` | Niveau de vérification (valeur numérique) |
| `guild[id].features` | Fonctionnalités activées, séparées par `,` |
| `guild[id].vanityUrlCode` | Code d'URL personnalisée |
| `guild[id].banner` | Bannière du serveur |
| `guild[id].splash` | Image de fond d'invitation |
| `guild[id].afkTimeout` | Délai AFK en secondes |
| `guild[id].preferredLocale` | Langue préférée du serveur |

### `role`

Fetch un rôle. Nécessite un `guildId` résolu depuis les variables.

| Variable | Description |
|---|---|
| `role[id].name` | Nom du rôle |
| `role[id].id` | ID du rôle |
| `role[id].color` | Couleur en hexadécimal (ex: `ff0000`) |
| `role[id].position` | Position du rôle |
| `role[id].mentionable` | `true` si le rôle est mentionnable |
| `role[id].hoist` | `true` si les membres sont affichés séparément |
| `role[id].permissions` | Bitfield des permissions (valeur numérique) |

### `message`

Fetch un message dans le canal courant (résolu via `_resolveChannelId`).

| Variable | Description |
|---|---|
| `message[id].content` | Contenu du message |
| `message[id].id` | ID du message |
| `message[id].authorId` | ID de l'auteur |
| `message[id].channelId` | ID du canal |
| `message[id].createdAt` | Date de création (ISO 8601) |

### `getMessage`

Fetch un message en spécifiant explicitement le canal et le message. Le `contextId` est au format `channelId;messageId`.

| Variable | Description |
|---|---|
| `getMessage[chanId;msgId].content` | Contenu du message |
| `getMessage[chanId;msgId].id` | ID du message |
| `getMessage[chanId;msgId].authorId` | ID de l'auteur |
| `getMessage[chanId;msgId].author` | Nom d'utilisateur de l'auteur |
| `getMessage[chanId;msgId].channelId` | ID du canal |
| `getMessage[chanId;msgId].createdAt` | Date de création (ISO 8601) |

> **Note** : Les variantes insensibles à la casse `getmessage` sont également supportées.

### `getReactions`

Récupère le nombre de réactions pour un emoji spécifique sur un message. Le `contextId` est au format `channelId;messageId;emoji`.

| Variable | Description |
|---|---|
| `getReactions[chanId;msgId;emoji]` | Nombre de réactions (string) |

La recherche d'emoji dans les réactions du message se fait par :
1. Nom de l'emoji (ex: `👍`)
2. ID de l'emoji
3. Format combiné `name:id`

Si aucune réaction ne correspond, la variable est peuplée avec `'0'`.

> **Note** : Les variantes insensibles à la casse `getreactions` sont également supportées.

### `emoji`

Cherche un emoji par ID ou par nom. La recherche s'effectue d'abord dans le cache du serveur courant (résolu via `_resolveGuildId`), puis en fallback dans tous les serveurs accessibles.

| Variable | Description |
|---|---|
| `emoji[id]` | Format Discord (ex: `<:myemoji:123456>` ou `<a:anim:123456>`), ou nom pour les emojis Unicode |
| `emoji[id].id` | ID de l'emoji |
| `emoji[id].name` | Nom de l'emoji |
| `emoji[id].isAnimated` | `true` si l'emoji est animé |

## Méthodes helpers

### `_parseSnowflake(String idStr) → Snowflake?`

Parse une chaîne en `Snowflake` nyxx. Retourne `null` si la chaîne n'est pas un entier valide.

### `_resolveGuildId(Map<String, String> variables) → Snowflake?`

Cherche l'ID du serveur dans les variables, en essayant `guild.id`, `interaction.guildId`, puis `guildId`.

### `_resolveChannelId(Map<String, String> variables) → Snowflake?`

Cherche l'ID du canal dans les variables, en essayant `channel.id`, `interaction.channelId`, puis `channelId`.

### `_key(String scope, String contextId, String field) → String`

Génère une clé au format `scope[contextId].field`.

### `_safeAvatarUrl({id, avatar, discriminator}) → String`

Génère l'URL d'avatar de manière sécurisée, en gérant :
- Avatar null → URL par défaut basée sur le discriminateur
- Avatar avec hash → URL avec hash et format (animé ou webp)
- Avatar animé → détection via `isAnimated`

### `_getChannelName(Channel channel) → String`

Retourne le nom du canal selon son type :
- `GuildTextChannel`, `GuildVoiceChannel`, `ThreadsOnlyChannel`, `GuildStageChannel` → `channel.name`
- `DmChannel` → `'DM'`
- Autres → `'Unknown Channel'`

## Gestion d'erreurs

- Si le `contextId` n'est pas un snowflake valide et que le scope n'est pas `getMessage`, `getReactions` ou `emoji`, la méthode retourne immédiatement sans erreur.
- Les erreurs réseau ou de fetch sont propagées (`rethrow`) après avoir nettoyé `_inFlight`.
- Le calcul des rôles (highestRole/lowestRole) est wrappé dans un `try/catch` silencieux — si la position des rôles n'est pas disponible, les variables ne sont simplement pas peuplées.
- La recherche d'emoji dans le serveur courant est également wrappée dans un `try/catch` silencieux avant de passer au fallback global.

## Cycle de vie d'une requête

```
1. Appel → hydrateEntity(gateway, 'user', '123456789', vars, cache)
2. Parse snowflake → Snowflake(123456789)
3. flightKey = 'user:123456789'
4. Cache hit ? → populate depuis le cache → return
5. _inFlight['user:123456789'] existe ? → await → return
6. Création d'un Completer, stockage dans _inFlight
7. Switch 'user' → gateway.users.fetch(id) → User
8. _populateUserVariables → variables['user[123456789].username'] = ...
9. Stockage dans cache['user:123456789'] = user
10. completer.complete()
11. finally → _inFlight.remove('user:123456789')
```

## Intégration avec le reste du moteur

`DiscordEntityFetcher` est appelé par le runtime d'exécution BDFD chaque fois qu'une fonction de lecture d'entité est rencontrée dans un script compilé. Les fonctions comme `$username`, `$channelName`, `$guildName`, `$roleName`, `$message`, `$getMessage`, `$getReactions`, `$emojiCount` et bien d'autres déclenchent un appel à `hydrateEntity` avec le scope approprié.

La classe est purement statique — aucune instance n'est créée. Toute la déduplication est gérée via la map statique `_inFlight`, ce qui signifie que la déduplication fonctionne à travers toutes les exécutions concurrentes au sein du même processus Dart.
