---
layout: doc
title: Blocks Dictionary — Complete Catalog
category: "Blocks"
api_type: blocks
description: Exhaustive catalog of all 112 visual Blocks in the Bot Creator mobile application, organized into 12 categories with payload parameters, types, and defaults.
permalink: /docs/blocks-dictionary/
---

# Blocks Dictionary — Complete Catalog

This dictionary documents every Block available in the Bot Creator mobile and desktop application. Each block corresponds to a native action executed by the Dart engine (`BotCreatorActionType`).

---

## Sommaire des Catégories

1. [Messages](#1-messages)
2. [Reactions](#2-reactions)
3. [Channels & Salons](#3-channels--salons)
4. [Moderation & Membres](#4-moderation--membres)
5. [Components & Interactions](#5-components--interactions)
6. [Webhooks](#6-webhooks)
7. [Guild & Members](#7-guild--members)
8. [HTTP & Variables](#8-http--variables)
9. [Logic & Flow (Logique & Flux)](#9-logic--flow)
10. [Workflows & Scripts](#10-workflows--scripts)
11. [Music (Lavalink)](#11-music)
12. [Déclencheurs & Entry Points](#12-d%C3%A9clencheurs--entry-points)

---

## 1. Messages

Actions dédiées à l'envoi, l'édition et la suppression de messages dans les salons textuels.

### `sendMessage`
Envoie un message simple, un embed ou un message à composants dans un salon ou en message privé (DM).
- **Paramètres :**
  - `channelId` *(string)* : Identifiant du salon cible (ou contexte actuel si omis).
  - `content` *(string)* : Texte brut du message (supporte les `((...))` placeholders).
  - `targetType` *(select: `channel` \| `user`)* : Cible de l'envoi (`user` pour un DM direct).
  - `userId` *(string)* : Requis si `targetType == "user"`.
  - `embeds` *(list<object>)* : Liste d'objets embeds (titre, description, couleur, champs).
  - `components` *(object)* : Structure de boutons ou menus déroulants.
  - `messageMode` *(select: `normal` \| `componentv2`)* : Mode d'affichage classique ou modern rich layout.

### `editMessage`
Modifie le contenu ou les embeds d'un message existant envoyé par le bot.
- **Paramètres :**
  - `channelId` *(string)* : Salon où se trouve le message.
  - `messageId` *(string)* : Identifiant du message à éditer.
  - `content` *(string)* : Nouveau texte du message.
  - `embeds` *(list<object>)* : Nouveaux embeds.

### `deleteMessages`
Supprime un message spécifique ou purge en masse des messages récents.
- **Paramètres :**
  - `channelId` *(string)* : Salon cible.
  - `messageId` *(string)* : ID du message unique à supprimer.
  - `messageCount` *(number)* : Nombre de messages à purger (1 à 100).
  - `onlyUserId` *(string)* : Filtrer la suppression par utilisateur.
  - `filterBots` *(boolean)* : Supprimer uniquement les bots.
  - `delay` *(string)* : Délai d'attente avant suppression (ex: `5s`).

### `pinMessage` / `unpinMessage`
Épingle ou désépingle un message dans un salon.
- **Paramètres :** `channelId`, `messageId`.

### `getMessage`
Récupère les données d'un message existant (auteur, contenu, date) et les stocke dans `((action.<key>))`.
- **Paramètres :** `channelId`, `messageId`.

### `createPoll` / `endPoll`
Crée un sondage natif Discord avec choix multiples ou met fin à un sondage actif.
- **Paramètres :** `channelId`, `question`, `answers` (liste), `durationHours`, `allowMultiselect`.

---

## 2. Reactions

### `addReaction`
Ajoute une réaction émoji à un message.
- **Paramètres :**
  - `channelId` *(string)* : Salon du message.
  - `messageId` *(string)* : Message à réagir.
  - `emoji` *(string)* : Émoji Unicode (`👍`) ou format custom (`nom:id`).

### `removeReaction`
Retire une réaction spécifique (de l'utilisateur ou du bot).
- **Paramètres :** `channelId`, `messageId`, `emoji`, `userId`.

### `clearAllReactions`
Supprime toutes les réactions d'un message donné.
- **Paramètres :** `channelId`, `messageId`.

---

## 3. Channels & Salons

### `createChannel`
Crée un nouveau salon sur le serveur Discord.
- **Paramètres :**
  - `name` *(string, requis)* : Nom du salon (ex: `ticket-((user.id))`).
  - `type` *(select)* : `text`, `voice`, `announcement`, `stage`, `forum`, `category`.
  - `categoryId` *(string)* : ID de la catégorie parent.
  - `topic` *(string)* : Sujet ou description du salon.
  - `nsfw` *(boolean)* : Marquer comme salon réservé aux adultes.
  - `slowmode` *(string)* : Durée du ralenti (ex: `5s`, `1m`).
- **Résultat :** Retourne l'identifiant du salon créé accessible via `((action.<key>))`.

### `editChannelPermissions`
Configure les permissions d'un rôle ou d'un membre sur un salon (Permission Overwrite).
- **Paramètres :**
  - `channelId` *(string)* : Identifiant du salon.
  - `targetType` *(select)* : `member`, `role`, ou `everyone`.
  - `targetId` *(string)* : ID du membre ou du rôle.
  - `allow` *(string)* : Masque binaire des permissions accordées (ex: `68608`).
  - `deny` *(string)* : Masque binaire des permissions refusées.
  - `permissions` *(map)* : Format visuel moderne associant chaque permission à `allow`, `deny` ou `unset`.

### `removeChannel`
Supprime définitivement un salon textuel ou vocal.
- **Paramètres :**
  - `channelId` *(string)* : Identifiant du salon à supprimer.

### `updateChannel`
Met à jour le nom, le sujet ou l'archivage d'un salon ou d'un fil.
- **Paramètres :** `channelId`, `name`, `topic`, `archived`, `locked`, `slowmode`.

### `createThread` / `addThreadMember` / `removeThreadMember`
Gère les fils de discussion Discord (publics ou privés).
- **Paramètres :** `channelId`, `name`, `type` (`publicThread` ou `privateThread`), `userId`.

---

## 4. Moderation & Membres

### `banUser` / `unbanUser`
Bannit ou débannit un utilisateur du serveur.
- **Paramètres :**
  - `userId` *(string)* : ID de l'utilisateur.
  - `reason` *(string)* : Motif inscrit dans les logs d'audit.
  - `deleteMessageDays` *(number)* : Purger les messages des X derniers jours (0 à 7).

### `kickUser`
Expulse un membre du serveur.
- **Paramètres :** `userId`, `reason`.

### `muteUser` / `unmuteUser`
Place un membre en exclusion temporaire (Timeout Discord native).
- **Paramètres :**
  - `userId` *(string)* : ID du membre.
  - `duration` *(string)* : Durée (ex: `10m`, `1h`, `1d`).
  - `reason` *(string)* : Motif.

### `addRole` / `removeRole`
Attribue ou retire un rôle à un membre.
- **Paramètres :** `userId`, `roleId`, `reason`.

### `setNickname`
Modifie le pseudonyme d'un membre sur le serveur.
- **Paramètres :** `userId`, `nickname`.

### `slowmode`
Applique un ralenti sur le salon actuel.
- **Paramètres :** `channelId`, `seconds` (ou durée formatée `10s`).

---

## 5. Components & Interactions

> [!IMPORTANT]
> Les blocs d'interaction répondent aux Slash Commands, boutons, menus déroulants et modales.

### `respondWithMessage` *(Terminal)*
Répond à l'interaction en cours (Slash Command, Clic de bouton, Menu de sélection).
- **Paramètres :**
  - `content` *(string)* : Texte de réponse.
  - `ephemeral` *(boolean)* : Si `true`, la réponse n'est visible que par l'utilisateur déclencheur.
  - `embeds` *(list<object>)* : Liste d'embeds accompagnant la réponse.
  - `components` *(object)* : Lignes de boutons ou menus attachés.
  - `channelId` *(string)* : Salon de secours si invoqué hors interaction.

### `respondWithComponentV2`
Répond en utilisant la mise en page riche moderne Component V2 (Sections, Conteneurs, Séparateurs).
- **Paramètres :** `componentV2`, `ephemeral`, `content`.

### `respondWithModal`
Ouvre un formulaire contextuel (popup modale) sur l'écran de l'utilisateur.
- **Paramètres :**
  - `customId` *(string)* : Identifiant du formulaire.
  - `title` *(string)* : Titre de la fenêtre modale.
  - `components` *(list)* : Champs de texte (`textInput`), cases à cocher, etc.
  - `onSubmitWorkflow` *(string)* : Workflow déclenché à la validation.

### `deferInteraction`
Diffère l'interaction ("Le bot réfléchit...") pour éviter le timeout de 3 secondes de Discord lors des opérations longues.
- **Paramètres :** `ephemeral` *(boolean)*.

### `editInteractionMessage`
Met à jour le message d'origine sur lequel se trouvait le bouton cliqué.
- **Paramètres :** `content`, `embeds`, `components`.

---

## 6. Webhooks

- `sendWebhook` : Envoie un message via une URL de webhook Discord (`webhookUrl`, `content`, `username`, `avatarUrl`, `embeds`).
- `getWebhook` / `listWebhooks` : Inspecte les webhooks existants d'un salon.
- `createWebhook` / `editWebhook` / `deleteWebhook` : Cycle de vie complet des webhooks Discord.

---

## 7. Guild & Members

- `getMember` : Récupère les informations complètes d'un membre (rôles, date d'arrivée, permissions).
- `listMembers` : Parcourt les membres du serveur.
- `updateGuild` : Modifie le nom, la description ou les paramètres du serveur.
- `leaveGuild` : Force le bot à quitter le serveur spécifié.
- `createEmoji` / `updateEmoji` / `deleteEmoji` : Gestion dynamique des émojis du serveur.
- `getGuildOnboarding` / `updateGuildOnboarding` : Configuration de l'accueil communautaire Discord.

---

## 8. HTTP & Variables

### Variables d'Exécution
- `setTemporaryVariable` : Enregistre une variable temporaire valable pendant l'exécution actuelle (`name`, `value`). Équivalent BDFD : `$var[nom;valeur]`.

### Variables Persistantes (Base de données)
- `setGlobalVariable` / `getGlobalVariable` / `removeGlobalVariable` : Variables globales du bot.
- `setScopedVariable` / `getScopedVariable` / `removeScopedVariable` : Variables scopées :
  - `scope` : `user`, `guild` (serveur), `channel`, `guildMember` (membre sur un serveur), `message`.
  - `key` : Nom de la variable.
  - `targetId` : ID de la cible (ex: ID du membre).
  - `value` : Valeur enregistrée.
- `appendArrayElement` / `removeArrayElement` / `queryArray` : Manipulation de listes et tableaux dans la base.

### Requêtes Web HTTP
- `httpRequest` : Exécute un appel REST externe (`GET`, `POST`, `PUT`, `DELETE`, `PATCH`).
  - `url` *(string)* : Adresse de l'API.
  - `method` *(string)* : Méthode HTTP.
  - `headers` *(map)* : En-têtes HTTP (Bearer token, Content-Type).
  - `body` *(string/json)* : Données envoyées.
  - **Résultat :** Stocke le corps de réponse dans `((action.<key>))` ou permet l'extraction JSONPath.

---

## 9. Logic & Flow

Blocs de contrôle du flux d'exécution :

### `ifBlock`
Branchement conditionnel (Si / Alors / Sinon).
- **Structure :**
  - `condition.variable` : Variable de gauche (ex: `((user.id))`, `((action.code))`).
  - `condition.operator` : `equals`, `notEquals`, `contains`, `notContains`, `greaterThan`, `lessThan`, `isEmpty`, `isNotEmpty`, `matches`.
  - `condition.value` : Valeur de comparaison.
  - `thenActions` : Liste de blocs exécutés si la condition est vraie.
  - `elseActions` : Liste de blocs exécutés si la condition est fausse.

### `forLoop`
Répète une séquence d'actions un nombre déterminé de fois.
- **Paramètres :** `iterations` (nombre), `maxIterations` (limite de sécurité), `bodyActions`.

### `jsonForEachLoop`
Itère sur chaque élément d'un tableau JSON renvoyé par une API HTTP.
- **Paramètres :** `jsonArray`, `itemVariable`, `bodyActions`.

### `cooldown`
Bloque l'exécution si la commande est spammée.
- **Paramètres :** `duration` (ex: `30s`), `scope` (`user`, `guild`, `channel`, `global`), `errorMessage`.

### `wait`
Met l'exécution en pause pendant un laps de temps.
- **Paramètres :** `duration` (ex: `5s`, `2m`).

### `stop` / `stopUnless`
Interrompt immédiatement l'exécution du reste du workflow.

### `calculate`
Effectue un calcul mathématique complexe et enregistre le résultat.
- **Paramètres :** `expression` (ex: `10 * 5 + ((user.points))`).

---

## 10. Workflows & Scripts

- `runWorkflow` : Exécute un workflow modulaire indépendant en lui passant des arguments (`workflowName`, `entryPoint`, `arguments`).
- `runBdfdScript` : Exécute un extrait de script BDScript compilé à l'intérieur d'un bloc visuel.
- `runtimeJsonBlock` : Parse et manipule des objets JSON en mémoire.
- `runtimeImageBlock` / `canvas*Block` : Moteur de rendu graphique 2D Canvas (génération d'images de bienvenue, cartes de profil).
- `registerGuildCommands` / `unregisterGuildCommands` : Synchronise les commandes Slash auprès de Discord.

---

## 11. Music

Contrôles du lecteur audio Lavalink pour les bots musicaux :
- `joinVoice` / `leaveVoice` : Rejoindre ou quitter le salon vocal de l'utilisateur.
- `playMusic` : Lancer la lecture d'un titre ou d'une playlist (YouTube, SoundCloud, Spotify, URL directe).
- `pauseMusic` / `resumeMusic` : Mettre en pause ou reprendre la lecture.
- `skipMusic` / `stopMusic` : Passer au morceau suivant ou vider la file d'attente.
- `setMusicVolume` / `setMusicLoop` / `seekMusic` : Ajuster le volume, la boucle ou la position de lecture.
- `getMusicInfo` : Récupère le titre en cours, la durée et la progression.

---

## 12. Déclencheurs & Entry Points

Tout script ou workflow de blocs commence par un **Bloc d'Entrée** (EntryPoint) qui définit ce qui réveille le bot :

1. **Commande Slash (`interaction`)** : Déclenché par une commande d'application Discord (`/nom`). Déclare des arguments typés (`string`, `integer`, `user`, `channel`, `role`, `boolean`).
2. **Commande Préfixe (`message`)** : Déclenché par un message textuel classique commençant par un préfixe (ex: `!ping`). Supporte les alias.
3. **Événements Gateway (`event`)** : Déclenché par l'un des 50+ événements du catalogue Discord (`EventCatalog`) :
   - `guildMemberAdd` (Arrivée de membre)
   - `guildMemberRemove` (Départ de membre)
   - `messageCreate` (Nouveau message)
   - `messageReactionAdd` (Ajout de réaction)
   - `channelCreate` / `channelDelete` (Gestion de salons)
   - `voiceStateUpdate` (Activité en vocal)
   - `autoModerationActionExecution` (Alerte AutoMod)
