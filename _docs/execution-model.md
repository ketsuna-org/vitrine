---
layout: doc
title: Execution Model and Compatibility Guide
category: "Meta"
api_type: general
description: Comprehensive execution model for Bot Creator. Understand the Discord interaction lifecycle, implicit slash replies, variables, ticket systems, and rules for LLMs.
permalink: /docs/execution-model/
---

# Execution Model and Compatibility Guide

Bot Creator offers three authoring modes sharing a unified execution runtime. Understanding how the runtime handles Discord interactions, variables, and action boundaries prevents broken commands and ensures 100% reliable bots.

| Mode | Format | Execution Engine | Primary Reference |
|---|---|---|---|
| **Blocks** | Visual cards / JSON actions | Native Dart Engine | [Blocks Guide](/docs/blocks/) & [Dictionary](/docs/blocks-dictionary/) |
| **BDScript (BDFD)** | Text & `$functions` | AST Transpiler -> Actions | [Function Reference](/docs/) |
| **BDJS (JavaScript)** | JavaScript ES6+ | QuickJS / Node Sandbox | [JavaScript API](/docs/javascript/) |

---

## 1. Discord Interaction Lifecycle & Slash Replies

Discord interactions (Slash Commands, Buttons, Select Menus, Modals) have strict protocol constraints:
1. **Initial Acknowledgment (3-second deadline):**
   - The Bot Creator runner automatically acknowledges/defers the interaction upon receipt via `interaction.acknowledge()`, preventing Discord from reporting "The application did not respond" (unless a modal is present, which must be sent as the immediate initial response).
2. **Implicit Slash Response in BDScript:**
   - Text written outside functions and embed/component declarations are gathered into a pending response buffer.
   - When the script finishes (or at action boundaries), the engine transmits this buffer as the interaction reply (`respondWithMessage`).
   - **Do NOT write `$sendMessage` in a slash command** simply to reply:

```bdfd
;; ✅ CORRECT: Implicit native reply
Bonjour $username ! Bienvenue sur $serverName.
```

```bdfd
;; ✅ CORRECT: Embed-only native reply
$title[Règles du Serveur]
$description[Respectez les autres membres.]
$color[#5865F2]
```

```bdfd
;; ❌ INCORRECT: Inutile et risque de double envoi ou conflit d'acquittement
Bonjour $username !
$sendMessage[Bonjour $username !]
```

3. **Ephemeral Visibility:**
   - To make an interaction reply private (visible only to the user who triggered it), simply add the `$ephemeral` flag in BDFD:
   ```bdfd
   $ephemeral
   Ce message n'est visible que par vous.
   ```
   - In Blocks, set `"ephemeral": true` on the `respondWithMessage` action.

4. **Interaction Reply vs Channel Send:**
   - **Replying to the interaction**: Use raw text / `$ephemeral` in BDFD, or `respondWithMessage` in Blocks.
   - **Sending a message in another channel**: Use `$channelSendMessage[channelID;content]` in BDFD, or `sendMessage` with `channelId` in Blocks.
   - Autonomous background workflows (e.g. timers, webhooks) have no active interaction: they must always target an explicit channel via `sendMessage`.

---

## 2. Variables & State Management (No `$let`!)

> [!CAUTION]
> **Syntaxe fantôme `$let` :** La syntaxe `$let[...]` **N'EXISTE PAS** dans le moteur Bot Creator. Toute tentative d'utilisation déclenche une erreur de diagnostic immédiate à la compilation.

Bot Creator distinguishes two types of variables:

### A. Temporary Execution Variables (`$var`)
Scoped exclusively to the current command invocation. Lost when the command finishes.

- **Écriture (BDScript):** `$var[nom;valeur]`
- **Lecture (BDScript):** `$var[nom]`
- **Blocs:** Action `setTemporaryVariable` (`name`, `value`).

```bdfd
$var[userCount;$membersCount]
$var[greeting;Bienvenue]

$var[greeting] à tous nos $var[userCount] membres !
```

### B. Persistent Database Variables (`$setVar` / Scoped Storage)
Saved in the bot's cloud or SQLite database across restarts and server reloads.

- **Variables Globales:**
  - BDScript : `$setVar[key;value]` / `$getVar[key]`
  - Blocs : `setGlobalVariable` / `getGlobalVariable`
- **Variables Scopées par Utilisateur:**
  - BDScript : `$setUserVar[key;value]` / `$getUserVar[key]`
  - Blocs : `setScopedVariable` (`scope: user`) / `getScopedVariable`
- **Variables Scopées par Serveur (Guild):**
  - BDScript : `$setServerVar[key;value]` (ou `$setGuildVar`) / `$getServerVar[key]`
  - Blocs : `setScopedVariable` (`scope: guild`) / `getScopedVariable`
- **Variables Scopées par Membre (Guild + User):**
  - BDScript : `$setMemberVar[key;value]` / `$getMemberVar[key]`
- **Variables Scopées par Salon:**
  - BDScript : `$setChannelVar[key;value]` / `$getChannelVar[key]`

---

## 3. Options de Commandes Slash

In Bot Creator, options passed to a slash command (`/ban @user raison:spam`) are injected directly into the runtime environment:

- **Valeur textuelle / brute :** `((opts.<nom_option>))` (ex: `((opts.raison))`)
- **Identifiant Snowflake (Utilisateur, Salon, Rôle) :** `((opts.<nom_option>.id))` (ex: `((opts.cible.id))`)
- **Fallback positionnel :** `((arg.1))`, `((arg.2))`

> [!NOTE]
> Ne cherchez pas de fonction `$slashOption[...]`. L'accès aux options se fait nativement via les placeholders `((opts.nom))` en BDFD et en Blocs.

---

## 4. Système de Tickets Discord

Ne vous fiez pas aux fonctions historiques incomplètes `$newTicket` et `$closeTicket`. Pour créer un système de tickets robuste en production :
1. Créez une catégorie privée fermée à `@everyone`.
2. Utilisez `createChannel` (avec `categoryId`) pour créer le salon.
3. Configurez les permissions avec `editChannelPermissions` (`allow: 68608` pour le membre).
4. Envoyez le message de bienvenue avec un bouton de fermeture (`customId: close_ticket`).
5. Fermez et supprimez le salon avec `removeChannel`.

Consultez le tutoriel complet : **[Guide Complet du Système de Tickets](/docs/tickets/)**.

---

## 5. Règles d'Or pour les Modèles de Langage (LLMs / MCP)

1. **Séparation Stricte :** Ne mélangez jamais le JSON des Blocs avec la syntaxe BDFD. Un bloc `sendMessage` prend un payload JSON `{ "content": "..." }`, pas une chaîne `$sendMessage[...]`.
2. **Zéro Fonctions Inventées :** Ne documentez et ne proposez jamais de fonctions comme `$let`, `$sendResponse`, `$respondWithMessage`, ou `$slashOption`.
3. **Respectez le statut `incomplete` :** Avertissez toujours l'utilisateur des limites des fonctions marquées comme incomplètes (`$newTicket`, `$closeTicket`).
4. **Acquittement Propre :** Dans les Slash Commands, privilégiez toujours la réponse native ou éphémère (`$ephemeral`) sans doubler par un `$sendMessage`.
