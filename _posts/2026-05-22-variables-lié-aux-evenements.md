---
title: Variables lié aux evenements.
description: Liste des variables lié aux evenements.
date: 2026-05-22T03:55:00.000+02:00
author: Garder500
translation_key: FR
locale: fr
content_language: fr
layout: post
toc: true
---
# Variables disponibles par événement (Exhaustif)

Les variables d'événement sont résolues dans les templates via la syntaxe `((nomDeLaVariable))`. Elles sont injectées automatiquement par le dispatcher d'événements du Runner au moment où l'événement correspondant se produit sur Discord.

---

## 1. Variables globales toujours disponibles

Ces variables de base sont fournies avec **tous** les événements déclenchés par la Gateway Discord.

| Variable | Type | Description |
| :--- | :--- | :--- |
| `((event.name))` | `string` | Nom de l'événement déclenché (ex: `messageCreate`, `guildMemberAdd`, `voiceStateUpdate`). |
| `((timestamp))` | `string` | Timestamp exact de l'exécution (en millisecondes depuis l'époque). |
| `((actualTime))` | `string` | Date et heure de l'événement au format ISO8601. |
| `((guildId))` | `string` | ID du serveur concerné (si applicable, vide sinon). |
| `((channelId))` | `string` | ID du salon concerné (si applicable, vide sinon). |
| `((userId))` | `string` | ID de l'utilisateur concerné/initiateur (si applicable, vide sinon). |
| `((workflow.type))` | `string` | Fixé à `event` pour tous les événements. |
| `((bot.uptime))` | `string` | Durée de fonctionnement du bot en millisecondes. |

---

## 2. Variables de l'Application Bot

Ces détails caractérisent le bot en cours d'exécution et sont injectés à chaque événement.

| Variable | Type | Description |
| :--- | :--- | :--- |
| `((bot.id))` | `string` | Snowflake ID unique du bot. |
| `((bot.username))` | `string` | Nom d'utilisateur du bot. |
| `((bot.guildCount))` | `string` | Nombre total de serveurs où le bot est installé. |
| `((bot.guildNames))` | `string` | Liste des noms de serveurs (séparés par des virgules). |
| `((bot.invite))` | `string` | Lien d'invitation OAuth2 du bot. |
| `((bot.ping))` / `((ping))` | `string` | Latence de la Gateway Discord en millisecondes. |
| `((bot.shardId))` | `string` | ID du Shard actuel (généralement `0`). |
| `((bot.nodeVersion))` | `string` | Version du moteur d'exécution (ex: `Dart 3.x.x`). |

---

## 3. Hydratation automatique de contexte (Serveur, Salon, Membre)

Si l'événement fournit un ID de serveur (`guildId`), de salon (`channelId`) ou d'utilisateur (`userId`), le moteur extrait automatiquement les ensembles de variables suivants :

### Contexte Serveur (`guild.*`)
*Disponible si `guildId` est renseigné.*

- `((guild.id))` : ID unique du serveur.
- `((guild.name))` : Nom du serveur.
- `((guild.memberCount))` / `((guild.count))` : Nombre de membres du serveur.
- `((guild.ownerId))` : ID du propriétaire du serveur.
- `((guild.preferredLocale))` : Langue préférée du serveur.
- `((guild.description))` : Description du serveur (si définie).
- `((guild.vanityUrlCode))` : Code d'invitation personnalisée (si défini).
- `((guild.verificationLevel))` : Niveau de vérification du serveur.
- `((guild.mfaLevel))` : Niveau de double authentification requis.
- `((guild.nsfwLevel))` : Niveau de filtrage NSFW.
- `((guild.premiumTier))` : Niveau de Boost de serveur.
- `((guild.premiumSubscriptionCount))` : Nombre de Boosts actuels.
- `((guild.features))` : Fonctionnalités activées sur le serveur (séparées par des virgules).
- `((guild.features.count))` : Nombre de fonctionnalités activées.
- `((guild.systemChannelId))` : ID du salon système.
- `((guild.rulesChannelId))` : ID du salon des règles.
- `((guild.afkChannelId))` : ID du salon AFK.
- `((guild.afkTimeout))` : Délai de mise en AFK (en secondes).
- `((guild.icon))` : URL de l'icône du serveur.
- `((guild.roleCount))` : Nombre total de rôles.
- `((guild.roleNames))` : Liste de tous les noms de rôles du serveur (séparés par des virgules).
- `((guild.stickerCount))` : Nombre total de stickers.
- `((guild.emojiCount))` : Nombre total d'émojis personnalisés.

### Contexte Salon (`channel.*`)
*Disponible si `channelId` est renseigné.*

- `((channel.id))` : ID du salon.
- `((channel.name))` : Nom du salon (ou `DM` si message privé).
- `((channel.type))` / `((channel.typeValue))` : Type du salon (ex: `0` = texte, `2` = vocal).
- `((channel.topic))` : Description du salon.
- `((channel.parentId))` / `((channel.categoryId))` : ID de la catégorie parente.
- `((channel.position))` : Position dans la liste des salons.
- `((channel.nsfw))` : `true` si le salon est NSFW, sinon `false`.
- `((channel.slowmode))` : Durée du mode lent (en secondes).
- `((channel.bitrate))` : Débit binaire du salon vocal/stage (en bps).
- `((channel.userLimit))` : Limite d'utilisateurs autorisés dans le salon vocal.
- `((channel.mention))` : Mention cliquable du salon (ex: `<#123456>`).
- `((channel.thread.archived))` : `true` si le fil est archivé, sinon `false`.
- `((channel.thread.locked))` : `true` si le fil est verrouillé, sinon `false`.
- `((channel.thread.ownerId))` : ID du créateur du fil.
- `((channel.thread.autoArchiveDuration))` : Durée avant archivage automatique (en minutes).

### Contexte Membre et Permissions (`member.*` et `user.*`)
*Disponible si `userId` est renseigné et que l'événement s'est produit dans un serveur.*

- `((member.id))` : ID du membre concerné.
- `((member.nick))` : Surnom sur le serveur.
- `((member.displayName))` : Surnom si défini, sinon nom d'affichage global ou username.
- `((member.avatar))` : URL de l'avatar personnalisé sur le serveur (si défini).
- `((member.joinedAt))` : Date et heure d'arrivée sur le serveur (ISO8601).
- `((member.roles))` : IDs de rôles possédés (séparés par des virgules).
- `((member.isBooster))` : `true` si le membre booste le serveur, sinon `false`.
- `((member.premiumSince))` : Date de début de boost (ISO8601, si applicable).
- `((member.communicationDisabledUntil))` : Date de fin d'exclusion temporaire (ISO8601, si applicable).
- `((member.isAdmin))` / `((interaction.member.isAdmin))` : `true` si le membre est Administrateur, sinon `false`.
- `((member.permissions))` / `((interaction.member.permissions))` : Liste des permissions du membre (séparées par des virgules).
- `((permissions.byId.<userId>))` : Liste des permissions d'un utilisateur ciblé spécifique.
- `((isAdmin.byId.<userId>))` : Statut d'administration d'un utilisateur ciblé spécifique.
- `((user.mention))` / `((author.mention))` / `((member.mention))` : Mention cliquable de l'utilisateur (ex: `<@123456>`).

---

## 4. Variables spécifiques par Événement

En plus des ensembles de variables automatiques ci-dessus, chaque événement Gateway injecte ses propres variables spécifiques.

### 4.1 Événements de Messages

#### `messageCreate` / `messageUpdate`
*Ces événements contiennent toutes les variables de contenu et de métadonnées du message ainsi que de son auteur.*

- **Message** :
  - `((message.id))` : ID unique du message.
  - `((message.content))` : Contenu texte brut du message.
  - `((message.word.count))` : Nombre de mots dans le message.
  - `((message.isBot))` : `true` si l'auteur est un bot/webhook, sinon `false`.
  - `((message.channelId))` : ID du salon.
  - `((message.isDM))` : `true` si c'est un message privé (DM).
  - `((message.isSystem))` : `true` si c'est un message système (ex: boost, bienvenue).
  - `((message.type))` : Type brut du message (entier Discord).
  - `((message.mentions))` : IDs des utilisateurs mentionnés (séparés par des virgules).
  - `((message.mention.count))` : Nombre d'utilisateurs mentionnés.
  - `((message.timestamp))` : Timestamp de création (millisecondes).
  - `((message.isEdited))` : `true` ou `false`.
  - `((message.isPinned))` : `true` ou `false`.
  - `((message.attachments))` : URLs des pièces jointes (séparées par des virgules).
  - `((message.attachments.count))` : Nombre de pièces jointes.
  - `((message.embeds.count))` : Nombre d'embeds.
  - `((message.roleMentions))` : IDs des rôles mentionnés (séparés par des virgules).
  - `((message.roleMentions.count))` : Nombre de rôles mentionnés.
  - `((message.mentionsEveryone))` : `true` si le message mentionne `@everyone` ou `@here`.
  - `((message.url))` : URL directe permettant de naviguer vers le message.
  - `((message.editedTimestamp))` : Timestamp de la dernière modification (si applicable).
  - `((message.referencedMessage.id))` : ID du message auquel ce message répond (si applicable).
  - `((message.content[0]))...((message.content[9]))` : Mot individuel à l'index spécifié (de 0 à 9).
  - `((message.mentions[0]))...((message.mentions[9]))` : ID de l'utilisateur mentionné à l'index spécifié (de 0 à 9).
  - `((message.oldContent))` : Contenu initial du message (*exclusif à `messageUpdate`*).

- **Auteur (`author.*` et `user.*`)** :
  - `((author.id))` / `((user.id))` : ID de l'auteur du message.
  - `((author.username))` / `((user.username))` / `((userName))` : Username unique Discord.
  - `((author.globalName))` / `((user.globalName))` : Nom d'affichage global Discord.
  - `((author.displayName))` / `((user.displayName))` : Nom d'affichage (surnom serveur si présent, sinon global).
  - `((author.tag))` / `((user.tag))` : Discriminant ou `0`.
  - `((author.isBot))` : `true` si l'auteur est un bot.
  - `((author.avatar))` / `((user.avatar))` / `((userAvatar))` : URL de l'avatar de l'auteur.
  - `((author.banner))` / `((user.banner))` : URL de la bannière de l'auteur.
  - `((user.createdAt))` : Date de création du compte de l'auteur (ISO8601).
  - `((user.bannerColor))` : Code hexadécimal de la couleur de bannière de l'auteur.

#### `messageDelete`
*Déclenché lorsqu'un message est supprimé.*

- `((message.id))` : ID du message supprimé.
- `((message.content))` : Contenu texte du message (si encore en cache).
- `((author.id))` : ID de l'auteur du message supprimé.
- `((author.username))` : Nom d'utilisateur de l'auteur.
- `((author.tag))` : Tag de l'auteur.

---

### 4.2 Événements de Membres et d'Utilisateurs

#### `guildMemberAdd`
*Déclenché lorsqu'un nouvel utilisateur rejoint un serveur.*

- `((member.id))` : ID de l'utilisateur.
- `((member.name))` / `((member.username))` : Nom d'utilisateur unique.
- `((member.tag))` : Tag/Discriminant.
- `((member.joinedAt))` : Date et heure d'arrivée sur le serveur.

#### `guildMemberRemove`
*Déclenché lorsqu'un membre quitte ou est banni d'un serveur.*

- `((member.id))` : ID du membre qui est parti.
- `((member.name))` / `((member.username))` : Nom d'utilisateur.
- `((member.tag))` : Tag/Discriminant.

#### `guildMemberUpdate`
*Déclenché lorsque le profil d'un membre serveur change (surnom, rôles, avatar de guilde, boost).*

- **Nouvel état** :
  - `((member.id))` : ID de l'utilisateur.
  - `((member.username))` : Nom de l'utilisateur.
  - `((member.nick))` : Nouveau surnom.
  - `((member.joinedAt))` : Date d'arrivée initiale.
  - `((member.roles))` : Nouvelle liste d'IDs de rôles (CSV).
  - `((member.avatar))` : URL du nouvel avatar personnalisé sur le serveur.
  - `((member.isBooster))` : `true` s'il booste maintenant le serveur.
- **Ancien état (`member.old.*`)** :
  - `((member.old.nick))` : Ancien surnom.
  - `((member.old.roles))` : Ancienne liste de rôles (CSV).
  - `((member.old.avatar))` : Ancien avatar de serveur.
  - `((member.old.isBooster))` : Ancien état de boost (`true`/`false`).

#### `userUpdate`
*Déclenché lorsque les informations globales d'un utilisateur changent (username, avatar global, bannière).*

- `((user.id))` : ID de l'utilisateur.
- `((user.username))` : Nouveau nom d'utilisateur global.
- `((user.avatar))` : URL du nouvel avatar global.
- `((user.banner))` : URL de la nouvelle bannière globale.
- `((user.accentColor))` : Nouvelle couleur d'accentuation.

---

### 4.3 Événements de Salons et de Fils

#### `channelCreate` / `channelUpdate` / `channelDelete`
*Déclenchés lors de la gestion des salons.*

- `((channel.id))` : ID du salon.
- `((channel.name))` : Nom du salon.
- `((channel.type))` : Type du salon (ex: `GuildTextChannel`).

#### `channelPinsUpdate`
*Déclenché lorsque des messages sont épinglés ou désépinglés.*

- `((channel.lastPinTimestamp))` : Date et heure de la dernière épingle.

#### `threadCreate` / `threadUpdate` / `threadDelete`
*Déclenchés pour la gestion des Fils Discord.*

- `((thread.id))` : ID du fil.
- `((thread.name))` : Nom du fil.
- `((thread.parent.id))` : ID du salon texte parent.
- `((thread.owner.id))` : ID du créateur du fil.
- `((thread.archived))` : `true` si le fil est archivé, sinon `false`.
- `((thread.locked))` : `true` si le fil est verrouillé, sinon `false`.
- `((thread.autoArchiveDuration))` : Durée avant archivage automatique (en minutes).

#### `threadMemberUpdate`
*Déclenché lorsque le statut d'un membre dans un fil spécifique change.*

- `((thread.id))` : ID du fil.
- `((member.id))` : ID de l'utilisateur.

#### `threadMembersUpdate`
*Déclenché lorsque plusieurs membres rejoignent ou quittent un fil.*

- `((thread.id))` : ID du fil.
- `((thread.members.added.count))` : Nombre de membres ajoutés au fil.
- `((thread.members.removed.count))` : Nombre de membres retirés du fil.

---

### 4.4 Événements de Rôles

#### `guildRoleCreate` / `guildRoleUpdate`
*Déclenchés pour la gestion des rôles du serveur.*

- `((role.id))` : ID unique du rôle.
- `((role.name))` : Nom du rôle.
- `((role.color))` : Couleur hexadécimale/décimale du rôle.
- `((role.permissions))` : Entier décimal représentant les permissions du rôle.
- `((role.position))` : Rang dans la hiérarchie des rôles.
- `((role.mentionable))` : `true` si le rôle est mentionnable par tous, sinon `false`.
- `((role.hoist))` : `true` si le rôle est affiché séparément des autres membres en ligne.

#### `guildRoleDelete`
*Déclenché lorsqu'un rôle est supprimé.*

- `((role.id))` : ID du rôle supprimé.

---

### 4.5 Événements de Réactions et de Sondages

#### `messageReactionAdd` / `messageReactionRemove` / `messageReactionRemoveEmoji`
*Déclenchés lors de l'ajout/retrait de réactions individuelles.*

- `((message.id))` : ID du message qui a reçu ou perdu la réaction.
- `((reaction.emoji.name))` : Nom de l'émoji utilisé (ex: `🔥` ou le nom de l'émoji personnalisé).
- `((reaction.emoji.id))` : ID de l'émoji si c'est un émoji personnalisé, vide sinon.
- `((reaction.emoji.animated))` : `true` si l'émoji est animé, sinon `false`.

#### `messageReactionRemoveAll`
*Déclenché lorsque toutes les réactions d'un message sont supprimées d'un coup.*

- `((message.id))` : ID du message nettoyé.

#### `messagePollVoteAdd` / `messagePollVoteRemove`
*Déclenchés lors de l'expression ou du retrait d'un vote sur un Sondage Discord.*

- `((message.id))` : ID du message contenant le sondage.
- `((poll.answer.id))` : ID numérique de la réponse choisie/retirée.

---

### 4.6 Événements de Gestion du Serveur

#### `guildCreate` / `guildUpdate`
*Déclenchés lorsque le bot rejoint un serveur ou que les propriétés d'un serveur changent.*
*Ces événements contiennent l'intégralité des variables de contexte `guild.*` listées dans la Section 3.*

- `((guild.oldGuild.<prop>))` : Propriété du serveur avant la mise à jour (ex: `((guild.oldGuild.name))`, *exclusif à `guildUpdate`*).

#### `guildDelete`
*Déclenché lorsque le bot quitte un serveur ou que le serveur devient indisponible.*

- `((guild.unavailable))` : `true` si le serveur est indisponible à cause d'une panne Discord, sinon `false` (bot exclu/parti).

#### `guildAuditLogCreate`
*Déclenché lorsqu'une nouvelle entrée est ajoutée aux logs d'audit (modération, création de salon, etc.).*

- `((auditLog.action))` : Type d'action d'audit (ex: `memberBanAdd`, `channelCreate`).
- `((auditLog.executorId))` : ID du modérateur/administrateur qui a exécuté l'action.
- `((auditLog.targetId))` : ID de la cible affectée (utilisateur, salon, rôle...).

---

### 4.7 Événements d'Invitations

#### `inviteCreate` / `inviteDelete`
*Déclenchés lors de la gestion des liens d'invitation du serveur.*

- `((invite.code))` : Code d'invitation (ex: `bc-bot-creator`).
- `((invite.channelId))` : ID du salon associé à l'invitation.
- `((invite.inviterId))` : ID de l'utilisateur qui a généré l'invitation (*exclusif à `inviteCreate`*).

---

### 4.8 Événements Vocaux et de Présence

#### `voiceStateUpdate`
*Déclenché lorsqu'un utilisateur rejoint, quitte ou change de salon vocal (ou active son micro/casque).*

- `((voice.channel.id))` : ID du salon vocal rejoint/quitté.
- `((voice.user.id))` : ID de l'utilisateur concerné.
- `((voice.state.sessionId))` : ID de la session vocale active.
- `((voice.selfMute))` : `true` si l'utilisateur s'est rendu muet lui-même.
- `((voice.selfDeafen))` : `true` si l'utilisateur a coupé le son lui-même.
- `((voice.mute))` : `true` si l'utilisateur est rendu muet par un modérateur sur le serveur.
- `((voice.deafen))` : `true` si l'utilisateur a le son coupé par un modérateur sur le serveur.

#### `voiceChannelEffectSend`
*Déclenché lorsqu'un effet de salon vocal est envoyé (ex: réaction visuelle ou bruit de soundboard).*

- `((voice.effect.emoji))` : Émoji associé à l'effet visuel.
- `((voice.effect.soundId))` : ID du son joué depuis le soundboard.

#### `voiceServerUpdate`
*Déclenché lors de la mise à jour des paramètres de connexion vocale.*

- `((voice.server.token))` : Jeton de connexion de session.
- `((voice.server.endpoint))` : Nom d'hôte du serveur vocal Discord.

#### `typingStart`
*Déclenché lorsqu'un utilisateur commence à écrire dans un salon.*

- `((typing.timestamp))` : Timestamp de début d'écriture (millisecondes).
- `((typing.member.id))` : ID de l'utilisateur.
- `((typing.member.name))` : Nom d'utilisateur unique.

#### `presenceUpdate`
*Déclenché lors de la mise à jour du statut en ligne d'un utilisateur ou de ses activités (jeux, streaming, écoute).*

- **Statut utilisateur** :
  - `((user.id))` : ID de l'utilisateur.
  - `((user.username))` : Nom d'affichage/username.
  - `((user.tag))` : Discriminant Discord.
  - `((user.avatar))` : URL de l'avatar.
  - `((presence.status))` : Statut actuel (`online`, `idle`, `dnd` ou `offline`).
  - `((presence.activity.count))` : Nombre total d'activités en cours.
  - `((presence.client.desktop))` : Statut du client bureau (`online`, `idle`, `dnd`, `offline`).
  - `((presence.client.mobile))` : Statut du client mobile.
  - `((presence.client.web))` : Statut du client navigateur.

- **Activité individuelle (`presence.activity[i].*` avec `i` allant de `0` à `count - 1`)** :
  - `((presence.activity[i].name))` : Nom du jeu ou de l'application (ex: `Spotify`, `League of Legends`).
  - `((presence.activity[i].type))` : ID de type d'activité (ex: `0` = jeu, `2` = écoute).
  - `((presence.activity[i].typeName))` : Libellé lisible de l'activité (`playing`, `streaming`, `listening`, `watching`, `custom` ou `competing`).
  - `((presence.activity[i].details))` : Détails supplémentaires (ex: nom de l'artiste/album sur Spotify).
  - `((presence.activity[i].state))` : État actuel (ex: titre de la chanson).
  - `((presence.activity[i].url))` : URL associée (pour les streams Twitch/YouTube).

---

### 4.9 Événements d'Interactions (Composants UI, Boutons, Menus, Modals)

#### `interactionCreate`
*Déclenché lorsqu'un utilisateur clique sur un bouton, sélectionne une option dans un menu déroulant, soumet un modal ou utilise une commande slash / autocomplete.*

- **Métadonnées de l'interaction** :
  - `((interaction.kind))` : Nature de l'interaction (`button`, `select`, `modal`, `command` ou `autocomplete`).
  - `((interaction.customId))` : Identifiant personnalisé attribué au composant ou au modal initiateur.
  - `((interaction.id))` : ID unique de l'interaction générée.
  - `((interaction.token))` : Jeton unique d'authentification temporaire pour répondre.
  - `((interaction.applicationId))` : ID de l'application cliente Discord.
  - `((interaction.messageId))` : ID du message source contenant le composant cliqué (si applicable).

- **Champs de sélection / Menus Déroulants** :
  - `((interaction.values))` : Liste formatée (CSV) de toutes les valeurs choisies dans un menu déroulant.
  - `((interaction.values.count))` : Nombre d'options sélectionnées.
  - `((interaction.stringSelect.value))` / `((interaction.stringSelect.values))` / `((interaction.stringSelect.count))` : Valeurs sélectionnées pour un menu déroulant textuel standard.
  - `((interaction.channelSelect.channelId))` / `((interaction.channelSelect.channelIds))` / `((interaction.channelSelect.channelCount))` : IDs des salons sélectionnés dans un menu de type Salons.
  - `((interaction.userSelect.userId))` / `((interaction.userSelect.userIds))` / `((interaction.userSelect.userCount))` : IDs des utilisateurs sélectionnés.
  - `((interaction.roleSelect.roleId))` / `((interaction.roleSelect.roleIds))` / `((interaction.roleSelect.roleCount))` : IDs des rôles sélectionnés.
  - `((interaction.mentionableSelect.userId))` / `((interaction.mentionableSelect.userIds))` / `((interaction.mentionableSelect.userCount))` : IDs des cibles (membres/rôles) sélectionnés.

- **Champs de Formulaires Modals** :
  - `((modal.customId))` : ID du modal soumis (alias pour `interaction.customId`).
  - `((modal.<inputCustomId>))` : Contenu textuel saisi par l'utilisateur pour le champ ayant l'identifiant `<inputCustomId>`.

- **Commandes Slash & Autocomplete** :
  - `((interaction.command.name))` : Nom de la commande slash appelée.
  - `((interaction.command.id))` : ID unique de la commande.
  - `((interaction.command.type))` : Type de la commande (ex: `chatInput`, `user`, `message`).

---

### 4.10 Événements Hors-Discord (Planification & Webhooks)

#### `scheduled`
*Déclenché de manière autonome selon l'intervalle configuré par tâche planifiée.*

- `((workflow.type))` : Fixé à `general`.
- `((workflow.trigger))` : Fixé à `scheduled`.
- `((trigger.minutes))` : Intervalle configuré d'exécution en minutes (ex: `5`).

#### `inboundWebhook`
*Déclenché lorsqu'une requête HTTP POST est reçue sur l'adresse d'intégration webhook du bot.*

- `((workflow.type))` : Fixé à `inboundWebhook`.
- `((inbound.event.name))` : Fixé à `inboundWebhook`.
- `((inbound.workflow.name))` : Nom configuré du workflow récepteur.
- `((inbound.request.id))` : ID unique attribué à la requête HTTP entrante.
- `((inbound.source.ip))` : Adresse IP d'origine de l'appelant.
- `((inbound.payload.json))` : Payload HTTP complet brut sérialisé au format JSON.
- `((inbound.payload.<key>))` : Valeur associée à la clé `<key>` extraite directement du JSON envoyé dans le corps de la requête.
- `((inbound.header.<header_name_lowercase>))` : Valeur associée au header HTTP entré (nom converti en minuscules).
