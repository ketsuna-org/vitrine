---
layout: doc
title: $serverSplash[]
translation_key: docs
category: "Entity Info"
function_name: serverSplash
syntax: $serverSplash
description: Retourne l'URL de l'image de fond d'invitation (splash) du serveur Discord. Disponible uniquement pour les serveurs partenaires ou vérifiés avec un niveau de boost suffisant.
parameters: []
returns:
  type: string
  description: L'URL de l'image splash d'invitation. Retourne une chaîne vide si le serveur n'en a pas.
related:
  - $serverBanner
  - $serverIcon
  - $serverVanityURL
  - $boostLevel
examples:
  - description: Afficher le splash
    code: |
      $sendMessage[Splash du serveur : $serverSplash]
  - description: Embed avec splash
    code: |
      $title[$serverName]
      $image[$serverSplash]
      $color[#5865F2]
      $sendEmbedMessage
---

# $serverSplash[] — Image d'Invitation du Serveur

`$serverSplash[]` retourne l'URL de l'image de fond qui s'affiche sur la page d'invitation Discord du serveur (lorsqu'un utilisateur clique sur un lien d'invitation).

> **Prérequis** : Cette fonctionnalité est réservée aux serveurs partenaires Discord ou vérifiés, avec un niveau de boost suffisant.

## Syntaxe

```
$serverSplash
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'URL de l'image splash, ou une chaîne vide si non disponible.

## Utilisation

### Affichage simple

```bdfd
$if[$serverSplash!=]
$sendMessage[Splash d'invitation : $serverSplash]
$else
$sendMessage[Ce serveur n'a pas de splash d'invitation.]
$endif
```

### Embed avec splash

```bdfd
$title[$serverName — Rejoignez-nous !]
$description[$serverDescription]
$image[$serverSplash]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Page d'invitation personnalisée

```bdfd
$title[🌟 Invitation — $serverName]
$description[Vous êtes invité à rejoindre $serverName !]
$image[$serverSplash]
$addField[Lien d'invitation;discord.gg/$serverVanityURL;yes]
$addField[Membres;$membersCount;yes]
$color[#9B59B6]
$sendEmbedMessage
```

## Notes

- L'image splash est distincte de la bannière : elle apparaît spécifiquement sur la page d'invitation.
- Réservée aux serveurs partenaires ou vérifiés (badge Partenaire ou Vérifié).
- Si le serveur n'est pas éligible, la fonction retourne une chaîne vide.
- Dimensions recommandées : 1920x1080px (ratio 16:9).
