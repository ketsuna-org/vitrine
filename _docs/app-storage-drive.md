---
layout: doc
title: "Application — Stockage cloud : Google Drive (sauvegarde/restauration)"
translation_key: docs
category: app
description: >
  Documentation de l'intégration Google Drive de Bot Creator : authentification
  OAuth multi-plateforme, sauvegarde snapshot avec versioning, restauration
  complète, gestion des tokens, format ZIP, artefacts de runtime DB.
---

# Application — Stockage cloud : Google Drive (sauvegarde/restauration)

Fichier : `packages/app/lib/core/storage/drive.dart` (~1369 lignes)

Ce module gère l'intégration **Google Drive** pour la sauvegarde et la restauration des données de l'application. Il supporte Android, iOS, Windows, macOS et Linux via des flux d'authentification adaptés à chaque plateforme.

---

## Architecture d'authentification

L'authentification est **spécifique à la plateforme** :

### Mobile (Android / iOS)

Utilise le package natif `google_sign_in` avec Credential Manager sur Android 14+.

```dart
Future<GoogleSignInAccount> _getMobileSignedInAccount({bool interactive = true});
```

**Flow :**
1. Tentative d'authentification silencieuse (`attemptLightweightAuthentication`).
2. Si échec et mode interactif : `signIn.authenticate()` avec les scopes Drive.
3. Autorisation des scopes `drive.appdata` via `authorizeScopes()`.
4. Création d'un client OAuth (`auth.AuthClient`) pour l'API Drive.

**Caching :** l'instance `DriveApi` est mise en cache (`_mobileDriveApiCache`) pour éviter les pop-ups d'authentification redondants. Les requêtes concurrentes sont coalescées via `_mobileDriveApiInFlight`.

**Client IDs mobiles :**

| Constante | Valeur par défaut | Usage |
|---|---|---|
| `_iosClientId` | `777382167262-2clnpnd4ijkjp71gvmpp5u0rik446kn8` | Client OAuth iOS |
| `_androidServerClientIdFallback` | `777382167262-on5tpqhctm19sa84jfke5igbn0m9q5uc` | Server Client ID Android (Web OAuth) |

### Desktop (Windows / macOS / Linux)

Utilise le **flux OAuth navigateur avec PKCE** (Proof Key for Code Exchange).

```dart
Future<void> _authenticateDesktopIfNeeded();
Future<_BrowserOAuthTokens> _runBrowserOAuthFlow({required String clientId});
```

**Flow :**
1. Vérification du cache token local (`google_drive_desktop_tokens.json`).
2. Si le token est expiré : tentative de rafraîchissement via `_refreshBrowserToken()`.
3. Si le refresh token est révoqué/expiré (`invalid_grant`) : nettoyage du cache et nouvelle authentification complète.
4. Authentification complète :
   - Génération d'un `code_verifier` PKCE (96 caractères).
   - Ouverture du navigateur système vers `accounts.google.com/o/oauth2/v2/auth`.
   - Écoute HTTP sur `localhost:{port}` pour intercepter le callback OAuth.
   - Échange du code contre un token via `oauth2.googleapis.com/token`.
   - Sauvegarde des tokens dans `{appSupportDir}/auth/google_drive_desktop_tokens.json`.

**Client IDs desktop :**

| Constante | Valeur par défaut |
|---|---|
| `_desktopClientId` | `777382167262-tf9rvusrqqd2fnsal8s7bfe80ur21n11` |
| `_desktopClientSecret` | `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` |

Configurables via `--dart-define=GOOGLE_DESKTOP_CLIENT_ID=...` et `GOOGLE_DESKTOP_CLIENT_SECRET`.

### Classes internes

```dart
class _BrowserOAuthTokens {
  final String accessToken;
  final String? refreshToken;
  final DateTime expiry;
}

class _AccessTokenClient extends http.BaseClient {
  // Ajoute automatiquement le header Authorization: Bearer
}
```

### Déconnexion

```dart
Future<void> disconnectDriveAccount();
```

Nettoie tous les caches : `_mobileDriveApiCache`, `_desktopTokens`, déconnexion Google Sign-In.

---

## API publique

```dart
Future<DriveApi> getDriveApi({bool interactive = true});
```

Retourne une instance authentifiée de l'API Google Drive v3 pour la plateforme courante.

- **Desktop** : authentification OAuth navigateur → `DriveApi(_AccessTokenClient(...))`
- **Mobile** : Google Sign-In natif → `DriveApi(authClient)`

```dart
Future<GoogleSignInAccount> getSignedInAccount({bool interactive = true});
```

Disponible uniquement sur mobile. Retourne le compte Google connecté.

```dart
bool isDriveAuthCancellation(Object error);
```

Détecte si une erreur correspond à une annulation utilisateur.

---

## Opérations sur les fichiers Drive

### Création de dossier

```dart
Future<File> createFolder(DriveApi drive, {required String name, String parentId = ''});
```

Crée un dossier dans `appDataFolder` (par défaut) ou dans un dossier parent spécifié.

### Upload

```dart
Future<File> uploadFile(DriveApi drive, {
  required String filePath,
  required String fileName,
  String mimeType = 'application/json',
  String parentId = '',
});
```

Upload un fichier local vers Drive avec le type MIME spécifié.

### Download

```dart
Future<void> downloadFile(DriveApi drive, {fileId = '', filePath = ''});
```

Télécharge un fichier depuis Drive (full media download).

### Suppression

```dart
Future<void> deleteFile(DriveApi drive, {fileId = ''});
```

### Liste

```dart
Future<List<File>> listFiles(DriveApi drive);
```

Liste tous les fichiers dans `appDataFolder` (non mis à la corbeille).

---

## Système de sauvegarde (Snapshot)

### Structure des snapshots

Les sauvegardes sont organisées dans un dossier racine `backups_v2` :

```
appDataFolder/
  backups_v2/
    {snapshotId}/              # Ex: 2026-06-18T03-24-00-123456Z
      __meta__.json            # Métadonnées du snapshot
      apps_snapshot.zip        # Archive ZIP des fichiers JSON
      variables.db             # Artefact runtime DB (optionnel)
      variables.db-wal         # WAL SQLite
      variables.db-shm         # Shared memory SQLite
```

Les artefacts runtime (`variables.db*`) sont inclus pour préserver l'état des variables scopées SQLite.

### Métadonnées (`__meta__.json`)

```json
{
  "version": 2,
  "snapshotId": "2026-06-18T03-24-00-123456Z",
  "label": "Sauvegarde manuelle",
  "createdAt": "2026-06-18T03:24:00.123456Z",
  "fileCount": 42,
  "totalBytes": 1048576,
  "appCount": 5,
  "apps": [
    {"id": "123456789", "name": "MonBot"},
    {"id": "987654321", "name": "AutreBot"}
  ],
  "format": "zip-v1",
  "archiveFile": "apps_snapshot.zip",
  "runtimeDbArtifacts": [
    {"name": "variables.db", "size": 65536}
  ]
}
```

### Création d'un snapshot

```dart
Future<BackupSnapshotSummary> createBackupSnapshot(
  DriveApi drive,
  AppManager appm, {
  String label = 'Manual backup',
});
```

**Étapes :**
1. `appm.flushPendingWrites()` — vide la file d'écritures pour capturer l'état le plus récent.
2. Création du dossier `backups_v2` si nécessaire.
3. Création d'un dossier nommé d'après le timestamp (`snapshotId`).
4. Parcours récursif de `apps/` → création d'une archive ZIP contenant tous les fichiers `.json`.
5. Upload de l'archive ZIP (`application/zip`).
6. Upload des artefacts runtime DB (`variables.db`, `variables.db-wal`, `variables.db-shm`).
7. Upload du fichier de métadonnées `__meta__.json`.
8. Élagage des anciens snapshots (conserve les 20 plus récents).

### Liste des snapshots

```dart
Future<List<BackupSnapshotSummary>> listBackupSnapshots(DriveApi drive);
```

Retourne la liste triée par date décroissante.

### Dernier snapshot

```dart
Future<BackupSnapshotSummary?> getLatestBackupSnapshot(DriveApi drive);
```

### Restauration

```dart
Future<String> restoreBackupSnapshot(
  BuildContext context,
  DriveApi drive,
  AppManager appm, {
  required String snapshotId,
});
```

**Étapes :**
1. Localisation du dossier de snapshot.
2. Recherche du fichier `apps_snapshot.zip`.
3. **Nouveau format (ZIP)** : téléchargement → extraction vers le dossier `apps/` local.
4. Restauration des artefacts runtime DB.
5. `appm.refreshApps()` + `appm.reapDeletedBots()`.
6. **Format legacy** : restauration récursive dossier par dossier (fallback).

Si des artefacts runtime DB ont été restaurés, un message spécifique invite à redémarrer l'application.

### Suppression d'un snapshot

```dart
Future<void> deleteBackupSnapshot(DriveApi drive, {required String snapshotId});
```

### Élagage automatique

```dart
Future<void> _pruneSnapshots(DriveApi drive, {int keepLatest = 20});
```

Conserve uniquement les **20 snapshots les plus récents**.

---

## Fonctions d'entrée/sortie utilisateur

Ces fonctions sont appelées depuis l'UI et retournent des chaînes localisées :

```dart
Future<String> uploadAppData(BuildContext context, DriveApi drive, AppManager appm);
Future<String> downloadAppData(BuildContext context, DriveApi drive, AppManager appm);
```

`downloadAppData` tente d'abord de restaurer le dernier snapshot. En l'absence de snapshots, il bascule vers le format legacy (`_downloadLegacyFlatBackup`).

---

## Classe `BackupSnapshotSummary`

```dart
class BackupSnapshotSummary {
  final String snapshotId;
  final String label;
  final DateTime createdAt;
  final int fileCount;
  final int totalBytes;
  final int appCount;
  final List<Map<String, String>> apps;

  factory BackupSnapshotSummary.fromJson(Map<String, dynamic> json);
}
```

---

## Gestion des erreurs et robustesse

- **Annulation utilisateur** : l'exception `UserCancelledGoogleSignInException` est levée et détectée via `isDriveAuthCancellation()`.
- **Timeout OAuth** : 5 minutes pour le callback navigateur.
- **Refresh token expiré** : détection `invalid_grant` → nettoyage du cache → nouvelle authentification.
- **Fichiers verrouillés (Windows)** : les opérations `delete` et `create` sur les répertoires utilisent des tentatives avec backoff (`_deleteFileWithRetry`, `_recreateDirectoryWithRetry`) pour gérer les verrous temporaires du système de fichiers.

---

## Résumé du flux de sauvegarde/restauration

```
┌──────────────┐     ┌───────────────┐     ┌─────────────────┐
│  AppManager  │────▶│  Archive ZIP  │────▶│  Google Drive    │
│  (apps/*.json│     │  apps/*.json  │     │  appDataFolder/  │
│   databases/ │     │  variables.db │     │  backups_v2/     │
│   variables) │     │  __meta__.json│     │  {snapshotId}/   │
└──────────────┘     └───────────────┘     └─────────────────┘
       ▲                                           │
       │          Restauration                     │
       └───────────────────────────────────────────┘
              extraction ZIP + refreshApps()
```
