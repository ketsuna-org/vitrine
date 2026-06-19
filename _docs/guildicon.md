---
layout: doc
title: $guildIcon[]
translation_key: docs
category: "Entity Info"
function_name: guildIcon
syntax: $guildIcon
description: Alias of $serverIcon. Returns the URL of the icon of the server Discord.
---

# $guildIcon[] — Icon of the Server (Alias)

`$guildIcon[]` est un alias of `$serverIcon[]`. Il retourne the URL of the icon of the server Discord.

## Syntax

```
$guildIcon
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL directe of l'icon (format PNG/WEBP), or une string vide.

## Utilisation

### Embed with icon

```bdfd
$title[$guildName]
$thumbnail[$guildIcon]
$description[$serverDescription]
$color[#5865F2]
$sendEmbedMessage
```

### Footer with icon

```bdfd
$footer[$guildName;$guildIcon]
$description[Message officiel]
$color[#2ECC71]
$sendEmbedMessage
```

### Vérification of icon

```bdfd
$if[$guildIcon==]
$sendMessage[⚠️ Ce server n'a pas of icon custome.]
$else
$sendMessage[✅ Icon of the server : $guildIcon]
$endif
```

## Notes

- `$guildIcon[]` and `$serverIcon[]` sont strictement identicals.
- The URL provient of the CDN Discord and est accessible publicment.
- Returns ae string vide si the server n'a pas of icon.
