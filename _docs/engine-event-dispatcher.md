---
layout: doc
translation_key: docs
category: engine
title: "Engine — EventDispatcher"
description: >
  Documentation de l'EventDispatcher : dispatcher central des 35 événements
  Discord gateway, pipeline de dispatching, mécanismes anti-boucles infinies,
  construction de contexte et hydratation des variables d'exécution.
---

# Engine — EventDispatcher

La classe `EventDispatcher` est le dispatcher central de tous les événements Discord gateway reçus par un bot. Elle enregistre des listeners sur 35 événements Discord, filtre les workflows correspondants, construit un contexte d'exécution enrichi, et délègue l'exécution au `WorkflowExecutor`. C'est le point d'entrée unique reliant la gateway Discord au moteur de workflows et au système de commandes legacy.

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────────────┐
│                           EventDispatcher                                 │
│                                                                          │
│  registerListeners(gateway, botId, startedAt)                            │
│  │                                                                       │
│  ├─ interactionCreate ──► commandExecutor.handleInteraction()            │
│  ├─ messageCreate ──────► _handleMessageCreate()                         │
│  │                        ├─ Legacy commands (préfixe)                   │
│  │                        └─ _handleEvent('messageCreate', ...)          │
│  │                                                                       │
│  └─ 33 autres events ───► reg() → _dispatchEvent() → _handleEvent()     │
│                                                                          │
│  _handleEvent():                                                         │
│    1. Anti-boucle (InteractionListenerRegistry)                          │
│    2. Anti-boucle (bots/webhooks)                                        │
│    3. Fetch workflows → filtre par eventName                             │
│    4. buildContext(event) → EventExecutionContext                        │
│    5. Injecte runtime variables + hydrate                                │
│    6. Pour chaque workflow matching:                                     │
│       ├─ Normalize + résout executionMode                                │
│       ├─ Applique alias de variables                                     │
│       └─ BDFD compile → executeActions                                   │
│          OU workflow visuel → executeActions                             │
└──────────────────────────────────────────────────────────────────────────┘
```

## Constructeur

```dart
EventDispatcher({
  required this.store,               // BotDataStore — accès aux workflows, commandes, app data
  required this.callbacks,           // BotEngineCallbacks — onLog, onDebugLog
  required this.commandExecutor,     // CommandExecutor — gestion des interactions (slash, autocomplete, composants)
  required this._workflowExecutor,   // WorkflowExecutor — exécution des actions compilées
  this.sessionVariableInjector,      // Callback optionnel pour injecter des variables session (bot.ownerId, bot.commands, etc.)
});
```

## registerListeners() — Les 35 événements Discord

La méthode `registerListeners(gateway, botId, startedAt)` retourne une `List<StreamSubscription>` contenant tous les abonnements. Chaque événement est écouté via les streams du `NyxxGateway`.

### Événement spécial : interactionCreate (traitement primaire)

Le premier listener enregistré est dédié aux interactions Discord (slash commands, autocomplete, boutons, selects, modals). Il route **directement** vers `commandExecutor.handleInteraction()` :

```
gateway.onInteractionCreate.listen((event) {
  commandExecutor.handleInteraction(event, gateway, botId, startedAt)
})
```

Ce traitement est prioritaire et indépendant du pipeline de workflows événementiels.

### Événement spécial : messageCreate (workflows + legacy)

Le second listener route vers `_handleMessageCreate()`, qui implémente une logique hybride :

1. Détection des messages de bots/webhooks → skip
2. Recherche de commande legacy par préfixe (`!`, configurable via `appData['prefix']`)
3. Si une commande legacy est trouvée → exécution BDFD ou workflow visuel
4. Dans tous les cas → exécution des workflows événementiels `messageCreate`

### Helper reg() — Les 33 événements standards

Pour tous les autres événements, la fonction interne `reg(eventName, stream, buildContext)` crée un listener standard :

```dart
void reg(String eventName, Stream<dynamic> stream, Function buildContext) {
  stream.listen((event) {
    _dispatchEvent(eventName, event, buildContext, botId, gateway, startedAt);
  });
}
```

Tableau complet des 35 événements :

| Catégorie | Événement | Stream Nyxx | Builder de contexte |
|-----------|-----------|-------------|---------------------|
| **Guildes** | `guildCreate` | `onGuildCreate` | `buildGuildCreateEventContext` |
| | `guildUpdate` | `onGuildUpdate` | `buildGuildUpdateEventContext` |
| | `guildDelete` | `onGuildDelete` | `buildGuildDeleteEventContext` |
| | `guildAuditLogCreate` | `onGuildAuditLogCreate` | `buildGuildAuditLogCreateEventContext` |
| **Channels** | `channelCreate` | `onChannelCreate` | `buildChannelCreateEventContext` |
| | `channelUpdate` | `onChannelUpdate` | `buildChannelUpdateEventContext` |
| | `channelDelete` | `onChannelDelete` | `buildChannelDeleteEventContext` |
| | `channelPinsUpdate` | `onChannelPinsUpdate` | `buildChannelPinsUpdateEventContext` |
| **Threads** | `threadCreate` | `onThreadCreate` | `buildThreadCreateEventContext` |
| | `threadUpdate` | `onThreadUpdate` | `buildThreadUpdateEventContext` |
| | `threadDelete` | `onThreadDelete` | `buildThreadDeleteEventContext` |
| | `threadMemberUpdate` | `onThreadMemberUpdate` | `buildThreadMemberUpdateEventContext` |
| | `threadMembersUpdate` | `onThreadMembersUpdate` | `buildThreadMembersUpdateEventContext` |
| **Membres** | `guildMemberAdd` | `onGuildMemberAdd` | `buildGuildMemberAddEventContext` |
| | `guildMemberUpdate` | `onGuildMemberUpdate` | `buildGuildMemberUpdateEventContext` |
| | `guildMemberRemove` | `onGuildMemberRemove` | `buildGuildMemberRemoveEventContext` |
| **Rôles** | `guildRoleCreate` | `onGuildRoleCreate` | `buildGuildRoleCreateEventContext` |
| | `guildRoleUpdate` | `onGuildRoleUpdate` | `buildGuildRoleUpdateEventContext` |
| | `guildRoleDelete` | `onGuildRoleDelete` | `buildGuildRoleDeleteEventContext` |
| **Messages** | `messageUpdate` | `onMessageUpdate` | `buildMessageUpdateEventContext` |
| | `messageDelete` | `onMessageDelete` | `buildMessageDeleteEventContext` |
| **Réactions** | `messageReactionAdd` | `onMessageReactionAdd` | `buildMessageReactionAddEventContext` |
| | `messageReactionRemove` | `onMessageReactionRemove` | `buildMessageReactionRemoveEventContext` |
| | `messageReactionRemoveAll` | `onMessageReactionRemoveAll` | `buildMessageReactionRemoveAllEventContext` |
| | `messageReactionRemoveEmoji` | `onMessageReactionRemoveEmoji` | `buildMessageReactionRemoveEmojiEventContext` |
| **Sondages** | `messagePollVoteAdd` | `onMessagePollVoteAdd` | `buildMessagePollVoteAddEventContext` |
| | `messagePollVoteRemove` | `onMessagePollVoteRemove` | `buildMessagePollVoteRemoveEventContext` |
| **Invitations** | `inviteCreate` | `onInviteCreate` | `buildInviteCreateEventContext` |
| | `inviteDelete` | `onInviteDelete` | `buildInviteDeleteEventContext` |
| **Présence/User** | `presenceUpdate` | `onPresenceUpdate` | `buildPresenceUpdateEventContext` |
| | `userUpdate` | `onUserUpdate` | `buildUserUpdateEventContext` |
| **Vocal** | `voiceStateUpdate` | `onVoiceStateUpdate` | `buildVoiceStateUpdateEventContext` |
| | `voiceServerUpdate` | `onVoiceServerUpdate` | `buildVoiceServerUpdateEventContext` |
| | `voiceChannelEffectSend` | `onVoiceChannelEffectSend` | `buildVoiceChannelEffectSendEventContext` |
| **Typing** | `typingStart` | `onTypingStart` | `buildTypingStartEventContext` |
| **Interactions** | `interactionCreate` | `onInteractionCreate` | `buildInteractionCreateEventContext` |

**Note :** L'événement `interactionCreate` apparaît deux fois dans le flux :
1. Une première fois en traitement primaire (route vers `commandExecutor.handleInteraction`)
2. Une seconde fois via `reg()` pour les workflows événementiels génériques

Le mécanisme anti-boucle infinie (voir ci-dessous) garantit qu'une interaction déjà traitée par le `commandExecutor` ne sera pas ré-exécutée par les workflows.

## Pipeline de dispatching détaillé

### _dispatchEvent → _handleEvent

`_dispatchEvent` est un simple wrapper qui lance `_handleEvent` de manière asynchrone (`unawaited`) pour ne pas bloquer la boucle d'événements Discord.

Le pipeline complet de `_handleEvent` :

```
_dispatchEvent(eventName, event, buildContext, botId, gateway, startedAt)
  │
  └─ unawaited(_handleEvent(...))
       │
       ├── ÉTAPE 1 : Anti-boucle infinie — InteractionListenerRegistry
       │   Si l'event est un InteractionCreateEvent (MessageComponentInteraction
       │   ou ModalSubmitInteraction) et qu'un listener est déjà enregistré dans
       │   l'InteractionListenerRegistry pour ce customId → RETURN immédiat.
       │   Cela évite la double exécution : une fois par commandExecutor.handleInteraction,
       │   une fois par les workflows génériques interactionCreate.
       │
       ├── ÉTAPE 2 : Anti-boucle infinie — Bots et Webhooks
       │   Si l'event est MessageCreateEvent ou MessageUpdateEvent et que l'auteur
       │   est un bot, un webhook, ou que message.application != null → RETURN.
       │   Un bot ne doit jamais déclencher ses propres workflows.
       │
       ├── ÉTAPE 3 : Récupération des workflows
       │   await store.getWorkflows(botId)
       │   → Retourne tous les workflows du bot.
       │
       ├── ÉTAPE 4 : Filtrage par eventName
       │   workflows.where(w => w['eventTrigger']['event'] == eventName)
       │   → Comparaison case-insensitive.
       │   Si aucun workflow ne matche → RETURN.
       │
       ├── ÉTAPE 5 : Construction du contexte d'événement
       │   context = buildContext(event)
       │   → Chaque événement a son propre builder (ex: buildMessageCreateEventContext).
       │   → Retourne un EventExecutionContext contenant :
       │     - eventName, variables (Map<String,String>), guildId, channelId,
       │       userId, messageId, interaction, member.
       │   → Supporte les builders synchrones et asynchrones (Future).
       │
       ├── ÉTAPE 6 : Injection des variables runtime de base
       │   runtimeVariables = { ...context.variables, 'workflow.type': 'event' }
       │   _injectBaseVariables(runtimeVariables) → bot.uptime (si startedAt)
       │   shared_global.extractBotRuntimeDetails(gateway) → bot.id, bot.name, etc.
       │   sessionVariableInjector?(runtimeVariables) → variables session custom
       │
       ├── ÉTAPE 7 : Hydratation du contexte
       │   _hydrateEventContext(gateway, context, runtimeVariables)
       │   → Résout guild, member, channel via cache ou API.
       │   → Injecte guild.name, member.roles, channel.name, etc.
       │
       │   hydrateRuntimeVariables(store, botId, runtimeVariables, ...)
       │   → Hydrate les variables globales et les scopes (user, message, etc.)
       │
       └── ÉTAPE 8 : Exécution pour chaque workflow matching
            for (workflow in matching):
              │
              ├── normalizeCommandData(workflow)
              ├── Résolution executionMode: 'bdfd_script' vs 'workflow'
              ├── applyEventVariableAliases(wfVars, normalized)
              │   → Applique les alias définis dans eventVariableAliases du workflow
              │
              ├── Si BDFD:
              │   BdfdCompiler().compile(scriptSource)
              │   → _workflowExecutor.executeActions(actions, ...)
              │
              └── Si workflow visuel:
                  Action.fromJson() pour chaque action
                  → _workflowExecutor.executeActions(actions, ...)
                  → Résultats stockés dans runtimeVariables['action.{key}']
                  → Si response configurée → sendWorkflowResponse()
```

### _handleMessageCreate — Traitement hybride

Cette méthode gère le cas particulier de `messageCreate`, qui doit supporter à la fois les commandes legacy (préfixe) et les workflows événementiels :

```
_handleMessageCreate(event, botId, gateway, startedAt)
  │
  ├── 1. Vérification bot/webhook (comme dans _handleEvent)
  │
  ├── 2. Injection variables de base (similaire à _handleEvent)
  │
  ├── 3. Détection commande legacy
  │   appData = store.getApp(botId)
  │   prefix  = appData['prefix'] ?? '!'
  │
  │   Si message.content commence par le préfixe:
  │     commandBody = content.substring(prefix.length).trim()
  │     Si commandBody non vide:
  │       _tryHandleLegacyCommand(commandBody, event, botId, gateway, runtimeVariables)
  │         ├── Cherche une commande (type='chatinput' ou vide) avec legacyModeEnabled=true
  │         ├── Commandes spéciales: 'help' → aide intégrée (builtInLegacyHelpEnabled)
  │         ├── Injection des arguments positionnels: runtimeVariables['0'] = commandName,
  │         │   runtimeVariables['1'] = arg1, runtimeVariables['2'] = arg2, etc.
  │         ├── Override message.content = argsString (pour que $message retourne les arguments)
  │         ├── Re-hydrate message.content[$idx] avec les arguments
  │         ├── Hydratation du contexte (guild, channel, member)
  │         ├── hydrateRuntimeVariables(...)
  │         └── Exécution BDFD ou workflow visuel
  │
  └── 4. Exécution workflows événementiels
      _handleEvent('messageCreate', event, buildMessageCreateEventContext, ...)
      → Même pipeline que les autres événements.
```

## Mécanismes anti-boucles infinies

L'EventDispatcher implémente **deux** mécanismes distincts pour prévenir les boucles infinies :

### 1. InteractionListenerRegistry (interactionCreate)

**Problème :** Une interaction (clic sur un bouton, soumission de modal) peut être :
- Traitée par `commandExecutor.handleInteraction()` (via le listener primaire ligne 46-65)
- ET traitée par les workflows événementiels `interactionCreate` (via `reg()` ligne 271-275)

Sans protection, cela entraînerait une **double exécution**.

**Solution :** Dans `_handleEvent`, avant tout traitement, le code vérifie si l'interaction a déjà un listener enregistré :

```dart
if (event is InteractionCreateEvent) {
  if (interaction is MessageComponentInteraction) {
    final hasListener = InteractionListenerRegistry.instance.getMatching(
      customId, ListenerMatchRequest(botId, type, guildId, channelId, messageId, userId)
    ) != null;
    if (hasListener) return; // ← Skip les workflows génériques
  }
  // Même logique pour ModalSubmitInteraction
}
```

Si un listener est trouvé dans le registry, l'événement est ignoré par les workflows génériques car il a déjà été (ou sera) traité par le `commandExecutor`.

### 2. Exclusion des bots et webhooks (messageCreate, messageUpdate)

**Problème :** Un bot pourrait déclencher ses propres workflows en envoyant un message, créant une boucle infinie. De même, les webhooks et les messages d'application doivent être exclus.

**Solution :** Vérification systématique dans `_handleEvent` (et `_handleMessageCreate`) :

```dart
if (event is MessageCreateEvent || event is MessageUpdateEvent) {
  if (author.isBot || author is WebhookAuthor || message.application != null) {
    return; // ← Skip immédiat
  }
}
```

Dans `_handleMessageCreate`, une vérification supplémentaire exclut les messages dont l'auteur est l'application elle-même (`author.id == gateway.application.id`).

## Construction de contexte (Context Building)

### EventExecutionContext

Structure de données immuable produite par chaque builder d'événement :

```dart
class EventExecutionContext {
  final String eventName;            // Nom de l'événement (ex: 'messageCreate')
  final Map<String, String> variables; // Variables extraites de l'événement
  final Snowflake? guildId;          // ID du serveur (null si DM)
  final Snowflake? channelId;        // ID du channel
  final Snowflake? userId;           // ID de l'utilisateur
  final Snowflake? messageId;        // ID du message (si applicable)
  final Interaction? interaction;    // Interaction Discord (si applicable)
  final PartialMember? member;       // Membre du serveur (si applicable)
}
```

### Builders de contexte

Chaque événement a son propre builder (fichiers dans `lib/events/events/`). Ces builders :

1. Extraient les identifiants Discord pertinents (guildId, channelId, userId, messageId)
2. Construisent un map de variables initiales (`extra`) contenant les données propres à l'événement
3. Appellent `_baseEventContext(eventName, guildId, channelId, userId, messageId, member, extra: extra)` pour créer l'`EventExecutionContext`

Par exemple, `buildMessageCreateEventContext` :

```dart
EventExecutionContext buildMessageCreateEventContext(MessageCreateEvent event) {
  final message = event.message;
  final extra = _messageContentExtra(message, member: event.member);
  // Contient: message.id, message.content, message.cleanContent,
  //           message.channelId, message.author.id, message.author.username, etc.
  return _baseEventContext(
    eventName: 'messageCreate',
    guildId: event.guildId,
    channelId: message.channelId,
    userId: message.author.id,
    messageId: message.id,
    member: event.member,
    extra: extra,
  );
}
```

### Injection séquentielle des variables

Les variables runtime sont construites par couches successives (ordre de priorité croissant) :

```
1. context.variables
   └─ Issues du builder d'événement (ex: message.content, message.author.id)

2. 'workflow.type': 'event'
   └─ Tag statique identifiant le type d'exécution

3. _injectBaseVariables(runtimeVariables)
   └─ bot.uptime (calculé depuis startedAt)

4. shared_global.extractBotRuntimeDetails(gateway)
   └─ bot.id, bot.name, bot.discriminator, etc.

5. sessionVariableInjector?(runtimeVariables)
   └─ Variables injectées par la session (bot.ownerId, bot.commands, etc.)

6. _hydrateEventContext(gateway, context, runtimeVariables)
   └─ Résolution guild → guild.name, guild.memberCount, guild.ownerId, etc.
   └─ Résolution member → member.displayName, member.roles, member.joinedAt, etc.
   └─ Résolution channel → channel.name, channel.topic, channel.type, etc.

7. hydrateRuntimeVariables(store, botId, runtimeVariables, guildContextId, channelContextId, userContextId, messageContextId)
   └─ Variables globales (bot, server, channel, user, message)
   └─ Variables stockées (store)
```

### _hydrateEventContext — Détail

Cette méthode résout les entités Discord à partir du cache ou de l'API :

```
_hydrateEventContext(gateway, context, variables)
  │
  ├── Si guildId != null:
  │   ├── Cache hit (gateway.guilds.cache[guildId]):
  │   │   ├── extractGuildRuntimeDetails(cachedGuild) → guild.name, guild.id, etc.
  │   │   ├── Si userId != null: fetch member → extractMemberRuntimeDetails()
  │   │   └── putIfAbsent: guildName, guild.name, interaction.guild.name
  │   │
  │   └── Cache miss: fetch via API (gateway.guilds.get(guildId))
  │       └── Même extraction, avec gestion d'erreur
  │
  └── Si channelId != null:
      └── gateway.channels.get(channelId) → extractChannelRuntimeDetails()
```

## Alias de variables d'événement

Chaque workflow peut définir un mapping `eventVariableAliases` (originalName → alias) qui permet de renommer les variables d'événement pour le scope de ce workflow spécifique.

```dart
void applyEventVariableAliases(
  Map<String, String> runtimeVariables,
  Map<String, dynamic>? workflowData,
) {
  final rawAliases = workflowData?['eventVariableAliases'];
  if (rawAliases is! Map || rawAliases.isEmpty) return;

  for (final entry in rawAliases.entries) {
    final original = entry.key.toString();
    final alias = entry.value?.toString() ?? '';
    if (original.isEmpty || alias.isEmpty) continue;

    final value = runtimeVariables[original];
    if (value != null) {
      runtimeVariables[alias] = value; // Copie la valeur sous le nom d'alias
    }
  }
}
```

**Important :** Les clés originales sont conservées. L'alias crée une **copie** de la variable, garantissant la rétrocompatibilité.

Les alias sont appliqués **par workflow**, avant l'exécution. Chaque workflow reçoit une copie propre de la map `runtimeVariables` (via `Map<String, String>.from(runtimeVariables)`), ce qui évite toute contamination entre workflows.

## Modes d'exécution

Pour chaque workflow, le dispatcher détermine le mode d'exécution :

| Mode | Condition | Traitement |
|------|-----------|------------|
| **BDFD Script** | `executionMode == 'bdfd_script'` OU `scriptSource.trim().isNotEmpty` | `BdfdCompiler().compile(scriptSource)` → `executeActions(compiledActions)` |
| **Workflow visuel** | Sinon (défaut: `'workflow'`) | Parse les actions JSON → `Action.fromJson()` → `executeActions(parsedActions)` |

La source du script est cherchée dans l'ordre : `bdfdScriptContent` → `scriptContent` → `bdfdScript`.

### _executeBdfdScriptInEvent

```dart
Future<void> _executeBdfdScriptInEvent(scriptSource, context, gateway, botId, runtimeVariables)
  compileResult = BdfdCompiler().compile(scriptSource)
  if (compileResult.hasErrors) → log erreur, return
  _workflowExecutor.executeActions(
    actions: compileResult.actions,
    context: context.interaction,
    gateway: gateway,
    botId: botId,
    runtimeVariables: runtimeVariables,
    fallbackChannelId: context.channelId,
    fallbackGuildId: context.guildId,
    replayLabel: '!$cmdName' ou 'BDFD Script',
  )
```

### _executeEventWorkflow

```dart
Future<void> _executeEventWorkflow(workflow, context, botId, gateway, runtimeVariables)
  actions = executionValue['actions'] → Action.fromJson()
  if (actions.isNotEmpty):
    actionResults = _workflowExecutor.executeActions(actions, ...)
    for (entry in actionResults.entries):
      runtimeVariables['action.{key}'] = entry.value  // Stocke les résultats

  if (executionValue['response'] is not empty):
    sendWorkflowResponse(gateway, fallbackChannelId, response, runtimeVariables, botId)
```

## Gestion d'erreur — _safeRun

Toutes les exécutions sont wrappées dans `_safeRun()` qui capture les exceptions et :

1. **Log** l'erreur et la stack trace (via `callbacks.onLog` et `callbacks.onDebugLog`)
2. **Formate** un message utilisateur (`_formatUserFacingError`) : strip le préfixe Dart ("Exception: ", "StateError: "), tronque à 1950 caractères, ajoute un préfixe ❌
3. **Répond** à l'utilisateur :
   - Si **interaction** (slash command, bouton, modal, autocomplete) : réponse éphémère via `interaction.respond(builder)` (sauf si déjà acquittée)
   - Si **message texte** (legacy command) : envoi du message d'erreur dans le channel

## Résumé du flux complet

```
Gateway Discord
  │
  ├─ onInteractionCreate ─────► commandExecutor.handleInteraction()
  │                               (slash, autocomplete, components)
  │
  ├─ onMessageCreate ─────────► _handleMessageCreate()
  │                               ├─ Legacy command (préfixe)
  │                               │   ├─ Legacy help intégré
  │                               │   ├─ Arguments positionnels ($0, $1, $2...)
  │                               │   └─ BDFD ou Workflow visuel
  │                               └─ Workflows messageCreate
  │
  └─ 33 autres events ────────► reg() → _dispatchEvent() → _handleEvent()
                                    │
                                    ├─ [GUARD] InteractionListenerRegistry
                                    ├─ [GUARD] Bot/Webhook exclusion
                                    ├─ Fetch + filtre workflows
                                    ├─ Build EventExecutionContext
                                    ├─ Inject + hydrate runtimeVariables
                                    └─ For each matching workflow:
                                         ├─ applyEventVariableAliases()
                                         ├─ BDFD compile → executeActions
                                         └─ OU workflow visuel → executeActions
                                               └─ sendWorkflowResponse (si configuré)
```
