---
layout: doc
title: "Système — Permission Flags"
translation_key: docs
category: systems
description: >
  Documentation du système de gestion des permissions Discord : flags, catégories,
  calcul de bitmasks, décomposition, et normalisation des tokens BDFD.
---

# Système — Permission Flags

Le module **Permission Flags** définit l'ensemble des permissions Discord, leur regroupement par catégories, et les fonctions de calcul et normalisation utilisées dans le runtime BDFD. Il est implémenté dans `packages/shared/lib/utils/permission_flags.dart` (373 lignes).

## Vue d'ensemble

```
┌──────────────────────────────────────────────────────────────────────┐
│                    MODULE PERMISSION FLAGS                            │
│                                                                       │
│  Types de données                                                     │
│  ├─ PermissionFlag        (key, bitValue, category, voiceOnly?)       │
│  ├─ PermissionCategory    (enum : general, membership, text,          │
│  │                          voice, advanced)                          │
│  └─ discordPermissionFlags (List<PermissionFlag>, 41 permissions)     │
│                                                                       │
│  Fonctions de calcul                                                  │
│  ├─ computeAllowBitmask(allowedKeys) → int                           │
│  ├─ computeDenyBitmask(deniedKeys) → int                             │
│  └─ decomposePermissionBitmasks(allow, deny) → Map<key, state>       │
│                                                                       │
│  Normalisation BDFD                                                   │
│  ├─ normalizeBdfdPermissionToken(raw) → String?                      │
│  └─ bdfdPermissionListToStates(tokens) → Map<key, 'allow'>           │
└──────────────────────────────────────────────────────────────────────┘
```

---

## Types de données

### `PermissionFlag`

Représente une permission Discord individuelle avec ses métadonnées.

```dart
class PermissionFlag {
  final String key;              // Clé normalisée (ex: 'sendMessages')
  final int bitValue;            // Valeur binaire (ex: 0x800 = 2048)
  final PermissionCategory category;  // Catégorie UI
  final bool voiceOnly;          // Réservé aux canaux vocaux (défaut: false)
}
```

### `PermissionCategory`

Enum de 5 catégories pour le regroupement UI :

| Catégorie    | Description                          |
|--------------|--------------------------------------|
| `general`    | Permissions générales du serveur     |
| `membership` | Gestion des membres                  |
| `text`       | Permissions des canaux textuels      |
| `voice`      | Permissions des canaux vocaux        |
| `advanced`   | Permissions avancées                 |

---

## Liste des permissions (`discordPermissionFlags`)

Les 41 permissions Discord sont déclarées dans une `const List<PermissionFlag>`, dans l'ordre d'affichage.

### Catégorie General (9 permissions)

| Clé                      | Bit (hex)     | Bit (décimal)      |
|--------------------------|---------------|--------------------|
| `createInstantInvite`    | `0x1`         | 1                  |
| `manageChannels`         | `0x10`        | 16                 |
| `manageGuild`            | `0x20`        | 32                 |
| `manageRoles`            | `0x10000000`  | 268 435 456        |
| `manageWebhooks`         | `0x20000000`  | 536 870 912        |
| `manageGuildExpressions` | `0x40000000`  | 1 073 741 824      |
| `viewAuditLog`           | `0x80`        | 128                |
| `viewGuildInsights`      | `0x80000`     | 524 288            |
| `manageEvents`           | `0x200000000` | 8 589 934 592      |

### Catégorie Membership (4 permissions)

| Clé               | Bit (hex)       | Bit (décimal)   |
|-------------------|-----------------|-----------------|
| `administrator`   | `0x8`           | 8               |
| `kickMembers`     | `0x2`           | 2               |
| `banMembers`      | `0x4`           | 4               |
| `moderateMembers` | `0x10000000000` | 1 099 511 627 776 |

### Catégorie Text (16 permissions)

| Clé                       | Bit (hex)        | Bit (décimal)      |
|---------------------------|------------------|--------------------|
| `viewChannel`             | `0x400`          | 1 024              |
| `sendMessages`            | `0x800`          | 2 048              |
| `sendMessagesInThreads`   | `0x4000000000`   | 274 877 906 944    |
| `createPublicThreads`     | `0x800000000`    | 34 359 738 368     |
| `createPrivateThreads`    | `0x1000000000`   | 68 719 476 736     |
| `manageThreads`           | `0x400000000`    | 17 179 869 184     |
| `manageMessages`          | `0x2000`         | 8 192              |
| `embedLinks`              | `0x4000`         | 16 384             |
| `attachFiles`             | `0x8000`         | 32 768             |
| `readMessageHistory`      | `0x10000`        | 65 536             |
| `addReactions`            | `0x40`           | 64                 |
| `mentionEveryone`         | `0x20000`        | 131 072            |
| `useExternalEmojis`       | `0x40000`        | 262 144            |
| `useExternalStickers`     | `0x2000000000`   | 137 438 953 472    |
| `sendTtsMessages`         | `0x1000`         | 4 096              |
| `sendVoiceMessages`       | `0x400000000000` | 70 368 744 177 664 |
| `useApplicationCommands`  | `0x80000000`     | 2 147 483 648      |

### Catégorie Voice (11 permissions)

Toutes les permissions vocales ont `voiceOnly: true`.

| Clé                 | Bit (hex)        | Bit (décimal)      |
|---------------------|------------------|--------------------|
| `connect`           | `0x100000`       | 1 048 576          |
| `speak`             | `0x200000`       | 2 097 152          |
| `stream`            | `0x200`          | 512                |
| `useVoiceActivity`  | `0x2000000`      | 33 554 432         |
| `prioritySpeaker`   | `0x100`          | 256                |
| `muteMembers`       | `0x400000`       | 4 194 304          |
| `deafenMembers`     | `0x800000`       | 8 388 608          |
| `moveMembers`       | `0x1000000`      | 16 777 216         |
| `requestToSpeak`    | `0x100000000`    | 4 294 967 296      |
| `useSoundboard`     | `0x40000000000`  | 4 398 046 511 104  |
| `useExternalSounds` | `0x200000000000` | 35 184 372 088 832 |

### Catégorie Advanced (2 permissions)

| Clé               | Bit (hex)    | Bit (décimal) |
|-------------------|--------------|---------------|
| `changeNickname`  | `0x4000000`  | 67 108 864    |
| `manageNicknames` | `0x8000000`  | 134 217 728   |

---

## Fonctions de calcul

### `computeAllowBitmask(allowedKeys)`

Calcule le bitmask **allow** à partir d'un ensemble de clés de permission autorisées.

```dart
int computeAllowBitmask(Set<String> allowedKeys)
```

Combine avec OU binaire (`|=`) les `bitValue` de chaque `PermissionFlag` dont la clé est présente dans `allowedKeys`.

### `computeDenyBitmask(deniedKeys)`

Calcule le bitmask **deny** à partir d'un ensemble de clés de permission refusées.

```dart
int computeDenyBitmask(Set<String> deniedKeys)
```

Même logique que `computeAllowBitmask` mais pour les permissions refusées.

### `decomposePermissionBitmasks(allow, deny)`

Décompose les bitmasks allow/deny en une `Map<String, String>` où chaque clé de permission est associée à un état.

```dart
Map<String, String> decomposePermissionBitmasks(int allow, int deny)
```

| Condition                      | État     |
|--------------------------------|----------|
| `(allow & flag.bitValue) != 0` | `allow`  |
| `(deny & flag.bitValue) != 0`  | `deny`   |
| Sinon                          | `unset`  |

Utile pour reconstruire l'état tri-state (Allow / Deny / Unset) de chaque permission à partir des bitmasks stockés.

---

## Normalisation BDFD

### `normalizeBdfdPermissionToken(raw)`

Normalise un token de permission BDFD vers la clé canonique utilisée par `PermissionFlag`.

```dart
String? normalizeBdfdPermissionToken(String raw)
```

Étapes :
1. Normalise le token brut : `trim().toLowerCase().replaceAll(RegExp(r'[^a-z0-9]'), '')`
2. Recherche une correspondance directe parmi les `discordPermissionFlags`
3. Recherche parmi les 14 **alias BDFD** connus
4. Retourne `null` si non reconnu

#### Table des alias BDFD

| Token BDFD           | Clé canonique              |
|----------------------|----------------------------|
| `admin`              | `administrator`            |
| `ban`                | `banMembers`               |
| `kick`               | `kickMembers`              |
| `changenicknames`    | `changeNickname`           |
| `externalemojis`     | `useExternalEmojis`        |
| `externalstickers`   | `useExternalStickers`      |
| `manageemojis`       | `manageGuildExpressions`   |
| `manageserver`       | `manageGuild`              |
| `readmessages`       | `viewChannel`              |
| `slashcommands`      | `useApplicationCommands`   |
| `tts`                | `sendTtsMessages`          |
| `usevad`             | `useVoiceActivity`         |
| `voicedeafen`        | `deafenMembers`            |
| `voicemute`          | `muteMembers`              |

### `bdfdPermissionListToStates(tokens)`

Convertit une liste de tokens BDFD (issue de l'import de commandes legacy) en une `Map<String, String>` compatible avec le format `permissionFlags` du runtime.

```dart
Map<String, String> bdfdPermissionListToStates(List<String> tokens)
```

Chaque token reconnu est mappé à l'état `'allow'`. Les tokens non reconnus sont silencieusement ignorés.

Exemple :
```dart
bdfdPermissionListToStates(['admin', 'ban', 'kick', 'inconnu'])
// → {'administrator': 'allow', 'banMembers': 'allow', 'kickMembers': 'allow'}
```

---

## Graphe de dépendances

```
bdfdPermissionListToStates
└── normalizeBdfdPermissionToken
    ├── discordPermissionFlags (recherche directe)
    └── aliases (table statique de 14 alias)

computeAllowBitmask
└── discordPermissionFlags (OR binaire)

computeDenyBitmask
└── discordPermissionFlags (OR binaire)

decomposePermissionBitmasks
└── discordPermissionFlags (AND binaire, 41 tests)
```

---

## Intégration dans le runtime

Le module est utilisé à plusieurs niveaux :

1. **UI** : `discordPermissionFlags` alimente l'interface de configuration des permissions (tri-state toggles par catégorie)
2. **Exécuteur** : `computeAllowBitmask` / `computeDenyBitmask` produisent les bitmasks envoyés à l'API Discord
3. **Import BDFD** : `bdfdPermissionListToStates` convertit les listes de permissions legacy au format moderne
4. **Affichage** : `decomposePermissionBitmasks` permet de reconstruire l'état visuel depuis des bitmasks existants

Les fonctions `computeAllowBitmask` et `computeDenyBitmask` ne gèrent pas l'héritage de `administrator` — les permission overrides Discord attendent des bitmasks explicites. L'héritage admin est géré côté serveur par Discord.
