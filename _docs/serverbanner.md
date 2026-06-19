---
layout: doc
title: $serverBanner[]
translation_key: docs
category: "Entity Info"
function_name: serverBanner
syntax: $serverBanner
description: Returns the URL of the banner of the server Discord (available only for the servers of level boost 2 or plus).
---

# $serverBanner[] — Banner of the Server

`$serverBanner[]` retourne the URL of the banner of the server Discord. The banner est une image horizontale displayede en haut of la list channels on the clinkts of bureau.

> **Prérequired** : The server must be to the level of boost 2 or plus pour pouvoir define ae banner custome.

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

### Affichage in a embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$image[$serverBanner]
$color[#5865F2]
$sendEmbedMessage
```

### Page of accueil of the server

```bdfd
$title[🏠 Bienvenue on $serverName]
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

- `$serverBanner[]` est un alias of `$guildBanner[]`.
- Requires a level of boost server of level 2 or 3.
- La banner est differente of l'icon (l'icon est becauserée, la banner est rectangulaire, ratio ~16:9).
- Si the server n'a pas of banner, prévoyez un fallback (icon of the server or image default).
