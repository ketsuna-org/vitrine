---
layout: doc
title: "Engine — WorkflowExecutor"
translation_key: docs
category: engine
description: >
  Documentation de la classe WorkflowExecutor : pipeline d'exécution d'actions
  BDFD, injection de variables Lavalink, résolution de templates et système de
  debug replay.
---

# Engine — WorkflowExecutor

La classe `WorkflowExecutor` est l'exécuteur de workflows visuels et d'actions BDFD pour les interactions et événements Discord. Elle orchestre le pipeline complet d'exécution : résolution des templates, injection des variables Lavalink, transit des actions vers le handler, et capture des frames de debug replay.

**Fichier source** : `packages/shared/lib/engine/workflow_executor.dart` (467 lignes)

## Constructeur

```dart
WorkflowExecutor({
  required this.store,
  required this.callbacks,
});
```

| Paramètre   | Type                   | Description                                |
|-------------|------------------------|--------------------------------------------|
| `store`     | `BotDataStore`         | Store de données pour charger la config    |
| `callbacks` | `BotEngineCallbacks`   | Callbacks de log, debug, métriques, replay |

## Propriétés

| Propriété         | Type               | Description                                                  |
|-------------------|--------------------|--------------------------------------------------------------|
| `store`           | `BotDataStore`     | Store injecté au constructeur                                |
| `callbacks`       | `BotEngineCallbacks` | Callbacks injectés au constructeur                         |
| `lavalinkService` | `LavalinkService?` | Service Lavalink, settable après l'init par `BotSession`    |

Le `lavalinkService` est nullable car il est défini après la construction, une fois que le plugin Lavalink est prêt au niveau de la session du bot.

---

## Pipeline d'exécution : `executeActions()`

C'est la méthode centrale. Elle prend une liste d'actions et un contexte (interaction, événement message, ou `null`) et exécute le pipeline complet.

```dart
Future<Map<String, String>> executeActions({
  required List<Action> actions,
  required dynamic context,        // Interaction, MessageCreateEvent, etc.
  required NyxxGateway gateway,
  required String botId,
  required Map<String, String> runtimeVariables,
  Snowflake? fallbackChannelId,
  Snowflake? fallbackGuildId,
  String? replayLabel,
})
```

### Algorithme de la méthode

1. **Log initial** — Émet un log de debug indiquant le nombre d'actions à exécuter.

2. **Vérification actions vides** — Si `actions` est vide, retourne immédiatement `{}` (map vide). Aucune exécution.

3. **Vérification debug replay** — Appelle `callbacks.isDebugReplayCapturing?.call(botId)` pour déterminer si la capture de replay est active. Ce booléen `isCapturing` détermine si le callback `onReplayCaptured` sera fourni à `handleActions`.

4. **Injection des variables Lavalink** — Appelle `_populateLavalinkVariables(runtimeVariables, context, fallbackGuildId)` pour injecter les variables `lavalink.*` dans le dictionnaire de variables runtime (cf. section dédiée).

5. **Délégation à `handleActions`** — Appelle la fonction `handleActions()` du package `actions/handler.dart` avec les paramètres suivants :

   | Paramètre              | Valeur transmise                                               |
   |------------------------|----------------------------------------------------------------|
   | `client`               | `gateway` (NyxxGateway)                                        |
   | `interaction`          | `context` casté en `Interaction`, ou `null` sinon              |
   | `actions`              | La liste d'actions                                             |
   | `store`                | Le `BotDataStore`                                              |
   | `botId`                | L'ID du bot                                                    |
   | `variables`            | `runtimeVariables` (déjà enrichi des variables Lavalink)       |
   | `resolveTemplate`      | Callback de résolution (cf. section Templates)                 |
   | `onLog`                | Redirige vers `callbacks.onLog`                                |
   | `fallbackChannelId`    | Transmis tel quel                                              |
   | `fallbackGuildId`      | Transmis tel quel                                              |
   | `lavalinkService`      | Le service Lavalink (nullable)                                 |
   | `onReplayCaptured`     | Callback de capture si `isCapturing` est vrai, sinon `null`    |

6. **Retour** — Renvoie le `Map<String, String>` retourné par `handleActions` (clé = identifiant d'action, valeur = résultat).

### Gestion d'erreur

L'ensemble du bloc est wrappé dans un `try/catch`. En cas d'erreur :
- Le message d'erreur et la stack trace sont loggés via `callbacks.onDebugLog`
- Un log utilisateur est émis via `callbacks.onLog` avec le préfixe `ERROR:`
- L'exception est **rethrowée** (pas de silencieux swallowing)

---

## Résolution de templates

Le paramètre `resolveTemplate` passé à `handleActions` est une closure définie dans `executeActions` :

```dart
resolveTemplate: (input) {
  _populateLavalinkVariables(runtimeVariables, context, fallbackGuildId);
  return resolveTemplatePlaceholders(input, runtimeVariables);
},
```

### Fonctionnement

1. **Repopulation Lavalink** — Avant chaque résolution de template, les variables Lavalink sont réinjectées dans `runtimeVariables`. Cela garantit que les placeholders `((lavalink.*))` reflètent l'état temps réel du lecteur audio (position, statut de pause, etc.).

2. **Résolution des placeholders** — Appelle `resolveTemplatePlaceholders()` (du module `utils/template_resolver.dart`) qui scanne la chaîne d'entrée à la recherche de `((key))` et les remplace par les valeurs du dictionnaire `runtimeVariables`.

Ce pattern garantit que chaque action reçoit des templates résolus avec l'état le plus frais possible du lecteur Lavalink.

---

## Injection des variables Lavalink : `_populateLavalinkVariables()`

Cette méthode privée enrichit le dictionnaire `variables` avec les métadonnées du lecteur audio Lavalink.

### Algorithme de résolution du `guildId`

La méthode détermine le guild ID en essayant successivement :

1. `fallbackGuildId` fourni en paramètre
2. `context.guildId` (si le contexte est une Interaction)
3. `context.message?.guildId` (si le contexte est un événement message)
4. `context.message?.guild?.id`
5. `context.guild?.id`

Chaque tentative est wrappée dans un `try/catch` silencieux pour éviter les erreurs de typage dynamique.

### Variables injectées

Si le service Lavalink est disponible et qu'une session existe pour le guild :

| Variable                | Source                                      | Valeur par défaut |
|-------------------------|---------------------------------------------|-------------------|
| `lavalink.title`       | `session.currentTrack?.info.title`          | `""`              |
| `lavalink.author`      | `session.currentTrack?.info.author`         | `""`              |
| `lavalink.duration`    | `session.currentTrack?.info.length` formaté | `"0:00"`          |
| `lavalink.position`    | `session.position` formaté                  | `"0:00"`          |
| `lavalink.queueSize`   | `session.queueSize.toString()`              | `"0"`             |
| `lavalink.volume`      | `session.volume.toString()`                 | `"100"`           |
| `lavalink.isPaused`    | `session.isPaused.toString()`               | `"false"`         |
| `lavalink.isLooping`   | `session.loop.toString()`                   | `"false"`         |
| `lavalink.thumbnail`   | `_getTrackThumbnail(current)`               | `""`              |

Si aucune session n'est trouvée, toutes les variables sont positionnées à leur valeur par défaut (chaînes vides ou zéros).

### Formatage de durée : `_formatDuration()`

Convertit un `Duration` en chaîne lisible :

- Si durée nulle → `"0:00"`
- Si < 1 heure → `"m:ss"` (ex: `"3:45"`)
- Si >= 1 heure → `"h:mm:ss"` (ex: `"1:23:45"`)

### Récupération de miniature : `_getTrackThumbnail()`

1. Tente d'abord `track.info.artworkUrl` (fourni par Lavalink)
2. Fallback YouTube : si la source est YouTube, construit l'URL `https://img.youtube.com/vi/{identifier}/hqdefault.jpg`
3. Si aucune source trouvée → `""`

---

## Debug Replay : labeling

Le système de debug replay capture chaque frame d'exécution d'action pour les rejouer ultérieurement. Le label identifiant la commande est déterminé automatiquement.

### Dans `executeActions`

Si `isCapturing` est vrai, le callback `onReplayCaptured` est fourni à `handleActions`. Le label est déterminé ainsi :

1. Si `replayLabel` est fourni et non vide → utilisé tel quel
2. Si le contexte est une `ApplicationCommandInteraction` → `"/{commandName}"` (ex: `"/ping"`)
3. Si `runtimeVariables` contient la clé `'0'` (préfixe de commande legacy) → `"!{prefix}"`
4. Sinon → `"Workflow"`

### Dans `executeVisualWorkflow`

Le `replayLabel` transmis à `executeActions` est :
- Le nom du workflow (`workflowName`) s'il est non vide
- Sinon, `"/{commandName}"` si l'interaction est une `ApplicationCommandInteraction`
- Sinon, `"Slash Command"`

### Dans `executeGeneralWorkflow`

Le `replayLabel` transmis est :
- Le `replayLabel` fourni en paramètre, ou
- Le nom du workflow (`workflowData['name']`)

### Signature du callback

```dart
void Function(String botId, String commandLabel, List<Map<String, dynamic>> frames, int totalMs)
```

---

## Workflows visuels : `executeVisualWorkflow()`

Exécute un workflow visuel complet (actions + réponse).

```dart
Future<void> executeVisualWorkflow(
  Map<String, dynamic> workflowData, {
  required Interaction interaction,
  required NyxxGateway gateway,
  required String botId,
  required Map<String, String> runtimeVariables,
})
```

### Pipeline

1. **Parsing de la réponse** — Extrait `workflowData["response"]` avec safe-cast (`Map<String, dynamic>`). Extrait le sous-objet `response['workflow']`.

2. **Parsing des actions** — Extrait `workflowData["actions"]` avec safe-cast (`List<Map<String, dynamic>>`).

3. **Chargement du workflow sauvegardé** — Si `workflow.name` est défini mais qu'aucune action n'est fournie, charge les actions depuis le store via `store.getWorkflowByName(botId, workflowName)`.

4. **Transpilation BDFD** — Toutes les actions passent par `_transpileVisualActions()` pour convertir la syntaxe BDFD inline (`$function[...]`) en payloads utilisant les placeholders `((...))`.

5. **Détermination ephemeral** — Un message est marqué ephemeral si :
   - `workflow.visibility == 'ephemeral'`, ou
   - Une action `respondWithMessage` a `ephemeral: true` dans son payload

6. **Auto-defer** — Si les actions contiennent une `deferInteraction` ou une `respondWithModal`, l'auto-defer est désactivé. Sinon, et si `workflow.autoDeferIfActions != false`, l'interaction est acknowledged automatiquement.

7. **Exécution des actions** — Appelle `executeActions()` avec le contexte d'interaction et un `replayLabel` dérivé du nom du workflow ou de la commande.

8. **Injection des résultats** — Chaque entrée du `Map<String, String>` retourné est injectée dans `runtimeVariables` sous la clé `action.{key}`.

9. **Envoi de la réponse** — Appelle `sendWorkflowResponse()` (du module `actions/interaction_response.dart`) pour envoyer la réponse configurée.

---

## Workflows généraux : `executeGeneralWorkflow()`

Exécute un workflow sans contexte d'interaction (événements, timers, etc.).

```dart
Future<void> executeGeneralWorkflow({
  required Map<String, dynamic> workflowData,
  required NyxxGateway gateway,
  required String botId,
  required Map<String, String> runtimeVariables,
  String? replayLabel,
})
```

### Pipeline

1. Extrait et parse les actions de `workflowData["actions"]` (safe-cast)
2. Retourne immédiatement si aucune action
3. Transpile les actions via `_transpileVisualActions()`
4. Appelle `executeActions()` avec `context: null` (pas d'interaction)
5. Le `replayLabel` est `replayLabel ?? workflowData['name']`

---

## Transpilation BDFD inline : `_transpileVisualActions()`

Cette méthode privée parcourt récursivement les payloads d'actions pour détecter et transpiler la syntaxe BDFD inline.

```dart
List<Action> _transpileVisualActions(List<Action> actions)
```

### Fonctionnement

1. **Fonction récursive `processValue`** — Parcourt les strings, maps et listes :
   - Si une string contient `$`, elle est soumise au `BdfdCompiler().compile()`
   - Si la compilation produit une unique action `sendMessage`/`respondWithMessage` avec un contenu, ce contenu compilé (avec placeholders `((...))`) remplace la valeur originale
   - Les maps et listes sont traitées récursivement

2. **Application** — Chaque action voit son `payload` transformé par `processValue`, produisant une nouvelle `Action` avec le payload transpilé.

Ce mécanisme permet aux workflows visuels de contenir de la syntaxe BDFD (`$username`, `$channelID`, `$randomText[...]`, etc.) qui est convertie en placeholders résolus au runtime.

---

## Flux complet d'exécution

```
Interaction/Événement
        │
        ▼
executeActions() / executeVisualWorkflow() / executeGeneralWorkflow()
        │
        ├─► Vérification debug replay (isDebugReplayCapturing)
        │
        ├─► _populateLavalinkVariables()
        │     └─► Résolution guildId (interaction → message → fallback)
        │     └─► Injection lavalink.title, .author, .duration, .position,
        │         .queueSize, .volume, .isPaused, .isLooping, .thumbnail
        │
        ├─► handleActions()  [actions/handler.dart]
        │     ├─► resolveTemplate: repopule Lavalink + resolveTemplatePlaceholders()
        │     ├─► onLog, lavalinkService, fallbackChannelId, fallbackGuildId
        │     └─► onReplayCaptured: détermine le label (/cmd, !prefix, Workflow)
        │
        ▼
Map<String, String> résultats
```
