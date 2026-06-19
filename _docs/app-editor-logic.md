---
layout: doc
title: "App — Logique de l'Éditeur (State, Normalisation, Payloads, Export/Import)"
translation_key: docs
category: app
description: >
  Documentation de la couche logique de l'éditeur de bot : CommandEditorNotifier
  (state management), action_normalization (purge des paramètres), BotPayloadBuilder
  (construction et synchronisation des payloads API), et BotExportImport
  (export/import ZIP avec gestion des conflits).
---

# App — Logique de l'Éditeur (State, Normalisation, Payloads, Export/Import)

La couche logique (`logic/`) contient les mécanismes de state management, de normalisation des données, de construction des payloads API et d'export/import. Elle fait le pont entre l'interface utilisateur (presentation) et les couches de stockage/réseau.

## Fichiers source

```
packages/app/lib/features/bot_editor/logic/
├── command_editor_notifier.dart       ← State management (ChangeNotifier)
├── action_normalization.dart         ← Normalisation/purge des paramètres d'action
├── bot_payload_builder.dart          ← Construction des payloads API + sync runner
├── bot_export_import.dart            ← Export/import ZIP (manifest, sections)
├── command_editor_state.dart         ← État immutable de l'éditeur
├── normalize_command_data.dart       ← Normalisation des données de commande
└── ...
```

---

## `CommandEditorNotifier` — State Management

`CommandEditorNotifier` (339 lignes) est un `ChangeNotifier` qui centralise tout l'état de l'éditeur de commande. Il remplace les champs mutables et les appels `setState` de `_CommandCreatePageState`.

### Architecture

```
┌─────────────────────────────────────────┐
│         CommandEditorNotifier            │
│         (ChangeNotifier)                 │
│                                         │
│  _state: CommandEditorState             │
│    ├── commandName                      │
│    ├── commandDescription               │
│    ├── commandType                      │
│    ├── options                          │
│    ├── actions                          │
│    ├── executionMode                    │
│    ├── bdfdScriptContent                │
│    ├── bdfdCompileResult                │
│    ├── legacyModeEnabled                │
│    ├── localOnlyCommand                 │
│    ├── folder                           │
│    ├── integrationTypes                 │
│    ├── contexts                         │
│    ├── defaultMemberPermissions         │
│    ├── subcommandWorkflows              │
│    ├── activeSubcommandRoute            │
│    ├── isLoading                        │
│    ├── isDataIncomplete                 │
│    ├── persistedGlobalVariableNames     │
│    ├── scopedVariableSuggestionNames    │
│    └── initialEditSnapshot              │
└─────────────────────────────────────────┘
```

### Pattern d'utilisation

```dart
// Lecture complète
final notifier = context.watch<CommandEditorNotifier>();

// Lecture sélective (reconstruit uniquement si la propriété change)
final name = context.select(
  (CommandEditorNotifier n) => n.state.commandName
);
```

### Méthodes de mise à jour

Chaque propriété de l'état possède sa méthode dédiée. Exemples :

```dart
void updateCommandName(String name) {
  _state = _state.copyWith(commandName: name);
  notifyListeners();
}

void updateActions(List<Map<String, dynamic>> actions) {
  _state = _state.copyWith(actions: actions);
  notifyListeners();
}
```

Opérations sur les listes :

| Méthode | Description |
|---------|-------------|
| `addAction(action)` | Ajoute une action à la fin |
| `removeAction(index)` | Supprime une action par index |
| `moveActionUp(index)` | Remonte une action d'une position |
| `moveActionDown(index)` | Descend une action d'une position |

### Batching des mises à jour

Pour éviter des reconstructions multiples lors d'une opération complexe :

```dart
notifier.batchUpdate((state) {
  return state
    .copyWith(commandName: newName)
    .copyWith(commandDescription: newDesc)
    .copyWith(actions: newActions);
});
// Une seule notification émise à la fin
```

Mécanisme :

```
beginBatch() → _batching = true
    │
    ├── updateCommandName()  → _state modifié, notifyListeners() ignoré
    ├── updateActions()      → _state modifié, notifyListeners() ignoré
    │
endBatch()   → _batching = false, notifyListeners() appelé UNE fois
```

### Snapshot de l'état d'édition

`buildEditSnapshot()` crée un JSON de l'état courant pour la détection de modifications (dirty state) :

```json
{
  "name": "/ping",
  "description": "Pong!",
  "commandType": "chatInput",
  "folder": "Utils",
  "integrationTypes": ["guildInstall"],
  "contexts": ["guild"]
}
```

---

## `action_normalization.dart` — Normalisation des actions

Ce module (203 lignes) purge les paramètres non pertinents d'une action selon son type et son mode. Objectif : stricte séparation entre les modes de réponse.

### Fonction principale : `purgeActionPayloadStrict()`

```dart
Map<String, dynamic> purgeActionPayloadStrict(
  BotCreatorActionType type,
  Map<String, dynamic> parameters,
)
```

### Règles de purge par type

**`sendMessage` et `respondWithMessage`** :

| Mode | Conservé | Supprimé |
|------|----------|----------|
| `message` / `normal` | content, embeds, components, attachments | componentV2 |
| `componentV2` | componentV2, attachments | content, embeds, components |

**`respondWithComponentV2`** : seuls `channelId`, `components`, `componentV2`, `attachments`, `ephemeral`, `visibility`, `key`, `messageMode` sont conservés.

**`respondWithModal`** : seuls `modal` et `key` sont conservés.

**`editInteractionMessage` et `editMessage`** :

| Mode | Conservé | Supprimé |
|------|----------|----------|
| `message` / `normal` | content, embeds | componentV2 |
| `componentV2` | componentV2 | content, embeds |

**`runtimeImageBlock`** : les sous-actions canvas (create, loadImage, drawText, drawCircle, drawRect, drawLine) sont converties en opérations runtime structurées (`{op, width, height, color, ...}`).

**`editChannelPermissions`** : les états de permissions (`allow`/`deny`) sont convertis en bitmasks numériques via `computeAllowBitmask()`/`computeDenyBitmask()`.

### Règle universelle

Le champ `embed` (legacy) est **toujours supprimé** au profit de `embeds` (liste).

---

## `bot_payload_builder.dart` — Construction des payloads API

Ce module (649 lignes) construit les payloads JSON envoyés à l'API du runner pour la sauvegarde et la synchronisation.

### Fonction principale : `buildBotPayload()`

Construit le payload complet d'un bot à partir du stockage local :

```
buildBotPayload(botId)
    │
    ├── Récupère les données du bot (appManager.getApp)
    ├── Liste les commandes (appManager.listAppCommands)
    │   └── Pour chaque commande :
    │       ├── Récupère les données complètes
    │       ├── Migre si nécessaire (CommandMigration)
    │       ├── Normalise (normalizeCommandData)
    │       └── Ajoute au payload
    ├── Récupère les workflows (appManager.getWorkflows)
    ├── Récupère les variables globales
    ├── Récupère les statuts/activités
    └── Assemble le payload final
```

### Système de synchronisation

Le `_SyncBatcher` gère le debouncing et le throttling des synchronisations :

```
_SyncBatcher
    │
    ├── _debounceDuration = 3 secondes (attente d'inactivité)
    └── _maxThrottleDuration = 15 secondes (limite max d'attente)
```

Fonctionnement :
1. Chaque modification de commande déclenche `requestSync(botId, syncTask)`
2. Si une sync est déjà en attente pour ce bot → le timer est réinitialisé (debounce 3s)
3. Si le temps écoulé depuis la première requête dépasse 15s → sync immédiate (throttle)
4. La sync envoie le payload complet au runner

### Hook d'auto-reload du runner

`initRunnerAutoReload()` enregistre des hooks pour que les sauvegardes de commandes utilisent des mises à jour localisées tandis que les sauvegardes complètes du bot déclenchent un rechargement complet du runner.

---

## `bot_export_import.dart` — Export/Import

Ce module (366 lignes) gère l'export et l'import de bots au format ZIP.

### Structure du ZIP d'export

```
export_bot.zip
├── manifest.json               ← Métadonnées (version, date, sections, compteurs)
├── commands/{commandId}.json   ← Une commande par fichier JSON
├── workflows.json              ← Tous les workflows sélectionnés
├── status.json                 ← Statuts et activités
└── global_variables.json       ← Variables globales (définitions + valeurs)
```

**Le token du bot n'est JAMAIS inclus dans l'export.**

### Fonction `exportBot()`

```dart
Future<Uint8List> exportBot(
  String botId, {
  Set<ExportSection> sections = {...},
  Set<String>? commandIds,     // Filtrer les commandes
  Set<String>? workflowNames,  // Filtrer les workflows
})
```

### Sections exportables

| Section | Contenu |
|---------|---------|
| `commands` | Liste des commandes (JSON individuel par commande) |
| `workflows` | Workflows réutilisables |
| `status` | Statuts et activités du bot |
| `globalVariables` | Variables globales (clé → valeur) |

### Parsing d'import : `parseExportZip()`

Retourne un `ImportPreview` contenant :

```dart
class ImportPreview {
  final int manifestVersion;
  final List<Map<String, dynamic>> commands;
  final List<Map<String, dynamic>> workflows;
  final Map<String, dynamic>? status;
  final Map<String, dynamic>? globalVariables;
}
```

### Import : `importBot()`

Gère les conflits nom de commande/workflow via des résolutions explicites :

```dart
enum ConflictResolution { overwrite, skip }
```

**Logique d'import des commandes** :
1. Charge les commandes existantes du bot cible
2. Pour chaque commande importée :
   - Si le nom existe déjà → applique la résolution (`overwrite` ou `skip`)
   - Si `overwrite` : réutilise l'ID existant, écrase les données
   - Si `skip` : ignore la commande
   - Si nouveau : génère un ID local (timestamp microseconds)
3. Nettoie les tokens accidentels

**Logique d'import des workflows** :
- Même principe avec résolution par nom
- Normalisation du type de workflow et du point d'entrée

### Résultat d'import

```dart
class ImportResult {
  final int commandsImported;
  final int commandsSkipped;
  final int workflowsImported;
  final int workflowsSkipped;
  final bool statusImported;
  final bool globalVariablesImported;
}
```

---

## Flux de données complet

```
┌─────────────┐     ┌─────────────────────┐     ┌──────────────────┐
│  Interface  │────▶│  CommandEditorNotifier │────▶│  Sérialisation   │
│  utilisateur│     │  (state management)    │     │  (JSON)          │
└─────────────┘     └─────────────────────┘     └────────┬─────────┘
                                                          │
                                                          ▼
┌─────────────┐     ┌─────────────────────┐     ┌──────────────────┐
│  Runner     │◀────│  BotPayloadBuilder   │◀────│  Action          │
│  (exécution)│     │  (sync + payload)    │     │  Normalization   │
└─────────────┘     └─────────────────────┘     └──────────────────┘
       │                                                │
       │         ┌─────────────────────┐                │
       └────────▶│  Stockage local     │◀───────────────┘
                 │  (AppManager)       │
                 └─────────────────────┘
                          │
                          ▼
                 ┌─────────────────────┐
                 │  Export/Import       │
                 │  (ZIP)              │
                 └─────────────────────┘
```

---

## Points clés

- **State immutable** : `CommandEditorState` avec `copyWith`, changements atomiques
- **Batching** : `beginBatch()`/`endBatch()` pour des mises à jour groupées sans重建 multiples
- **Sélecteurs** : `context.select()` pour des reconstructions granulaires
- **Normalisation** : purge stricte des paramètres selon le type et le mode de l'action
- **Debounce/Throttle** : synchronisation intelligente vers le runner (3s idle, 15s max)
- **Export sans token** : sécurité intégrée dans toutes les opérations d'export
- **Gestion de conflits** : overwrite/skip explicite par ressource
- **Compatibilité** : migration automatique des commandes via `CommandMigration`
