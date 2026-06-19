---
layout: doc
title: $serverFeatures[]
translation_key: docs
category: "Entity Info"
function_name: serverFeatures
syntax: $serverFeatures
description: Returns the list functionnalités premium enabledes on the server Discord (features of partenariat, vérification, expérimentations, etc.).
---

# $serverFeatures[] — Functionnalités of the Server

`$serverFeatures[]` retourne la list functionnalités speciales enabledes on the server Discord. Ces "features" incluent les beforeages of partenariat, les functionnalités of server communauté, and les functionnalités expérimentales.

## Syntax

```
$serverFeatures
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string` (list)
- Une string contenant les codes features enabledes, separateds par virgules.

## Features courantes

| Code | Description |
|------|-------------|
| `NEWS` | Channel of annonces enabled |
| `VANITY_URL` | URL of invite custome |
| `ANIMATED_ICON` | Icon animée (boost level 1) |
| `BANNER` | Banner of server (boost level 2) |
| `INVITE_SPLASH` | Image of invite custome |
| `COMMUNITY` | Server communauté enabled |
| `DISCOVERABLE` | Server listé in the découverte |
| `MEMBER_VERIFICATION_GATE_ENABLED` | Écran of règles enabled |
| `WELCOME_SCREEN_ENABLED` | Écran of accueil enabled |
| `PREVIEW_ENABLED` | Server prévisualisable before of rejoindre |
| `TICKETED_EVENTS_ENABLED` | Events payants enableds |
| `MONETIZATION_ENABLED` | Monétisation enablede |
| `PRIVATE_THREADS` | Fils privates enableds |
| `THREADS_ENABLED` | Fils enableds |

## Utilisation

### Affichage features

```bdfd
$sendMessage[🛠️ Features actives : $serverFeatures]
```

### Détection of une feature

```bdfd
$if[$serverFeatures$contains[COMMUNITY]]
$sendMessage[✅ Ce server est un server communauté.]
$else
$sendMessage[ℹ️ Ce server is not configured like communauté.]
$endif
```

### Embed diagnostic

```bdfd
$title[🔍 Diagnostic — $serverName]
$addField[Features;$serverFeatures;yes]
$addField[Boost level;$boostLevel;yes]
$addField[Members;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Plusieurs vérifications

```bdfd
$var[features;$serverFeatures]
$if[$var[features]$contains[NEWS]]
$sendMessage[📢 Channels of annonces enableds]
$endif
$if[$var[features]$contains[VANITY_URL]]
$sendMessage[🔗 URL custome : discord.gg/$serverVanityURL]
$endif
$if[$var[features]$contains[ANIMATED_ICON]]
$sendMessage[🎬 Icon animée available]
$endif
```

## Notes

- La list features est retournée sous forme of string unique, pas of array.
- Utilisez `$contains[]` pour check the présence of une feature specific.
- Les features availables dépendent of the level of boost and of the status of the server (partenaire, vérifié).
- Certaines features can be enabledes manually in thes parameters of the server (ex: COMMUNITY).
