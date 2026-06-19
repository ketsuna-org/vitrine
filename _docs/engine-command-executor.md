---
layout: doc
title: "Engine — CommandExecutor"
translation_key: docs
category: engine
description: >
  Documentation de la classe CommandExecutor : routage des interactions Discord
  (Slash, Autocomplete, Component, Modal), injection de variables runtime,
  debug replay et commandes legacy prefix.
---

# Engine — CommandExecutor

La classe `CommandExecutor` est l'exécuteur unifié pour toutes les interactions Discord au sein du moteur. Elle route chaque interaction entrante vers le handler approprié, injecte les variables d'exécution, et orchestre l'exécution des workflows ou scripts BDFD.

## Constructeur

```dart
CommandExecutor({
  required this.store,
  required this.callbacks,
  required this._workflowExecutor,
  this.debugReplayCapturing = true,
  this.sessionVariableInjector,
});
```

| Paramètre                   | Type                                          | Par défaut | Description                                                   |
|-----------------------------|-----------------------------------------------|------------|---------------------------------------------------------------|
| `store`                     | `BotDataStore`                                | requis     | Store de données pour charger les commandes, workflows, etc.  |
| `callbacks`                 | `BotEngineCallbacks`                          | requis     | Callbacks de log, debug et métriques.                         |
| `_workflowExecutor`         | `WorkflowExecutor`                            | requis     | Exécuteur d'actions (workflows visuels et scripts compilés).  |
| `debugReplayCapturing`      | `bool`                                        | `true`     | Active la capture des exécutions pour le debug replay.        |
| `sessionVariableInjector`   | `void Function(Map<String, String>)?`         | `null`     | Callback optionnel pour injecter des variables spécifiques à la session (ex: `bot.ownerId`, `bot.commands`, `bot.uptime`). |

## Propriétés

| Propriété       | Type                                          | Visibilité | Description                                                        |
|-----------------|-----------------------------------------------|------------|--------------------------------------------------------------------|
| `store`         | `BotDataStore`                                | publique   | Accès au store de données.                                         |
| `callbacks`     | `BotEngineCallbacks`                          | publique   | Callbacks de log et métriques.                                     |
| `debugReplayCapturing` | `bool`                                 | publique   | Flag mutable pour activer/désactiver la capture de debug replay.   |
| `isDirty`       | `bool` (getter)                               | publique   | Indique si l'état mémoire des commandes diffère de la sauvegarde.  |

Le flag `_hasUnsavedChanges` (interne, exposé via `isDirty`) est activé par `notifyStateUpdate()` et `notifyOptionsUpdate()`, et désactivé par `resetDirtyState()` après une sauvegarde réussie.

---

## Routage des interactions : `handleInteraction`

```dart
Future<void> handleInteraction(
  InteractionCreateEvent event, {
  required NyxxGateway gateway,
  required String botId,
  required DateTime? startedAt,
})
```

Point d'entrée unique pour toutes les interactions Discord. La méthode détecte le type d'interaction et route vers le handler dédié :

```
InteractionCreateEvent
  │
  ├─ ApplicationCommandAutocompleteInteraction → _handleAutocomplete()
  ├─ ApplicationCommandInteraction           → _handleSlashCommand()
  ├─ MessageComponentInteraction             → handleComponentInteraction() (délégué)
  └─ ModalSubmitInteraction                  → handleModalSubmitInteraction() (délégué)
```

Les interactions **Component** et **Modal** sont déléguées à des fonctions externes importées (`handleComponentInteraction`, `handleModalSubmitInteraction`), qui reçoivent le `gateway`, l'interaction, le `store`, le `botId` et le service Lavalink.

---

## Commande Slash : `_handleSlashCommand`

Pipeline complet d'exécution d'une commande slash :

### 1. Récupération des données

```dart
final results = await Future.wait([
  store.listAppCommands(botId),
  shared_global.generateKeyValues(interaction),
]);
```

Deux opérations parallèles : chargement de toutes les commandes du bot et génération des paires clé/valeur depuis l'interaction (options, résolus, etc.).

### 2. Résolution de la commande

La commande est identifiée par son `id` Discord (`interaction.data.id`) dans la liste du store. Si aucune correspondance n'est trouvée, une réponse éphémère « Command not found. » est renvoyée.

### 3. Injection des variables runtime

```dart
final runtimeVariables = <String, String>{...listOfArgs};
runtimeVariables['bot.id'] = botId;
runtimeVariables.addAll(shared_global.extractBotRuntimeDetails(gateway));
_injectBaseVariables(runtimeVariables, botId: botId, startedAt: startedAt);
sessionVariableInjector?.call(runtimeVariables);
runtimeVariables['interaction.isSlash'] = 'true';
```

Ordre d'injection :
1. Variables extraites de l'interaction (options, résolus)
2. `bot.id`
3. Détails runtime du bot via `extractBotRuntimeDetails` (guilds, latence, etc.)
4. Variables de base via `_injectBaseVariables` (voir section dédiée)
5. Variables de session via le callback `sessionVariableInjector`
6. `interaction.isSlash` = `true`

### 4. Hydratation des variables

```dart
final contextIds = _resolveContextIds(interaction, runtimeVariables);
await hydrateRuntimeVariables(
  store: store,
  botId: botId,
  runtimeVariables: runtimeVariables,
  guildContextId: contextIds.guildId,
  channelContextId: contextIds.channelId,
  userContextId: contextIds.userId,
  messageContextId: contextIds.messageId,
);
```

Les identifiants de contexte (guild, channel, user, message) sont résolus puis utilisés pour hydrater les variables persistantes (stockées par `$setUserVar`, `$setChannelVar`, etc.).

### 5. Résolution des sous-commandes et du mode d'exécution

```dart
final subcommandRoute = resolveSubcommandRoute(commandData.options);
```

Si la commande a des sous-commandes, la route est extraite et le payload du workflow correspondant est résolu. Le mode d'exécution est déterminé :

| Mode                  | Comportement                                     |
|-----------------------|--------------------------------------------------|
| `bdfd_script`         | Compile et exécute le script BDFD inline.        |
| `workflow` (défaut)   | Exécute le workflow visuel.                      |
| Présence de `bdfdScriptContent` non vide | Force le mode BDFD. |

### 6. Exécution

- **Script BDFD** → `_executeBdfdScript(scriptSource, ...)`
- **Workflow visuel** → `_workflowExecutor.executeVisualWorkflow(executionValue, ...)`

---

## Exécution de script BDFD : `_executeBdfdScript`

```dart
Future<void> _executeBdfdScript(
  String scriptSource, {
  required ApplicationCommandInteraction interaction,
  required NyxxGateway gateway,
  required String botId,
  required Map<String, String> runtimeVariables,
})
```

### Pipeline

1. **Compilation** : le script BDFD est compilé via `BdfdCompiler().compile(scriptSource)`.
2. **Diagnostics** : si la compilation produit des erreurs, un message formaté est envoyé en réponse éphémère.
3. **Actions vides** : si la compilation réussit mais ne produit aucune action, une erreur est renvoyée.
4. **Defer** : l'interaction est différée (`interaction.acknowledge()`), sauf si les actions compilées contiennent une action `respondWithModal` — Discord exige que le modal soit la première réponse.
5. **Exécution** : les actions compilées sont passées à `_workflowExecutor.executeActions()` avec le label de replay `/nomDeLaCommande`.
6. **Gestion d'erreur** : si l'exécution échoue et que l'interaction n'a pas encore reçu de réponse (pas de `$try/$catch` ou `$suppressErrors`), un message d'erreur formaté est envoyé en followup éphémère.

---

## Autocomplete : `_handleAutocomplete`

```dart
Future<void> _handleAutocomplete(
  ApplicationCommandAutocompleteInteraction interaction, {
  required String botId,
  required NyxxGateway gateway,
  required DateTime? startedAt,
})
```

### Résolution de la configuration

La commande est identifiée par son `id` dans le store, puis la configuration d'autocomplete est extraite via `resolveAutocompleteConfigForInteraction()`, qui croise les options stockées avec les options de l'interaction en cours.

Si aucune configuration n'est trouvée ou si `enabled != true`, un tableau vide est renvoyé.

### Trois modes d'autocomplete

#### Mode `static`

Filtrage simple sur une liste de choix statiques :

- Récupère l'option focus (celle que l'utilisateur est en train de saisir)
- Filtre les `staticChoices` par nom (insensible à la casse) selon la query
- Limite le résultat à 25 choix maximum (limite Discord)

#### Mode `inline`

Exécute des actions embarquées dans la configuration :

- Extrait `inlineActions` de la config
- Injecte les variables runtime (similaire au pipeline slash), avec des variables spécifiques à l'autocomplete :
  - `autocomplete.query`
  - `autocomplete.optionName`
  - `autocomplete.optionType`
- Hydrate les variables et injecte les fallbacks de guilde depuis le cache du gateway
- Exécute les actions via `_workflowExecutor.executeActions()`

#### Mode `workflow` (défaut)

Exécute un workflow nommé :

- Résout le workflow par son nom via `store.getWorkflowByName()`
- Injecte les variables runtime (mêmes variables autocomplete que le mode inline)
- Résout les arguments d'appel de workflow (`resolveWorkflowCallArguments`)
- Applique le contexte d'invocation (`applyWorkflowInvocationContext`)
- Exécute les actions du workflow via `_workflowExecutor.executeActions()`

### Gestion des timeouts

Si l'interaction expire (erreur `10062` — Unknown Interaction), le catch est silencieux : l'autocomplete a simplement été supersédé par une requête plus récente de l'utilisateur.

---

## Injection des variables de base : `_injectBaseVariables`

```dart
void _injectBaseVariables(
  Map<String, String> variables, {
  required String botId,
  required DateTime? startedAt,
})
```

Injecte les variables fondamentales dans le map :

| Variable               | Source                    | Description                                   |
|------------------------|---------------------------|-----------------------------------------------|
| `bot.id`               | Paramètre `botId`         | Identifiant du bot.                           |
| `bot.token`            | Store / gateway           | Token d'authentification.                     |
| `bot.name`             | Gateway cache             | Nom du bot (si disponible).                   |
| `bot.guildCount`       | Gateway cache             | Nombre de guildes du bot.                     |
| `bot.uptime`           | `startedAt`               | Uptime en millisecondes.                      |
| `bot.uptimeMs`         | `startedAt`               | Alias de `bot.uptime`.                        |
| `command.name`         | Interaction               | Nom de la commande.                           |
| `command.folder`       | Store                    | Dossier de la commande.                       |
| `command.type`         | Store                    | Type de la commande.                          |
| `command.args`         | Interaction               | Arguments bruts.                              |

> Note : certaines de ces variables sont également injectées par `shared_global.extractBotRuntimeDetails()` et `sessionVariableInjector`. L'ordre d'appel garantit que les valeurs les plus récentes écrasent les précédentes.

---

## Résolution des identifiants de contexte : `_resolveContextIds`

```dart
_InteractionContextIds _resolveContextIds(
  Interaction interaction,
  Map<String, String> variables,
)
```

Résout les IDs de contexte en cascade, avec normalisation des valeurs invalides (`null`, `"Unknown User"`, `"DM"`) :

| Contexte  | Priorité de résolution                                                         |
|-----------|--------------------------------------------------------------------------------|
| `guildId` | `variables['guildId']` → `variables['guild.id']` → `interaction.guildId`      |
| `channelId`| `variables['channelId']` → `variables['channel.id']` → `interaction.channelId`|
| `userId`  | `variables['userId']` → `variables['user.id']` → `interaction.user.id` → `interaction.member.user.id` |
| `messageId`| `variables['messageId']` → `variables['message.id']` → `interaction.message.id` → `interaction.id` |

La classe privée `_InteractionContextIds` porte les quatre identifiants (tous nullables).

---

## Debug Replay

Le flag `debugReplayCapturing` (par défaut `true`) contrôle si les exécutions sont capturées pour le système de debug replay. Lorsqu'il est activé, chaque appel à `_workflowExecutor.executeActions()` reçoit un `replayLabel` (ex: `/nomDeLaCommande`) qui permet d'identifier l'exécution dans les logs de replay.

La capture est consommée en interne par le `WorkflowExecutor` ; le `CommandExecutor` ne stocke pas directement les données de replay.

---

## Gestion de l'état dirty

Trois méthodes exposent un système simple de tracking des modifications non sauvegardées :

```dart
void notifyStateUpdate()    // Marque l'état comme modifié
void notifyOptionsUpdate()  // Marque les options comme modifiées
void resetDirtyState()      // Réinitialise après sauvegarde
```

La méthode `updateOrCreate()` est un stub destiné à être surchargé par la couche applicative pour persister les commandes.

---

## Formatage des erreurs

### Erreurs BDFD : `_formatBdfdRuntimeDiagnostics`

Formate une liste de `BdfdCompileDiagnostic` en texte lisible :

```
[ERROR] Message d'erreur
[WARNING] Message d'avertissement
```

### Erreurs d'exécution : `_formatCommandError`

Méthode statique qui nettoie et tronque un message d'erreur Dart pour Discord :

- Supprime le préfixe `Exception: ` ou `StateError: ` (tout avant `: ` dans les 30 premiers caractères)
- Tronque à 1950 caractères maximum
- Préfixe avec `❌`

---

## Commandes legacy prefix

Le `CommandExecutor` référence également un handler pour les commandes legacy prefix (messages commençant par `!`). Ce handler, `_handleMessageCommand`, parse le préfixe, extrait le nom de la commande et les arguments, puis exécute la commande correspondante. Son implémentation n'est pas incluse dans le fichier source principal et peut être déléguée à un module externe.

---

## Cycle de vie d'une interaction

```
handleInteraction()
  │
  ├─ Autocomplete ──────────────────────────────────────
  │   1. Trouver la commande dans le store
  │   2. Résoudre la config d'autocomplete
  │   3. Mode static / inline / workflow
  │   4. Injecter variables + hydrater
  │   5. Exécuter actions ou répondre choix
  │
  ├─ Slash Command ────────────────────────────────────
  │   1. Fetch commandes + générer paires clé/valeur
  │   2. Identifier la commande
  │   3. Injecter variables (base → runtime → session)
  │   4. Hydrater variables persistantes
  │   5. Résoudre sous-commandes + mode d'exécution
  │   6. Compiler BDFD ou exécuter workflow visuel
  │   7. Gérer les erreurs (followup éphémère)
  │
  ├─ Component ────────────────────────────────────────
  │   → handleComponentInteraction() (délégué externe)
  │
  └─ Modal Submit ─────────────────────────────────────
      → handleModalSubmitInteraction() (délégué externe)
```
