---
layout: doc
title: $guildBanner[]
translation_key: docs
category: "Entity Info"
function_name: guildBanner
syntax: $guildBanner
description: Alias de $serverBanner. Returns the URL of the banner of the server Discord (requires the level de boost 2+).
---

# $guildBanner[] — Banner du Server (Alias)

`$guildBanner[]` est un alias de `$serverBanner[]`. Il retourne the URL of the banner of the server Discord.

> **Prérequired** : Level de boost 2 or plus required.

## Syntax

```
$guildBanner
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL of the banner, or une string vide si non available.

## Utilisation

### Embed avec banner

```bdfd
$title[$guildName]
$description[$serverDescription]
$image[$guildBanner]
$thumbnail[$guildIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Fallback icon si pas de banner

```bdfd
$if[$guildBanner!=]
$var[headerImage;$guildBanner]
$else
$var[headerImage;$guildIcon]
$endif
$title[$guildName]
$image[$var[headerImage]]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- `$guildBanner[]` and `$serverBanner[]` sont interchangeables.
- La banner est une image horizontale (ratio ~16:9) displayede en haut de la list des channels.
- Si the server n'a pas le level required, the function retourne une string vide.
