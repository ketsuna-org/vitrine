---
layout: doc
title: "Architecture — Vue d'ensemble du pipeline BDFD"
translation_key: docs
category: "Architecture"
description: >
  Vue d'ensemble du pipeline complet de compilation et d'exécution d'un script BDFD
  jusqu'aux actions Discord. Explique comment le code source BDFD est tokenisé, parsé,
  transpilé en actions, puis exécuté par le moteur de runtime.
---

# Architecture — Vue d'ensemble du pipeline BDFD

Ce document décrit le pipeline complet qui transforme un script BDFD (Bot Designer For Discord) en appels concrets à l'API Discord, en passant par toutes les couches du moteur **BDFD Bot Creator**.

## Flux global

```
┌─────────────────────────────────────────────────────────────────────┐
│                        PIPELINE BDFD → DISCORD                       │
│                                                                     │
│  Source BDFD                                                         │
│  ($sendMessage[Hello])                                               │
│       │                                                              │
│       ▼                                                              │
│  ┌──────────────┐    ┌──────────────┐    ┌─────────────────────┐     │
│  │   Lexer       │───▶│   Parser      │───▶│   Transpiler        │     │
│  │ (tokens)      │    │ (AST)         │    │ (List<Action>)      │     │
│  └──────────────┘    └──────────────┘    └─────────────────────┘     │
│                                                  │                   │
│       ┌──────────────────────────────────────────┘                   │
│       ▼                                                              │
│  ┌──────────────────┐    ┌──────────────────┐    ┌──────────────┐   │
│  │ WorkflowExecutor  │───▶│ ActionHandler     │───▶│ Executors     │   │
│  │ executeActions()  │    │ dispatch(type)    │    │ spécialisés   │   │
│  └──────────────────┘    └──────────────────┘    └──────────────┘   │
│                                                          │          │
│                                                          ▼          │
│                                                   ┌──────────────┐   │
│                                                   │ Discord API   │   │
│                                                   │ (messages,    │   │
│                                                   │  embeds,      │   │
│                                                   │  components,  │   │
│                                                   │  etc.)        │   │
│                                                   └──────────────┘   │
└─────────────────────────────────────────────────────────────────────┘
```

## Couche 1 : Compilation (BDFD → AST → Actions)

### `bdfd_compiler.dart`

Orchestrateur de la chaîne de compilation. Il enchaîne trois phases :

| Phase | Fichier source | Rôle |
|-------|---------------|------|
| **Lexer** | `bdfd_lexer.dart` | Tokenise le code source BDFD |
| **Parser** | `bdfd_parser.dart` + `bdfd_ast.dart` | Construit l'AST |
| **Transpiler** | `bdfd_ast_transpiler.dart` | Transforme l'AST en `List<Action>` |

Le compilateur expose principalement `BdfdCompiler.compile(source)` qui retourne un `BdfdCompileResult` contenant la liste d'actions prêtes à être exécutées.

### `bdfd_ast_transpiler.dart` — Fichier maître du transpiler

Ce fichier est le point d'entrée du transpiler. Il utilise le **Dart part system** pour inclure 9 fichiers satellites :

```
bdfd_ast_transpiler.dart
  ├── part 'core.dart'              — Classe _BdfdAstTranspilationScope, _PendingResponse
  ├── part 'dispatch.dart'          — _transpileStandaloneFunction (switch géant)
  ├── part 'inline_runtime.dart'    — _transpileInlineFunction (valeurs retournées)
  ├── part 'runtime_builders.dart'  — Builders pour actions runtime
  ├── part 'action_builders.dart'   — Builders pour actions (moderation, channels, etc.)
  ├── part 'inline_helpers.dart'    — Helpers d'évaluation inline
  ├── part 'models.dart'            — Modèles de données, placeholders
  ├── part 'control_flow.dart'      — Gestion $if/$else, boucles, gardes
  └── part 'image_canvas.dart'      — Canvas d'image BDFD
```

## Couche 2 : Moteur d'exécution

### `BotEngine`

Gère le cycle de vie des bots. Point d'entrée principal :

```
BotEngine.startWithId(botId, token)
  → Crée une BotSession
  → Connecte la gateway Discord
  → Enregistre les listeners (EventDispatcher)
  → Lance le bot
BotEngine.stop(botId)
  → Déconnecte la gateway
  → Libère les ressources
```

### `EventDispatcher`

Écoute les événements Discord et les route vers les handlers appropriés :

```
registerListeners()
  ├── onInteractionCreate    → Slash commands, autocomplete, components
  ├── onMessageCreate        → Commandes prefix (legacy)
  ├── onGuildMemberAdd       → Événements d'arrivée de membres
  ├── onGuildMemberRemove    → Événements de départ de membres
  ├── onGuildMemberUpdate    → Événements de modification de membres
  ├── onChannelCreate        → Création de salon
  ├── onChannelDelete        → Suppression de salon
  ├── onChannelUpdate        → Modification de salon
  └── ...                    → Autres événements Discord
```

Chaque événement déclenche la compilation du BDFD associé puis l'exécution des actions.

### `CommandExecutor`

Gère les interactions Discord (slash commands, autocomplete, components) :

```
handleInteraction(interaction)
  ├── Slash command      → compile BDFD → WorkflowExecutor.executeBdfd()
  ├── Autocomplete       → _handleAutocomplete()
  └── Component          → _handleComponentInteraction()
       (bouton, select)
```

Gère également le **defer/ack** des interactions (réponse différée pour les opérations longues) et le **debug replay**.

### `WorkflowExecutor`

Cœur du runtime. Exécute les actions compilées :

```
executeBdfd(source, context)
  → Compile le BDFD source
  → Transpile en List<Action>
  → executeActions(actions, context)

executeActions(actions, context)
  → hydrateRuntimeVariables()  — Injection des variables runtime
  → handleActions()            — Boucle principale d'exécution
```

Supporte les **workflows imbriqués** (un workflow peut appeler d'autres workflows).

### `ActionHandler` (`actions/handler.dart`)

Boucle principale de dispatch des actions :

```
handleActions(actions, context)
  Pour chaque Action :
    switch (action.type) :
      BotCreatorActionType.sendMessage    → MessagingExecutor
      BotCreatorActionType.httpRequest    → HttpExecutor
      BotCreatorActionType.setVariable    → VariablesExecutor
      BotCreatorActionType.controlFlow    → ControlFlowExecutor
      BotCreatorActionType.sendEmbed      → MessagingExecutor
      BotCreatorActionType.playMusic      → LavalinkExecutor
      BotCreatorActionType.banMember      → ModerationRolesExecutor
      BotCreatorActionType.createChannel  → ChannelsExecutor
      BotCreatorActionType.addReaction    → ReactionsExecutor
      BotCreatorActionType.executeWebhook → WebhooksExecutor
      BotCreatorActionType.calculate      → CalculateExecutor
      BotCreatorActionType.drawImage      → ImageExecutor
      ...
```

## Couche 3 : Executors spécialisés

Chaque executor est responsable d'une catégorie d'actions. Ils reçoivent tous un contexte standard :

| Paramètre | Type | Description |
|-----------|------|-------------|
| `gateway` | `DiscordGateway` | Connexion à l'API Discord |
| `interaction` | `Interaction?` | Interaction en cours (si applicable) |
| `action` | `Action` | L'action à exécuter |
| `store` | `Store` | Magasin de données du bot |
| `botId` | `String` | Identifiant du bot |
| `variables` | `VariablesMap` | Variables scopées |
| `results` | `Map<String, String>` | Résultats cumulés (référençables via `((key))`) |

Les executors principaux sont documentés en détail dans [Architecture des Executors](architecture-executors).

## Fichiers source clés

| Fichier | Rôle |
|---------|------|
| `bdfd_compiler.dart` | Orchestrateur de compilation (lexer + parser + transpiler) |
| `bdfd_lexer.dart` | Tokeniseur BDFD |
| `bdfd_parser.dart` | Parser BDFD (texte → AST) |
| `bdfd_ast.dart` | Définitions des nœuds AST |
| `bdfd_ast_transpiler.dart` | Fichier maître du transpiler (AST → Actions) |
| `bot_engine.dart` | Gestion du cycle de vie des bots |
| `event_dispatcher.dart` | Écoute et routage des événements Discord |
| `command_executor.dart` | Gestion des interactions slash/autocomplete/components |
| `workflow_executor.dart` | Exécution des listes d'actions |
| `actions/handler.dart` | Dispatch des actions vers les executors |
