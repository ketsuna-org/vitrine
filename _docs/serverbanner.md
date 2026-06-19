---
layout: doc
title: $serverBanner[]
translation_key: docs
category: "Entity Info"
function_name: serverBanner
syntax: $serverBanner
description: Returns the URL of the banner of the server Discord (available only for the servers de level boost 2 or plus).
---

# $serverBanner[] — Banner du Server

`$serverBanner[]` retourne the URL of the banner of the server Discord. The banner est une image horizontale displayede en haut de la list des channels sur les clinkts de bureau.

> **Prérequired** : The server must be au level de boost 2 or plus pour pouvoir définir une banner custome.

## Syntax

```
$serverBanner
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL of the banner of the server, or une string vide si the server n'en a pas.

## Utilisation

### Affichage dans un embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$image[$serverBanner]
$color[#5865F2]
$sendEmbedMessage
```

### Page d'accueil of the server

```bdfd
$title[🏠 Bienvenue sur $serverName]
$description[$serverDescription]
$image[$serverBanner]
$addField[Members;$membersCount;yes]
$addField[Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
$footer[$serverName]
$sendEmbedMessage
```

### Vérification and fallback

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
- Requires a level de boost server de level 2 or 3.
- La banner est differente de l'icon (l'icon est becauserée, la banner est rectangulaire, ratio ~16:9).
- Si the server n'a pas de banner, prévoyez un fallback (icon of the server or image default).
