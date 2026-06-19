---
layout: doc
title: $serverFeatures[]
translation_key: docs
category: "Entity Info"
function_name: serverFeatures
syntax: $serverFeatures
description: Retourne la liste des fonctionnalités premium activées sur le serveur Discord (features de partenariat, vérification, expérimentations, etc.).
parameters: []
returns:
  type: string (liste)
  description: "Une liste des features activées, séparées par des virgules (ex: \"NEWS, VANITY_URL, ANIMATED_ICON\")."
related:
  - $serverInfo
  - $serverVerificationLevel
  - $vanityURL
examples:
  - description: Afficher les features
    code: |
      $sendMessage[Features du serveur : $serverFeatures]
  - description: Vérifier une feature spécifique
    code: |
      $if[$serverFeatures$contains[VANITY_URL]]
      $sendMessage[Ce serveur a une URL personnalisée !]
      $endif
---

# $serverFeatures[] — Fonctionnalités du Serveur

`$serverFeatures[]` retourne la liste des fonctionnalités spéciales activées sur le serveur Discord. Ces "features" incluent les avantages de partenariat, les fonctionnalités de serveur communauté, et les fonctionnalités expérimentales.

## Syntaxe

```
$serverFeatures
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string` (liste)
- Une chaîne contenant les codes des features activées, séparés par des virgules.

## Features courantes

| Code | Description |
|------|-------------|
| `NEWS` | Salon d'annonces activé |
| `VANITY_URL` | URL d'invitation personnalisée |
| `ANIMATED_ICON` | Icône animée (boost niveau 1) |
| `BANNER` | Bannière de serveur (boost niveau 2) |
| `INVITE_SPLASH` | Image d'invitation personnalisée |
| `COMMUNITY` | Serveur communauté activé |
| `DISCOVERABLE` | Serveur listé dans la découverte |
| `MEMBER_VERIFICATION_GATE_ENABLED` | Écran de règles activé |
| `WELCOME_SCREEN_ENABLED` | Écran d'accueil activé |
| `PREVIEW_ENABLED` | Serveur prévisualisable avant de rejoindre |
| `TICKETED_EVENTS_ENABLED` | Événements payants activés |
| `MONETIZATION_ENABLED` | Monétisation activée |
| `PRIVATE_THREADS` | Fils privés activés |
| `THREADS_ENABLED` | Fils activés |

## Utilisation

### Affichage des features

```bdfd
$sendMessage[🛠️ Features actives : $serverFeatures]
```

### Détection d'une feature

```bdfd
$if[$serverFeatures$contains[COMMUNITY]]
$sendMessage[✅ Ce serveur est un serveur communauté.]
$else
$sendMessage[ℹ️ Ce serveur n'est pas configuré comme communauté.]
$endif
```

### Embed diagnostic

```bdfd
$title[🔍 Diagnostic — $serverName]
$addField[Features;$serverFeatures;yes]
$addField[Boost niveau;$boostLevel;yes]
$addField[Membres;$membersCount;yes]
$color[#5865F2]
$sendEmbedMessage
```

### Plusieurs vérifications

```bdfd
$var[features;$serverFeatures]
$if[$var[features]$contains[NEWS]]
$sendMessage[📢 Salons d'annonces activés]
$endif
$if[$var[features]$contains[VANITY_URL]]
$sendMessage[🔗 URL personnalisée : discord.gg/$serverVanityURL]
$endif
$if[$var[features]$contains[ANIMATED_ICON]]
$sendMessage[🎬 Icône animée disponible]
$endif
```

## Notes

- La liste des features est retournée sous forme de chaîne unique, pas de tableau.
- Utilisez `$contains[]` pour vérifier la présence d'une feature spécifique.
- Les features disponibles dépendent du niveau de boost et du statut du serveur (partenaire, vérifié).
- Certaines features peuvent être activées manuellement dans les paramètres du serveur (ex: COMMUNITY).
