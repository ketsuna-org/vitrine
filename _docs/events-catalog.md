---
layout: doc
title: "Architecture — Catalogue des Events Discord"
translation_key: docs
category: "Architecture"
description: >
  Catalogue complet de tous les événements Discord que Bot Creator peut écouter
  comme triggers de workflows BDFD. Détaille les événements par catégorie, les
  variables disponibles dans chaque contexte, et le mécanisme de dispatch.
---

# Architecture — Catalogue des Events Discord

Ce document référence **tous les événements Discord** que Bot Creator peut écouter et utiliser comme déclencheurs (triggers) de workflows BDFD. Chaque événement est défini dans `utils/event_catalog.dart` via la classe `WorkflowEventDefinition` (catégorie, nom d'événement, label, description).

## Introduction

Dans Bot Creator, un workflow BDFD peut être lié à un événement Discord. Lorsque cet événement se produit, le workflow est automatiquement compilé et exécuté. Le catalogue d'événements est défini statiquement et chaque événement expose un ensemble de **variables runtime** accessibles dans le code BDFD via les placeholders `((...))`.

### Définition d'un événement

Chaque événement est représenté par une `WorkflowEventDefinition` :

```dart
class WorkflowEventDefinition {
  final String category;   // Catégorie (Core, Messages, Guild, etc.)
  final String eventName;  // Nom interne (ex: "messageCreate")
  final String label;      // Label affiché dans l'UI
  final String description;// Description de l'événement
}
```

### Cycle de dispatch

```
Événement Discord (Gateway)
       │
       ▼
EventDispatcher.registerListeners()
       │
       ├── Écoute l'événement Discord natif
       │
       ▼
Recherche du workflow BDFD lié à cet événement dans le store du bot
       │
       ├── Aucun workflow trouvé → ignore
       │
       └── Workflow trouvé
              │
              ▼
         Construction du EventExecutionContext
              │   ├── Injection de l'objet Discord (message, member, guild...)
              │   ├── Hydratation des variables runtime
              │   └── Résolution du code BDFD lié
              │
              ▼
         Compilation BDFD → Transpilation → executeActions()
```

---

## Catalogue des événements par catégorie

### Core

Événements liés au cycle de vie de la connexion du bot.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `ready` | Bot prêt | Déclenché quand le bot se connecte avec succès à la gateway Discord | `bot.id`, `bot.name`, `bot.tag`, `guildsCount` |
| `resumed` | Session reprise | Déclenché quand la session gateway est reprise après une déconnexion | `bot.id`, `bot.name` |
| `interactionCreate` | Interaction reçue | Déclenché à chaque interaction (slash command, autocomplete, component) | `interaction.id`, `interaction.token`, `interaction.type`, `interaction.commandName`, `interaction.customId`, `author.id`, `author.name`, `guild.id`, `channel.id`, `member.displayName` |

---

### Commands

Événements liés aux permissions des commandes d'application.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `applicationCommandPermissionsUpdate` | Permissions de commande mises à jour | Déclenché quand les permissions d'une commande d'application sont modifiées | `guild.id`, `application.id`, `command.id`, `command.name`, `permissions` |

---

### AutoMod

Événements liés à la modération automatique Discord.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `autoModerationRuleCreate` | Règle AutoMod créée | Déclenché quand une règle AutoMod est créée | `guild.id`, `rule.id`, `rule.name`, `rule.triggerType`, `rule.actions`, `author.id` |
| `autoModerationRuleUpdate` | Règle AutoMod modifiée | Déclenché quand une règle AutoMod est modifiée | `guild.id`, `rule.id`, `rule.name`, `rule.triggerType`, `rule.actions`, `author.id` |
| `autoModerationRuleDelete` | Règle AutoMod supprimée | Déclenché quand une règle AutoMod est supprimée | `guild.id`, `rule.id`, `rule.name`, `author.id` |
| `autoModerationActionExecution` | Action AutoMod exécutée | Déclenché quand une action AutoMod est exécutée (message bloqué, alert, timeout) | `guild.id`, `rule.id`, `rule.name`, `action.type`, `message.content`, `message.id`, `author.id`, `channel.id` |

---

### Channels

Événements liés aux salons (création, modification, suppression).

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `channelCreate` | Salon créé | Déclenché quand un salon est créé | `guild.id`, `channel.id`, `channel.name`, `channel.type`, `channel.topic`, `channel.position`, `channel.parentId`, `author.id` |
| `channelUpdate` | Salon modifié | Déclenché quand un salon est modifié (nom, sujet, permissions...) | `guild.id`, `channel.id`, `channel.name`, `channel.type`, `channel.topic`, `channel.position`, `oldChannel.name`, `oldChannel.topic`, `author.id` |
| `channelDelete` | Salon supprimé | Déclenché quand un salon est supprimé | `guild.id`, `channel.id`, `channel.name`, `channel.type`, `channel.topic`, `author.id` |
| `channelPinsUpdate` | Épingles mises à jour | Déclenché quand un message est épinglé ou désépinglé dans un salon | `guild.id`, `channel.id`, `lastPinTimestamp`, `author.id` |

---

### Threads

Événements liés aux fils de discussion.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `threadCreate` | Fil créé | Déclenché quand un fil de discussion est créé | `guild.id`, `thread.id`, `thread.name`, `thread.type`, `thread.parentId`, `thread.ownerId`, `thread.messageCount`, `thread.memberCount`, `author.id` |
| `threadUpdate` | Fil modifié | Déclenché quand un fil est modifié (nom, archivage, verrouillage...) | `guild.id`, `thread.id`, `thread.name`, `thread.archived`, `thread.locked`, `thread.autoArchiveDuration`, `oldThread.name`, `author.id` |
| `threadDelete` | Fil supprimé | Déclenché quand un fil est supprimé | `guild.id`, `thread.id`, `thread.name`, `thread.parentId`, `author.id` |
| `threadListSync` | Liste des fils synchronisée | Déclenché quand la liste des fils accessibles est synchronisée (reprise de session) | `guild.id`, `channelIds`, `threads` |
| `threadMemberUpdate` | Membre du fil mis à jour | Déclenché quand un membre rejoint ou quitte un fil | `guild.id`, `thread.id`, `thread.name`, `member.id`, `member.displayName`, `member.joined` |
| `threadMembersUpdate` | Membres du fil mis à jour | Déclenché quand la liste des membres d'un fil change (ajout/suppression groupée) | `guild.id`, `thread.id`, `addedMembers`, `removedMemberIds`, `memberCount` |

---

### Guild

Événements liés au serveur, aux membres et aux rôles.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `guildCreate` | Bot rejoint un serveur | Déclenché quand le bot rejoint un nouveau serveur ou au démarrage (guilds disponibles) | `guild.id`, `guild.name`, `guild.memberCount`, `guild.ownerId`, `bot.id` |
| `guildDelete` | Bot quitte un serveur | Déclenché quand le bot est retiré d'un serveur ou que le serveur devient indisponible | `guild.id`, `guild.name`, `bot.id` |
| `guildUpdate` | Serveur modifié | Déclenché quand les paramètres du serveur sont modifiés (nom, icône, bannière...) | `guild.id`, `guild.name`, `guild.icon`, `guild.banner`, `guild.description`, `oldGuild.name`, `author.id` |
| `guildAuditLogEntryCreate` | Entrée d'audit créée | Déclenché quand une entrée est ajoutée au journal d'audit | `guild.id`, `entry.id`, `entry.actionType`, `entry.targetId`, `entry.reason`, `author.id` |
| `guildMemberAdd` | Membre rejoint | Déclenché quand un membre rejoint le serveur | `guild.id`, `guild.name`, `member.id`, `member.displayName`, `member.joinedAt`, `member.pending`, `author.id`, `author.name` |
| `guildMemberRemove` | Membre quitte | Déclenché quand un membre quitte le serveur (départ ou kick/ban) | `guild.id`, `member.id`, `member.displayName`, `author.id`, `author.name` |
| `guildMemberUpdate` | Membre modifié | Déclenché quand un membre est modifié (pseudo, rôles, timeout...) | `guild.id`, `member.id`, `member.displayName`, `member.nickname`, `member.roles`, `oldMember.nickname`, `oldMember.roles`, `author.id` |
| `guildRoleCreate` | Rôle créé | Déclenché quand un rôle est créé | `guild.id`, `role.id`, `role.name`, `role.color`, `role.permissions`, `role.position`, `role.hoist`, `role.mentionable`, `author.id` |
| `guildRoleUpdate` | Rôle modifié | Déclenché quand un rôle est modifié | `guild.id`, `role.id`, `role.name`, `role.color`, `role.permissions`, `role.position`, `oldRole.name`, `oldRole.color`, `author.id` |
| `guildRoleDelete` | Rôle supprimé | Déclenché quand un rôle est supprimé | `guild.id`, `role.id`, `role.name`, `role.color`, `author.id` |

---

### Messages

Événements liés aux messages.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `messageCreate` | Message envoyé | Déclenché quand un message est envoyé (nécessite l'intent `MESSAGE_CONTENT`) | `message.id`, `message.content`, `message.attachments`, `message.embeds`, `message.pinned`, `message.tts`, `author.id`, `author.name`, `author.avatar`, `author.bot`, `member.displayName`, `member.nickname`, `member.roles`, `guild.id`, `guild.name`, `channel.id`, `channel.name`, `mentions`, `mentionRoles` |
| `messageUpdate` | Message modifié | Déclenché quand un message est modifié | `message.id`, `message.content`, `message.editedTimestamp`, `oldMessage.content`, `author.id`, `author.name`, `guild.id`, `channel.id` |
| `messageDelete` | Message supprimé | Déclenché quand un message est supprimé | `message.id`, `message.content` (si en cache), `author.id`, `guild.id`, `channel.id` |
| `messageDeleteBulk` | Messages supprimés en masse | Déclenché quand plusieurs messages sont supprimés simultanément | `guild.id`, `channel.id`, `messageIds`, `count` |
| `messagePollVoteAdd` | Vote sondage ajouté | Déclenché quand un utilisateur vote sur un sondage | `guild.id`, `channel.id`, `message.id`, `poll.question`, `answer.id`, `answer.text`, `author.id` |
| `messagePollVoteRemove` | Vote sondage retiré | Déclenché quand un utilisateur retire son vote sur un sondage | `guild.id`, `channel.id`, `message.id`, `poll.question`, `answer.id`, `answer.text`, `author.id` |

---

### Reactions

Événements liés aux réactions sur les messages.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `messageReactionAdd` | Réaction ajoutée | Déclenché quand une réaction est ajoutée à un message | `message.id`, `message.channelId`, `emoji.name`, `emoji.id`, `emoji.animated`, `author.id`, `author.name`, `member.displayName`, `guild.id`, `channel.id` |
| `messageReactionRemove` | Réaction retirée | Déclenché quand une réaction est retirée d'un message | `message.id`, `message.channelId`, `emoji.name`, `emoji.id`, `author.id`, `guild.id`, `channel.id` |
| `messageReactionRemoveAll` | Toutes les réactions retirées | Déclenché quand toutes les réactions sont retirées d'un message | `message.id`, `message.channelId`, `guild.id`, `channel.id` |
| `messageReactionRemoveEmoji` | Réaction d'un émoji retirée | Déclenché quand toutes les réactions d'un émoji spécifique sont retirées | `message.id`, `message.channelId`, `emoji.name`, `emoji.id`, `guild.id`, `channel.id` |

---

### Presence

Événements liés à la présence et aux utilisateurs.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `presenceUpdate` | Présence mise à jour | Déclenché quand la présence d'un utilisateur change (statut, activité, plateforme) | `guild.id`, `user.id`, `user.name`, `status`, `activities`, `clientStatus`, `member.displayName` |
| `userUpdate` | Utilisateur modifié | Déclenché quand un utilisateur modifie son profil (nom, avatar, bannière) | `user.id`, `user.name`, `user.avatar`, `user.discriminator`, `user.banner`, `oldUser.name`, `oldUser.avatar` |

---

### Voice

Événements liés aux salons vocaux.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `voiceStateUpdate` | État vocal modifié | Déclenché quand un utilisateur rejoint, quitte, ou change d'état dans un salon vocal (mute, sourdine, streaming...) | `guild.id`, `member.id`, `member.displayName`, `channel.id`, `channel.name`, `oldChannel.id`, `oldChannel.name`, `selfMute`, `selfDeaf`, `serverMute`, `serverDeaf`, `streaming`, `video` |
| `voiceServerUpdate` | Serveur vocal mis à jour | Déclenché quand le serveur vocal est mis à jour (changement d'endpoint, de token) | `guild.id`, `endpoint`, `token` |
| `voiceChannelEffectSend` | Effet de canal vocal envoyé | Déclenché quand un effet est envoyé dans un canal vocal (animations, soundboard) | `guild.id`, `channel.id`, `user.id`, `effect.type`, `effect.name` |

---

### Invites

Événements liés aux invitations.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `inviteCreate` | Invitation créée | Déclenché quand une invitation est créée | `guild.id`, `invite.code`, `invite.channel.id`, `invite.channel.name`, `invite.maxUses`, `invite.maxAge`, `invite.temporary`, `author.id`, `author.name` |
| `inviteDelete` | Invitation supprimée | Déclenché quand une invitation est supprimée | `guild.id`, `invite.code`, `invite.channel.id`, `invite.channel.name`, `author.id` |

---

### Typing

Événements liés à l'indicateur de saisie.

| Événement | Label | Description | Variables disponibles |
|-----------|-------|-------------|----------------------|
| `typingStart` | Utilisateur en train d'écrire | Déclenché quand un utilisateur commence à écrire dans un salon | `guild.id`, `channel.id`, `user.id`, `user.name`, `member.displayName`, `timestamp` |

---

## Mécanisme de dispatch

### EventDispatcher.registerListeners()

La méthode `registerListeners()` est appelée après la connexion du bot à la gateway Discord. Elle enregistre un listener pour chaque événement Discord supporté :

```dart
void registerListeners(DiscordGateway gateway, Store store) {
  // Core
  gateway.onReady          → _handleEvent('ready', context)
  gateway.onResumed        → _handleEvent('resumed', context)
  gateway.onInteractionCreate → _handleInteraction(...)

  // Messages
  gateway.onMessageCreate  → _handleEvent('messageCreate', context)
  gateway.onMessageUpdate  → _handleEvent('messageUpdate', context)
  gateway.onMessageDelete  → _handleEvent('messageDelete', context)
  // ...

  // Guild
  gateway.onGuildMemberAdd    → _handleEvent('guildMemberAdd', context)
  gateway.onGuildMemberRemove → _handleEvent('guildMemberRemove', context)
  // ...

  // etc. pour chaque événement du catalogue
}
```

### Flux de traitement d'un événement

```
┌─────────────────────────────────────────────────────────────────┐
│                    DISPATCH D'UN ÉVÉNEMENT                       │
│                                                                   │
│  1. Discord envoie un événement via la Gateway WebSocket          │
│                          │                                        │
│                          ▼                                        │
│  2. EventDispatcher reçoit l'événement                            │
│     → construit un EventExecutionContext                         │
│     → extrait les données : message, member, guild, channel...    │
│                          │                                        │
│                          ▼                                        │
│  3. Recherche du workflow BDFD lié à cet événement                │
│     → requête dans le Store : "quel workflow pour 'messageCreate'?"│
│                          │                                        │
│              ┌───────────┴───────────┐                           │
│              │                       │                           │
│         Workflow trouvé        Aucun workflow                    │
│              │                  → ignore l'événement              │
│              ▼                                                    │
│  4. Construction du EventExecutionContext                         │
│     → hydrate le VariablesMap avec les données Discord            │
│     → ex: message.content, author.id, guild.id, channel.id       │
│                          │                                        │
│                          ▼                                        │
│  5. Compilation et exécution                                      │
│     → BdfdCompiler.compile(workflow.source)                       │
│     → BdfdAstTranspiler.transpile(script)                         │
│     → WorkflowExecutor.executeActions(actions, context)           │
│                          │                                        │
│                          ▼                                        │
│  6. Les actions sont exécutées (messages, embeds, requêtes HTTP)  │
│                                                                   │
└─────────────────────────────────────────────────────────────────┘
```

### EventExecutionContext

Le contexte d'exécution d'événement contient toutes les données nécessaires au workflow :

```dart
class EventExecutionContext {
  final String botId;
  final DiscordGateway gateway;
  final Store store;
  final VariablesMap variables;     // Variables scopées de l'événement
  final Interaction? interaction;   // Présent si interactionCreate
  final dynamic eventData;          // Données brutes de l'événement Discord
  final Map<String, String> results; // Résultats cumulés
}
```

### Exemple complet : messageCreate

Soit le workflow BDFD suivant, lié à l'événement `messageCreate` :

```bdfd
$if[$message[0] == !ping]
  $sendMessage[Pong! Latence: $ping ms]
$endif

$if[$message[0] == !welcome]
  $sendMessage[Bienvenue $username sur $serverName!]
  $addRole[$authorID;$roleID[Member]]
$endif
```

Lorsqu'un message est envoyé :

1. **Discord** émet l'événement `MESSAGE_CREATE`
2. **EventDispatcher** le reçoit et construit le contexte :
   - `message.content` = `"!ping"`
   - `author.id` = `"123456789"`
   - `guild.id` = `"987654321"`
   - `channel.id` = `"111222333"`
   - `member.displayName` = `"Jean"`
3. **Recherche** : le store retourne le workflow associé à `messageCreate`
4. **Compilation** : le code BDFD est compilé en actions
5. **Hydratation** : `((message))` → `"!ping"`, `((author))` → `"123456789"`, etc.
6. **Exécution** : le `$if` évalue `"!ping" == "!ping"` → vrai → le bot répond `"Pong! Latence: 42 ms"`

---

## Fichiers source

| Fichier | Rôle |
|---------|------|
| `utils/event_catalog.dart` | Définition de tous les événements supportés (WorkflowEventDefinition) |
| `events/event_contexts.dart` | Construction des EventExecutionContext pour chaque type d'événement |
| `event_dispatcher.dart` | Écoute des événements Discord et routage vers les workflows |
| `workflow_executor.dart` | Compilation et exécution des workflows déclenchés |
