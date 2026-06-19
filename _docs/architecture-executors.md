---
layout: doc
title: "Architecture — Les Executors d'Actions"
translation_key: docs
category: "Architecture"
description: >
  Documentation des executors d'actions du moteur BDFD Bot Creator. Décrit chaque
  executor spécialisé, son rôle, les actions qu'il gère, et le contexte d'exécution
  partagé (gateway, interaction, action, store, variables, results).
---

# Architecture — Les Executors d'Actions

Les executors sont les composants terminaux du pipeline BDFD. Chaque executor est responsable d'une catégorie spécifique d'actions et interagit directement avec l'API Discord ou les services externes.

## Vue d'ensemble

```
┌───────────────────────────────────────────────────────────────────┐
│                        EXECUTORS D'ACTIONS                         │
│                                                                     │
│                        ┌─────────────────┐                         │
│                        │  ActionHandler   │                         │
│                        │  handleActions() │                         │
│                        └────────┬────────┘                         │
│                                 │ dispatch par action.type          │
│                                 │                                   │
│     ┌───────────────────────────┼───────────────────────────┐      │
│     │                           │                           │      │
│     ▼                           ▼                           ▼      │
│  ┌────────────┐          ┌────────────┐          ┌────────────┐   │
│  │ Messaging  │          │   HTTP     │          │ Variables  │   │
│  │ Executor   │          │ Executor   │          │ Executor   │   │
│  └────────────┘          └────────────┘          └────────────┘   │
│                                                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │ Control    │  │ Lavalink   │  │  Image     │  │ Webhooks   │   │
│  │ Flow       │  │ Executor   │  │ Executor   │  │ Executor   │   │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │
│                                                                    │
│  ┌────────────┐  ┌────────────┐  ┌────────────┐  ┌────────────┐   │
│  │ Channels   │  │ Moderation │  │ Reactions  │  │ Calculate  │   │
│  │ Executor   │  │ / Roles    │  │ Executor   │  │ Executor   │   │
│  └────────────┘  └────────────┘  └────────────┘  └────────────┘   │
│                                                                    │
│  ┌────────────┐  ┌────────────┐                                    │
│  │ Components │  │ Operations │                                    │
│  │ Executor   │  │ Expander   │                                    │
│  └────────────┘  └────────────┘                                    │
└───────────────────────────────────────────────────────────────────┘
```

## Contexte partagé

Tous les executors reçoivent le même contexte d'exécution :

```
┌──────────────────────────────────────────────────────────────┐
│                     CONTEXTE D'EXÉCUTION                       │
│                                                                │
│  gateway       ──▶ Connexion à l'API Discord (REST + Gateway) │
│  interaction?  ──▶ Interaction en cours (nullable)            │
│  action        ──▶ Action à exécuter (type + payload)         │
│  store         ──▶ Magasin de données persistant du bot       │
│  botId         ──▶ Identifiant Snowflake du bot               │
│  variables     ──▶ Variables scopées runtime                  │
│  results       ──▶ Map<String, String> cumulatif              │
│                                                                │
└──────────────────────────────────────────────────────────────┘
```

### Le Map `results`

Les `results` s'accumulent au fil des actions. C'est un `Map<String, String>` mutable partagé entre tous les executors. Après chaque action, l'executor peut y écrire des clés que les actions suivantes référencent via `((key))` :

```
┌─────────────────────────────────────────────────────────────┐
│  Action 1: $sendMessage[...]                                 │
│    → results["lastMessageId"] = "123456789"                  │
│    → results["lastChannelId"] = "987654321"                  │
│                                                              │
│  Action 2: $addReaction[((lastMessageId));((lastChannelId));👍]│
│    → utilise les résultats de l'action 1                     │
│                                                              │
│  Action 3: $httpRequest[...]                                 │
│    → results["httpStatus"] = "200"                           │
│    → results["httpBody"] = "{...json...}"                    │
│                                                              │
│  Action 4: $sendMessage[Status: ((httpStatus))]              │
│    → utilise les résultats de l'action 3                     │
└─────────────────────────────────────────────────────────────┘
```

---

## Executors détaillés

### 1. MessagingExecutor

**Fichier** : `actions/executors/messaging_executor.dart`

Gère toutes les actions liées aux messages Discord.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `sendMessage` | `$sendMessage[contenu]` | Envoie un message dans le canal courant |
| `sendEmbed` | `$sendEmbed[...]` | Envoie un embed (message riche) |
| `editMessage` | `$editMessage[id;contenu]` | Modifie un message existant |
| `deleteMessage` | `$deleteMessage[id]` | Supprime un message |
| `reply` | `$reply[contenu]` | Répond au message/interaction |
| `sendDM` | `$sendDM[userId;contenu]` | Envoie un message privé |
| `crosspostMessage` | `$crosspostMessage[id]` | Publie un message d'annonce |

**Payload typique** :
```json
{
  "channelId": "((channel))",
  "content": "Hello $username",
  "embeds": [{ "title": "...", "description": "...", "color": 16711680 }],
  "components": [{ "type": 1, "components": [...] }],
  "allowedMentions": { "parse": [] }
}
```

**Résultats produits** :
- `lastMessageId` — ID du message envoyé/édité
- `lastChannelId` — ID du canal utilisé

---

### 2. ComponentsInteractionsExecutor

Gère les composants interactifs Discord : boutons, menus de sélection, modals.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `sendComponent` | Via `$sendMessage` avec components | Envoie un message avec des composants |
| `createButton` | `$createButton[...]` | Crée un bouton |
| `createSelectMenu` | `$createSelectMenu[...]` | Crée un menu de sélection |
| `createModal` | `$createModal[...]` | Crée une fenêtre modale |

**Fonctionnement** :
```
$sendMessage[Contenu]
$addButton[labe;style;customId;emoji?;disabled?;url?]
$addSelectMenu[customId;placeholder;minValues;maxValues;options...]
  → Le transpiler construit un payload components
  → MessagingExecutor envoie le message avec les composants
  → Discord affiche les boutons/menus
  → L'utilisateur clique → interaction component
  → EventDispatcher → CommandExecutor._handleComponentInteraction()
  → Le BDFD associé au customId est exécuté
```

---

### 3. VariablesExecutor

**Fichier** : `actions/executors/variables_executor.dart`

Gère la lecture et l'écriture des variables.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `setVariable` | `$setVar[nom;valeur]` | Définit une variable |
| `getVariable` | `$getVar[nom]` | Lit une variable |
| `deleteVariable` | `$deleteVar[nom]` | Supprime une variable |
| `incrementVariable` | `$incrementVar[nom]` | Incrémente une variable numérique |
| `decrementVariable` | `$decrementVar[nom]` | Décrémente une variable numérique |

**Portées (scopes) des variables** :

| Scope | Préfixe | Persistance | Exemple |
|-------|---------|------------|---------|
| **Global** | — | Permanente (store) | `$setVar[count;10]` |
| **User** | `user_` | Par utilisateur | `$setUserVar[count;10]` |
| **Guild** | `guild_` | Par serveur | `$setGuildVar[welcome;on]` |
| **Channel** | `channel_` | Par canal | `$setChannelVar[topic;...]` |
| **Member** | `member_` | Par membre | `$setMemberVar[warns;3]` |
| **Message** | `message_` | Par message | `$setMessageVar[tag;important]` |
| **Temp** | `temp_` | Session courante | `$let[tmp;valeur]` |

**Stockage** : Les variables persistantes sont stockées dans le `Store` du bot (base de données locale ou distante).

---

### 4. ControlFlowExecutor

**Fichier** : `actions/executors/control_flow_executor.dart`

Gère les structures de contrôle de flux.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `ifBlock` | `$if[condition]...$endif` | Bloc conditionnel |
| `forLoop` | `$for[valeur;separator]...$endFor` | Boucle d'itération |
| `tryBlock` | `$try...$endTry` | Bloc try/catch |
| `stop` | `$stop` | Arrête l'exécution du workflow |
| `skipActions` | `$skipActions` | Ignore les actions restantes |
| `break` | `$break` | Sort d'une boucle |
| `continue_` | `$continue` | Passe à l'itération suivante |

**Fonctionnement du $if** :
```
$if[condition]
  actions si vrai
$elseIf[autre condition]
  actions si autre condition vraie
$else
  actions si faux
$endif

→ ControlFlowExecutor évalue la condition
→ Exécute récursivement le bloc approprié
→ Passe au bloc suivant après $endif
```

**Fonctionnement du $for** :
```
$for[valeur1;valeur2;valeur3]
  $sendMessage[Élément : $forValue]
$endFor

→ ControlFlowExecutor itère sur chaque élément
→ Pour chaque itération, définit $forValue et $forIndex
→ Exécute le corps de la boucle
```

---

### 5. HttpExecutor

**Fichier** : `actions/executors/http_executor.dart`

Gère les requêtes HTTP vers des APIs externes.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `httpRequest` | `$httpRequest[url]` | Requête HTTP (GET par défaut) |
| `httpGet` | `$httpGet[url]` | Requête GET |
| `httpPost` | `$httpPost[url;body]` | Requête POST |
| `httpPut` | `$httpPut[url;body]` | Requête PUT |
| `httpDelete` | `$httpDelete[url]` | Requête DELETE |
| `httpPatch` | `$httpPatch[url;body]` | Requête PATCH |

**Headers HTTP** : Configurables via `$httpHeader[nom;valeur]` avant la requête.

**Résultats produits** :
- `httpStatus` — Code de statut HTTP (200, 404, etc.)
- `httpBody` — Corps de la réponse
- `httpHeaders` — Headers de réponse
- `httpError` — Message d'erreur (si échec)

---

### 6. LavalinkExecutor

**Fichier** : `actions/executors/lavalink_executor.dart`

Gère la lecture de musique via Lavalink (serveur audio).

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `playMusic` | `$playMusic[query]` | Joue une piste (YouTube, SoundCloud, etc.) |
| `pauseMusic` | `$pauseMusic` | Met en pause |
| `resumeMusic` | `$resumeMusic` | Reprend la lecture |
| `skipMusic` | `$skipMusic` | Passe à la piste suivante |
| `stopMusic` | `$stopMusic` | Arrête la lecture et vide la queue |
| `setVolume` | `$setVolume[niveau]` | Règle le volume (0-200) |
| `queueMusic` | `$queueMusic[query]` | Ajoute à la file d'attente |
| `seekMusic` | `$seekMusic[secondes]` | Se positionne dans la piste |

**Flux audio** :
```
Discord Voice Channel
       │
       ▼
┌──────────────┐     ┌──────────────┐     ┌──────────────┐
│ Gateway       │────▶│ Lavalink     │────▶│ YouTube /    │
│ (Voice WS)    │     │ Server       │     │ SoundCloud   │
└──────────────┘     └──────────────┘     └──────────────┘
```

---

### 7. ImageExecutor

**Fichier** : `actions/executors/image_executor.dart`

Gère la création et manipulation d'images via canvas.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `drawImage` | `$drawImage[...]` | Crée/dessine une image |
| `drawText` | Via `$drawImage` | Ajoute du texte sur l'image |
| `compositeImages` | Via `$drawImage` | Superpose des images |
| `createImage` | `$createImage[largeur;hauteur]` | Crée un canvas vierge |

**Pipeline image** :
```
$createImage[512;512]
$drawImage[avatar;$authorAvatar]     ← charge l'avatar comme source
$drawText[Bienvenue $username;...]   ← ajoute du texte
$compositeImages[...]                ← superpose
$sendMessage[$image]                 ← envoie l'image finale

→ ImageExecutor construit un buffer PNG
→ Le buffer est attaché au message via MessagingExecutor
```

---

### 8. WebhooksExecutor

Gère la création et l'envoi de webhooks Discord.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `createWebhook` | `$createWebhook[nom;avatar?]` | Crée un webhook |
| `executeWebhook` | `$webhookSend[url;contenu]` | Envoie via un webhook |
| `deleteWebhook` | `$deleteWebhook[url]` | Supprime un webhook |

---

### 9. ChannelsExecutor

Gère la création, modification et suppression de salons Discord.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `createChannel` | `$createChannel[nom;type]` | Crée un salon |
| `deleteChannel` | `$deleteChannel[id]` | Supprime un salon |
| `modifyChannel` | `$modifyChannel[id;...]` | Modifie un salon |
| `setChannelTopic` | `$setChannelTopic[id;sujet]` | Change le sujet |
| `setChannelName` | `$setChannelName[id;nom]` | Renomme un salon |

**Résultats produits** :
- `createdChannelId` — ID du salon créé

---

### 10. ModerationRolesExecutor

Gère les actions de modération et de gestion des rôles.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `banMember` | `$banMember[userId;raison?]` | Bannit un membre |
| `kickMember` | `$kickMember[userId;raison?]` | Expulse un membre |
| `muteMember` | `$muteMember[userId;durée?]` | Rend muet un membre |
| `unmuteMember` | `$unmuteMember[userId]` | Rétablit la parole |
| `addRole` | `$addRole[userId;roleId]` | Ajoute un rôle |
| `removeRole` | `$removeRole[userId;roleId]` | Retire un rôle |
| `setNickname` | `$setNickname[userId;pseudo]` | Change le pseudo |

---

### 11. ReactionsExecutor

Gère les réactions aux messages.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `addReaction` | `$addReaction[messageId;emoji]` | Ajoute une réaction |
| `removeReaction` | `$removeReaction[messageId;emoji]` | Retire une réaction |
| `removeAllReactions` | `$removeAllReactions[messageId]` | Retire toutes les réactions |

---

### 12. CalculateExecutor

**Fichier** : `actions/executors/calculate_executor.dart`

Gère les expressions mathématiques.

| Action | Fonction BDFD | Description |
|--------|--------------|-------------|
| `calculate` | `$math[expression]` | Évalue une expression mathématique |
| `random` | `$random[min;max]` | Nombre aléatoire |
| `round` | `$round[nombre]` | Arrondit un nombre |

**Opérations supportées** : `+`, `-`, `*`, `/`, `%`, `^`, `sqrt`, `abs`, `sin`, `cos`, `tan`, `log`, `floor`, `ceil`, `min`, `max`, `round`.

---

### 13. OperationsExpander

**Rôle** : Composant transverse qui résout les placeholders runtime `((...))` et les opérations complexes (concaténation, transformations de texte, etc.) avant que les executors ne traitent les payloads.

```
Payload avant expansion :
  content: "((username)) a ((count)) messages. Date: ((date))"

OperationsExpander :
  → Remplace ((username)) par la variable scopée username
  → Remplace ((count)) par la variable globale count
  → Remplace ((date)) par le résultat d'une opération date

Payload après expansion :
  content: "Jean a 42 messages. Date: 18/06/2026"
```

---

## Diagramme d'interaction entre executors

```
┌──────────────────────────────────────────────────────────────────┐
│                    EXÉCUTION D'UN WORKFLOW                        │
│                                                                    │
│  Workflow: "bienvenue"                                             │
│  BDFD:                                                             │
│    $sendMessage[Bienvenue $username!]                              │
│    $addReaction[((lastMessageId));👋]                              │
│    $httpGet[https://api.example.com/stats/((guildId))]             │
│    $sendMessage[Stats: ((httpBody))]                               │
│                                                                    │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Étape 1: MessagingExecutor                                   │  │
│  │   sendMessage "Bienvenue Jean!"                              │  │
│  │   → results["lastMessageId"] = "111222333"                   │  │
│  └─────────────────────────────────────────────────────────────┘  │
│        │                                                           │
│        ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Étape 2: ReactionsExecutor                                   │  │
│  │   addReaction "111222333" avec 👋                             │  │
│  │   → utilise ((lastMessageId)) = "111222333"                  │  │
│  └─────────────────────────────────────────────────────────────┘  │
│        │                                                           │
│        ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Étape 3: HttpExecutor                                        │  │
│  │   GET https://api.example.com/stats/987654321                │  │
│  │   → results["httpBody"] = "{...json...}"                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
│        │                                                           │
│        ▼                                                           │
│  ┌─────────────────────────────────────────────────────────────┐  │
│  │ Étape 4: MessagingExecutor                                   │  │
│  │   sendMessage "Stats: {...json...}"                          │  │
│  │   → utilise ((httpBody))                                     │  │
│  └─────────────────────────────────────────────────────────────┘  │
└──────────────────────────────────────────────────────────────────┘
```

---

## Fichiers source référencés

| Fichier | Rôle |
|---------|------|
| `actions/handler.dart` | Dispatch central des actions |
| `actions/executors/messaging_executor.dart` | Envoi/édition/suppression de messages |
| `actions/executors/http_executor.dart` | Requêtes HTTP |
| `actions/executors/variables_executor.dart` | Lecture/écriture de variables |
| `actions/executors/control_flow_executor.dart` | Structures de contrôle |
| `actions/executors/lavalink_executor.dart` | Lecture de musique |
| `actions/executors/image_executor.dart` | Canvas d'image |
| `actions/executors/webhooks_executor.dart` | Webhooks Discord |
| `actions/executors/channels_executor.dart` | Gestion des salons |
| `actions/executors/moderation_roles_executor.dart` | Modération et rôles |
| `actions/executors/reactions_executor.dart` | Réactions aux messages |
| `actions/executors/calculate_executor.dart` | Expressions mathématiques |
| `actions/executors/components_interactions_executor.dart` | Composants interactifs |
| `actions/executors/operations_expander.dart` | Expansion des placeholders runtime |
