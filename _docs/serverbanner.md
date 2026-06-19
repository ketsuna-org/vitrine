---
layout: doc
title: $serverBanner[]
translation_key: docs
category: "Entity Info"
function_name: serverBanner
syntax: $serverBanner
description: Retourne l'URL de la bannière du serveur Discord (disponible uniquement pour les serveurs de niveau boost 2 ou plus).
parameters: []
returns:
  type: string
  description: L'URL de la bannière du serveur. Retourne une chaîne vide si le serveur n'a pas de bannière ou n'atteint pas le niveau de boost requis.
related:
  - $guildBanner
  - $serverIcon
  - $serverSplash
  - $boostLevel
examples:
  - description: Afficher la bannière dans un embed
    code: |
      $title[$serverName]
      $image[$serverBanner]
      $color[#5865F2]
      $sendEmbedMessage
  - description: Vérifier si une bannière existe
    code: |
      $if[$serverBanner==]
      $sendMessage[Ce serveur n'a pas de bannière.]
      $else
      $sendMessage[Bannière : $serverBanner]
      $endif
---

# $serverBanner[] — Bannière du Serveur

`$serverBanner[]` retourne l'URL de la bannière du serveur Discord. La bannière est une image horizontale affichée en haut de la liste des salons sur les clients de bureau.

> **Prérequis** : Le serveur doit être au niveau de boost 2 ou plus pour pouvoir définir une bannière personnalisée.

## Syntaxe

```
$serverBanner
```

## Paramètres

Aucun paramètre.

## Valeur de retour

- **Type** : `string`
- L'URL de la bannière du serveur, ou une chaîne vide si le serveur n'en a pas.

## Utilisation

### Affichage dans un embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$image[$serverBanner]
$color[#5865F2]
$sendEmbedMessage
```

### Page d'accueil du serveur

```bdfd
$title[🏠 Bienvenue sur $serverName]
$description[$serverDescription]
$image[$serverBanner]
$addField[Membres;$membersCount;yes]
$addField[Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
$footer[$serverName]
$sendEmbedMessage
```

### Vérification et fallback

```bdfd
$if[$serverBanner==]
$var[bannerURL;$serverIcon]
$else
$var[bannerURL;$serverBanner]
$endif
$title[$serverName]
$image[$var[bannerURL]]
$sendEmbedMessage
```

## Notes

- `$serverBanner[]` est un alias de `$guildBanner[]`.
- Nécessite un niveau de boost serveur de niveau 2 ou 3.
- La bannière est différente de l'icône (l'icône est carrée, la bannière est rectangulaire, ratio ~16:9).
- Si le serveur n'a pas de bannière, prévoyez un fallback (icône du serveur ou image par défaut).
