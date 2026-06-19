---
layout: doc
title: $serverFeatures[]
translation_key: docs
category: "Entity Info"
function_name: serverFeatures
syntax: $serverFeatures
description: Returns the list des functionnalités premium enabledes on the server Discord (features de partenariat, vérification, expérimentations, etc.).
---

# $serverFeatures[] — Functionnalités du Server

`$serverFeatures[]` retourne la list des functionnalités speciales enabledes on the server Discord. Ces "features" incluent les beforeages de partenariat, les functionnalités de server communauté, and les functionnalités expérimentales.

## Syntax

```
$serverFeatures
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string` (list)
- Une string contenant les codes des features enabledes, separateds par des virgules.

## Features courantes

| Code | Description |
|------|-------------|
| `NEWS` | Channel d'annonces enabled |
| `VANITY_URL` | URL d'invite custome |
| `ANIMATED_ICON` | Icon animée (boost level 1) |
| `BANNER` | Banner de server (boost level 2) |
| `INVITE_SPLASH` | Image d'invite custome |
| `COMMUNITY` | Server communauté enabled |
| `DISCOVERABLE` | Server listé in the découverte |
| `MEMBER_VERIFICATION_GATE_ENABLED` | Écran de règles enabled |
| `WELCOME_SCREEN_ENABLED` | Écran d'accueil enabled |
| `PREVIEW_ENABLED` | Server prévisualisable before de rejoindre |
| `TICKETED_EVENTS_ENABLED` | Events payants enableds |
| `MONETIZATION_ENABLED` | Monétisation enablede |
| `PRIVATE_THREADS` | Fils privates enableds |
| `THREADS_ENABLED` | Fils enableds |

## Utilisation

### Affichage des features

```bdfd
$sendMessage[🛠️ Features actives : $serverFeatures]
```

### Détection d'une feature

```bdfd
$if[$serverFeatures$contains[COMMUNITY]]
$sendMessage[✅ Ce server est un server communauté.]
$else
$sendMessage[ℹ️ Ce server is not configured comme communauté.]
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
$sendMessage[📢 Channels d'annonces enableds]
$endif
$if[$var[features]$contains[VANITY_URL]]
$sendMessage[🔗 URL custome : discord.gg/$serverVanityURL]
$endif
$if[$var[features]$contains[ANIMATED_ICON]]
$sendMessage[🎬 Icon animée available]
$endif
```

## Notes

- La list des features est retournée sous forme de string unique, pas de array.
- Utilisez `$contains[]` pour vérifier la présence d'une feature spécifique.
- Les features availables dépendent du level de boost and du status of the server (partenaire, vérifié).
- Certaines features can be enabledes manually in thes parameters of the server (ex: COMMUNITY).
