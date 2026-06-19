---
layout: doc
title: "Architecture — Le Moteur d'Exécution"
translation_key: docs
category: "Architecture"
description: >
  Documentation du moteur d'exécution BDFD Bot Creator : BotEngine, EventDispatcher,
  CommandExecutor, WorkflowExecutor et ActionHandler. Décrit le cycle de vie des bots,
  le routage des événements Discord, et l'exécution des actions compilées.
---

# Architecture — Le Moteur d'Exécution

Le moteur d'exécution est la couche runtime qui prend le relais après la compilation. Il gère le cycle de vie des bots, écoute les événements Discord, route les interactions, et exécute les listes d'actions produites par le transpiler.

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────┐
│                     MOTEUR D'EXÉCUTION BDFD                       │
│                                                                    │
│  ┌─────────────┐                                                  │
│  │  BotEngine   │  Cycle de vie (start/stop)                      │
│  └──────┬──────┘                                                  │
│         │ crée                                                    │
│         ▼                                                         │
│  ┌─────────────┐     ┌──────────────────┐                        │
│  │ BotSession   │────▶│ EventDispatcher   │  Écoute Discord       │
│  └─────────────┘     └────────┬─────────┘                        │
│                               │ route                             │
│                               ▼                                    │
│                      ┌──────────────────┐                        │
│                      │ CommandExecutor   │  Interactions          │
│                      └────────┬─────────┘                        │
│                               │ compile + exécute                 │
│                               ▼                                    │
│                      ┌──────────────────┐                        │
│                      │ WorkflowExecutor  │  Cœur runtime          │
│                      └────────┬─────────┘                        │
│                               │ itère sur actions                 │
│                               ▼                                    │
│                      ┌──────────────────┐                        │
│                      │ ActionHandler     │  Dispatch              │
│                      └────────┬─────────┘                        │
│                               │                                    │
│              ┌────────────────┼────────────────┐                 │
│              ▼                ▼                ▼                 │
│       MessagingExecutor  HttpExecutor   VariablesExecutor  ...   │
└──────────────────────────────────────────────────────────────────┘
```

---

## BotEngine

Le `BotEngine` est le point d'entrée principal pour la gestion du cycle de vie des bots.

### Cycle de vie

```
BotEngine.startWithId(botId, token)
        │
        ▼
  ┌─────────────────────────────────────────┐
  │  1. Récupération des données du bot     │
  │     (workflows, variables, config)      │
  └──────────────────┬──────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │  2. Création d'une BotSession           │
  │     - Initialise DiscordGateway         │
  │     - Configure les intents             │
  │     - Prépare le Store                  │
  └──────────────────┬──────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │  3. Connexion à la Gateway Discord      │
  │     - WebSocket handshake               │
  │     - Identify / Resume                 │
  │     - Heartbeat (keep-alive)            │
  └──────────────────┬──────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │  4. EventDispatcher.registerListeners() │
  │     - Enregistre tous les listeners     │
  └──────────────────┬──────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │  5. Bot en cours d'exécution (RUNNING)  │
  │     - Écoute les événements             │
  │     - Exécute les workflows             │
  └──────────────────┬──────────────────────┘
                     │
                     ▼
  ┌─────────────────────────────────────────┐
  │  6. BotEngine.stop(botId)               │
  │     - Déconnexion Gateway               │
  │     - Libération des ressources         │
  │     - Nettoyage du Store                │
  └─────────────────────────────────────────┘
```

### Méthodes clés

| Méthode | Description |
|---------|-------------|
| `startWithId(botId, token)` | Démarre un bot par son ID |
| `stop(botId)` | Arrête un bot proprement |
| `restart(botId)` | Redémarre un bot (stop + start) |
| `getSession(botId)` | Récupère la session active d'un bot |
| `isRunning(botId)` | Vérifie si un bot est en cours d'exécution |

---

## EventDispatcher

L'`EventDispatcher` est responsable de l'écoute des événements Discord et de leur routage vers les handlers BDFD appropriés.

### Listeners enregistrés

```
registerListeners(gateway, store)
  │
  ├── onInteractionCreate
  │     ├── Slash command exécuté → CommandExecutor.handleInteraction()
  │     ├── Autocomplete → CommandExecutor._handleAutocomplete()
  │     └── Component (bouton/select) → CommandExecutor._handleComponentInteraction()
  │
  ├── onMessageCreate
  │     └── Message avec prefix → CommandExecutor (legacy)
  │
  ├── onGuildMemberAdd
  │     └── Compile + exécute le workflow "onMemberJoin"
  │
  ├── onGuildMemberRemove
  │     └── Compile + exécute le workflow "onMemberLeave"
  │
  ├── onGuildMemberUpdate
  │     └── Compile + exécute le workflow "onMemberUpdate"
  │
  ├── onChannelCreate
  │     └── Compile + exécute le workflow "onChannelCreate"
  │
  ├── onChannelDelete
  │     └── Compile + exécute le workflow "onChannelDelete"
  │
  ├── onChannelUpdate
  │     └── Compile + exécute le workflow "onChannelUpdate"
  │
  ├── onMessageReactionAdd
  │     └── Compile + exécute le workflow "onReactionAdd"
  │
  ├── onVoiceStateUpdate
  │     └── Compile + exécute le workflow "onVoiceStateUpdate"
  │
  └── ... (autres événements Discord)
```

### Flux de traitement d'un événement

```
Événement Discord
       │
       ▼
EventDispatcher reçoit l'événement
       │
       ▼
Recherche du workflow BDFD associé (ex: "onMemberJoin")
       │
       ├── Workflow trouvé ──▶ Compilation BDFD → exécution actions
       │
       └── Pas de workflow ──▶ Ignore l'événement
```

---

## CommandExecutor

Le `CommandExecutor` gère toutes les interactions Discord : slash commands, autocomplete, et components (boutons, menus de sélection).

### Routage des interactions

```
handleInteraction(interaction)
       │
       ├── interaction.type == SLASH_COMMAND
       │     │
       │     ▼
       │   Recherche la commande dans le registre
       │     │
       │     ▼
       │   Vérifie les permissions (auteur, rôle, canal)
       │     │
       │     ▼
       │   Defer/ACK si nécessaire (opérations longues)
       │     │
       │     ▼
       │   Compile le code BDFD de la commande
       │     │
       │     ▼
       │   WorkflowExecutor.executeBdfd(source, context)
       │
       ├── interaction.type == AUTOCOMPLETE
       │     │
       │     ▼
       │   _handleAutocomplete()
       │   → Compile BDFD → résout les suggestions → répond
       │
       └── interaction.type == COMPONENT
             │
             ▼
           _handleComponentInteraction()
           → Extrait customId → compile BDFD → exécute actions
```

### Gestion du Defer/Ack

Pour les commandes qui prennent du temps, le système peut différer la réponse :

```
1. defer() → "Le bot réfléchit..." (acknowledgement temporaire)
2. Compilation + exécution des actions (max 15 min)
3. editOriginalResponse() → résultat final
```

### Debug Replay

Le `CommandExecutor` supporte un mode debug replay qui permet de rejouer une interaction précédente avec le même contexte (utile pour le développement et le débogage).

---

## WorkflowExecutor

Le `WorkflowExecutor` est le cœur du runtime. Il orchestre l'exécution des actions compilées.

### Flux d'exécution principal

```
executeBdfd(source, context)
       │
       ▼
┌──────────────────────────────┐
│ 1. Compilation               │
│    BdfdCompiler.compile()    │
│    → BdfdCompileResult       │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 2. Transpilation             │
│    BdfdAstTranspiler         │
│    .transpile(script)        │
│    → List<Action>            │
└──────────────┬───────────────┘
               │
               ▼
┌──────────────────────────────┐
│ 3. executeActions()          │
│    → hydrateRuntimeVariables │
│    → ActionHandler           │
│      .handleActions()        │
└──────────────────────────────┘
```

### `executeActions(actions, context)`

```
executeActions(actions, context)
  │
  ├── 1. hydrateRuntimeVariables(context)
  │     Remplace les placeholders ((...)) par les valeurs runtime
  │     Injecte les variables scopées (user, guild, channel, etc.)
  │
  ├── 2. Pour chaque Action :
  │       ActionHandler.handleAction(action, context)
  │       │
  │       └── Accumule les résultats dans context.results
  │
  └── 3. Retourne le résultat final
```

### Injection des variables runtime (hydrateRuntimeVariables)

Les placeholders `((...))` dans les payloads d'action sont remplacés par leurs valeurs réelles :

```
Avant hydratation :
  payload.content = "Hello ((username)), bienvenue sur ((guildName))"

Après hydratation :
  payload.content = "Hello Jean, bienvenue sur Mon Super Serveur"
```

Sources de variables runtime :
- **Variables scopées** : user, guild, channel, member, message
- **Variables utilisateur** : définies via `$setVar`, `$getVar`
- **Résultats d'actions précédentes** : `((key))` dans le Map `results`

### Workflows imbriqués

Un workflow peut appeler un autre workflow (sous-workflow), ce qui crée une chaîne d'exécution :

```
Workflow "parent"
  → Action: callWorkflow("enfant", args)
    → WorkflowExecutor.executeBdfd("enfant", childContext)
      → List<Action> du workflow enfant
      → Résultats remontés au parent
```

---

## ActionHandler (`actions/handler.dart`)

L'`ActionHandler` est la boucle principale de dispatch des actions.

### Boucle d'exécution

```
handleActions(actions, context)
  │
  ├── Initialise les résultats (Map<String, String>)
  │
  └── Pour chaque Action dans actions :
        │
        ├── Vérifie les gardes (skipActions, stop)
        │
        ├── Dispatch selon action.type :
        │
        │   BotCreatorActionType.sendMessage    → MessagingExecutor.execute()
        │   BotCreatorActionType.editMessage    → MessagingExecutor.execute()
        │   BotCreatorActionType.deleteMessage  → MessagingExecutor.execute()
        │   BotCreatorActionType.sendEmbed      → MessagingExecutor.execute()
        │   BotCreatorActionType.httpRequest    → HttpExecutor.execute()
        │   BotCreatorActionType.setVariable    → VariablesExecutor.execute()
        │   BotCreatorActionType.getVariable    → VariablesExecutor.execute()
        │   BotCreatorActionType.ifBlock         → ControlFlowExecutor.execute()
        │   BotCreatorActionType.forLoop         → ControlFlowExecutor.execute()
        │   BotCreatorActionType.tryBlock        → ControlFlowExecutor.execute()
        │   BotCreatorActionType.stop            → ControlFlowExecutor.execute()
        │   BotCreatorActionType.skipActions     → ControlFlowExecutor.execute()
        │   BotCreatorActionType.playMusic       → LavalinkExecutor.execute()
        │   BotCreatorActionType.pauseMusic      → LavalinkExecutor.execute()
        │   BotCreatorActionType.skipMusic       → LavalinkExecutor.execute()
        │   BotCreatorActionType.banMember       → ModerationRolesExecutor.execute()
        │   BotCreatorActionType.kickMember      → ModerationRolesExecutor.execute()
        │   BotCreatorActionType.muteMember      → ModerationRolesExecutor.execute()
        │   BotCreatorActionType.addRole         → ModerationRolesExecutor.execute()
        │   BotCreatorActionType.removeRole      → ModerationRolesExecutor.execute()
        │   BotCreatorActionType.createChannel   → ChannelsExecutor.execute()
        │   BotCreatorActionType.deleteChannel   → ChannelsExecutor.execute()
        │   BotCreatorActionType.modifyChannel   → ChannelsExecutor.execute()
        │   BotCreatorActionType.addReaction     → ReactionsExecutor.execute()
        │   BotCreatorActionType.removeReaction  → ReactionsExecutor.execute()
        │   BotCreatorActionType.executeWebhook  → WebhooksExecutor.execute()
        │   BotCreatorActionType.createWebhook   → WebhooksExecutor.execute()
        │   BotCreatorActionType.calculate       → CalculateExecutor.execute()
        │   BotCreatorActionType.drawImage       → ImageExecutor.execute()
        │   BotCreatorActionType.sendComponent   → ComponentsInteractionsExecutor.execute()
        │   ... (autres types)
        │
        └── Accumule les résultats
              result["lastMessageId"] = message.id
              result["httpResponse"] = http.body
              ...
```

### Le Map `results`

Les `results` sont un `Map<String, String>` qui s'enrichit au fil de l'exécution. Chaque action peut y écrire des résultats que les actions suivantes peuvent référencer via `((key))`.

```
Action 1: $sendMessage[Hello]     → results["lastMessageId"] = "123456789"
Action 2: $addReaction[((lastMessageId));👍] → utilise le résultat de l'action 1
Action 3: $httpRequest[...]        → results["httpResponse"] = "{...json...}"
Action 4: $sendMessage[((httpResponse))] → utilise le résultat HTTP
```

### Contexte passé aux executors

Chaque appel à un executor reçoit :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `gateway` | `DiscordGateway` | Connexion à l'API REST et Gateway Discord |
| `interaction` | `Interaction?` | Interaction en cours (null si événement automatique) |
| `action` | `Action` | L'action à exécuter (type + payload) |
| `store` | `Store` | Magasin de données persistant du bot |
| `botId` | `String` | Identifiant Snowflake du bot |
| `variables` | `VariablesMap` | Variables scopées (user, guild, channel, etc.) |
| `results` | `Map<String, String>` | Résultats cumulés, mutables |

---

## Fichiers source référencés

| Fichier | Rôle |
|---------|------|
| `bot_engine.dart` | Gestion du cycle de vie des bots (start/stop/restart) |
| `bot_session.dart` | Représentation d'une session de bot active |
| `event_dispatcher.dart` | Écoute et routage des événements Discord |
| `command_executor.dart` | Gestion des interactions Discord |
| `workflow_executor.dart` | Exécution des listes d'actions (cœur runtime) |
| `actions/handler.dart` | Dispatch des actions vers les executors |
