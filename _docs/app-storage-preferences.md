---
layout: doc
title: "Application — Stockage local : répertoires et préférences"
translation_key: docs
category: app
description: >
  Documentation des répertoires de stockage local (app documents, cache,
  support, fallback) et des préférences runtime (SharedPreferences) de
  l'application Bot Creator.
---

# Application — Stockage local : répertoires et préférences

Ce document couvre deux modules légers mais essentiels de la couche de stockage : la résolution des **répertoires de stockage local** (`app_storage_directory.dart`) et la gestion des **préférences utilisateur runtime** (`runtime_preferences.dart`).

---

## Répertoires de stockage — `app_storage_directory.dart`

Fichier : `packages/app/lib/core/storage/app_storage_directory.dart` (~69 lignes)

Ce module fournit les fonctions de résolution du répertoire de stockage principal de l'application, avec une chaîne de fallback robuste pour gérer les environnements atypiques.

### Fonctions principales

```dart
Future<Directory> getAppStorageDirectory();
Future<String> getAppStoragePath();
```

`getAppStoragePath()` est un wrapper pratique qui retourne le chemin sous forme de `String`.

### Chaîne de fallback

La résolution du répertoire de stockage suit une cascade de tentatives :

| Priorité | Source | Condition |
|---|---|---|
| 1 | `getApplicationDocumentsDirectory()` | Plateforme standard (Android, iOS, Windows, macOS, Linux) |
| 2 | `getApplicationSupportDirectory()` | Si le répertoire documents est indisponible |
| 3 | `$XDG_DATA_HOME/bot_creator` | Si `XDG_DATA_HOME` est défini (Linux) |
| 4 | `$HOME/.local/share/bot_creator` | Fallback Linux standard |
| 5 | `{tmp}/bot_creator` | Dernier recours : répertoire temporaire système |

### Gestion des erreurs

La fonction `getAppStorageDirectory()` capture deux types d'erreurs spécifiques :

```dart
try {
  final docs = await getApplicationDocumentsDirectory();
  // ...
} on MissingPlatformDirectoryException {
  // Fallback vers support directory
} on PlatformException catch (error) {
  if (!_isMissingDocumentsDirectoryPlatformException(error)) {
    rethrow;
  }
  // Fallback vers support directory
}
```

La méthode `_isMissingDocumentsDirectoryPlatformException` vérifie si le message d'erreur contient des indices pertinents :

```dart
bool _isMissingDocumentsDirectoryPlatformException(PlatformException error) {
  final message = (error.message ?? '').toLowerCase();
  return message.contains('application documents') ||
      message.contains('missingplatformdirectoryexception') ||
      message.contains('unable to get');
}
```

Cette approche est nécessaire car certaines plateformes (comme Steam Deck) ne montent pas de répertoire `Documents` classique, et l'erreur remonte sous forme de `PlatformException` plutôt que `MissingPlatformDirectoryException`.

### Fallback d'urgence

```dart
Future<Directory> _resolveEnvironmentFallbackDirectory() async {
  // 1. XDG_DATA_HOME
  final xdgDataHome = Platform.environment['XDG_DATA_HOME']?.trim() ?? '';
  if (xdgDataHome.isNotEmpty) {
    return Directory(path.join(xdgDataHome, 'bot_creator'));
  }

  // 2. ~/.local/share/bot_creator
  final home = Platform.environment['HOME']?.trim() ?? '';
  if (home.isNotEmpty) {
    return Directory(path.join(home, '.local', 'share', 'bot_creator'));
  }

  // 3. Répertoire temporaire système
  return Directory(path.join(Directory.systemTemp.path, 'bot_creator'));
}
```

### Utilisation dans le reste de l'application

`getAppStoragePath()` est consommé par :

- **`AppManager`** : pour stocker les fichiers JSON des bots (`apps/`), les payloads, les statistiques.
- **`SqliteVariableStore`** : pour la base de données SQLite (`databases/variables.db`).
- **`drive.dart`** : pour lire les fichiers locaux lors des sauvegardes et écrire lors des restaurations.

---

## Préférences runtime — `runtime_preferences.dart`

Fichier : `packages/app/lib/core/storage/runtime_preferences.dart` (~32 lignes)

Ce module gère les **préférences utilisateur persistantes** via `shared_preferences`. Il est minimaliste et ne contient actuellement qu'un seul flag.

### Classe `RuntimePreferences`

```dart
class RuntimePreferences {
  RuntimePreferences._();  // Constructeur privé — pas d'instanciation

  static Future<bool> isMobileLocalHostingEnabled();
  static Future<void> setMobileLocalHostingEnabled(bool enabled);
  static bool get supportsMobileLocalHosting;
}
```

### Flag : `mobile_local_hosting_enabled`

Contrôle si l'application peut démarrer un **serveur HTTP local** sur Android pour l'hébergement de fichiers statiques (images, etc.) utilisés par les bots.

**Clé SharedPreferences :** `mobile_local_hosting_enabled`

**Plateformes supportées :** Android uniquement.

```dart
static bool get supportsMobileLocalHosting {
  if (kIsWeb) return false;
  return defaultTargetPlatform == TargetPlatform.android;
}
```

### Comportement

| Méthode | Comportement |
|---|---|
| `isMobileLocalHostingEnabled()` | Retourne `false` si la plateforme ne supporte pas le local hosting. Sinon, lit la valeur depuis SharedPreferences (défaut: `false`). |
| `setMobileLocalHostingEnabled(enabled)` | N'enregistre `true` que si `supportsMobileLocalHosting == true`. Sur les autres plateformes, la valeur est forcée à `false`. |

### Design

- **Pas d'instanciation** : toutes les méthodes sont statiques. La classe sert de namespace.
- **Appels asynchrones** : `SharedPreferences.getInstance()` est appelé à chaque lecture/écriture (le plugin gère son propre cache interne).
- **Extensibilité** : de nouveaux flags peuvent être ajoutés en suivant le même pattern (clé constante + getter + setter statiques).

---

## Résumé

```
┌────────────────────────────────────────────────┐
│          app_storage_directory.dart             │
│  Résolution du répertoire de stockage          │
├────────────────────────────────────────────────┤
│  1. getApplicationDocumentsDirectory()         │
│  2. getApplicationSupportDirectory() (fallback)│
│  3. $XDG_DATA_HOME/bot_creator                 │
│  4. $HOME/.local/share/bot_creator             │
│  5. /tmp/bot_creator (dernier recours)         │
└────────────────────────────────────────────────┘
                       │
                       ▼
┌────────────────────────────────────────────────┐
│         Consommé par :                         │
│  • AppManager (fichiers JSON des bots)         │
│  • SqliteVariableStore (variables.db)          │
│  • drive.dart (sauvegardes Google Drive)       │
└────────────────────────────────────────────────┘


┌────────────────────────────────────────────────┐
│          runtime_preferences.dart               │
│  Préférences utilisateur (SharedPreferences)   │
├────────────────────────────────────────────────┤
│  Flag : mobile_local_hosting_enabled            │
│  Plateforme : Android uniquement               │
│  Usage : démarrage d'un serveur HTTP local     │
└────────────────────────────────────────────────┘
```
