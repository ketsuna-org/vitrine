---
layout: doc
title: $guildIcon[]
translation_key: docs
category: "Entity Info"
function_name: guildIcon
syntax: $guildIcon
description: Alias de $serverIcon. Returns the URL of the icon of the server Discord.
---

# $guildIcon[] — Icon du Server (Alias)

`$guildIcon[]` est un alias de `$serverIcon[]`. Il retourne the URL of the icon of the server Discord.

## Syntax

```
$guildIcon
```

## Parameters

Aucun parameter.

## Return Value

- **Type** : `string`
- The URL directe de l'icon (format PNG/WEBP), or une string vide.

## Utilisation

### Embed avec icon

```bdfd
$title[$guildName]
$thumbnail[$guildIcon]
$description[$serverDescription]
$color[#5865F2]
$sendEmbedMessage
```

### Footer avec icon

```bdfd
$footer[$guildName;$guildIcon]
$description[Message officiel]
$color[#2ECC71]
$sendEmbedMessage
```

### Vérification d'icon

```bdfd
$if[$guildIcon==]
$sendMessage[⚠️ Ce server n'a pas d'icon custome.]
$else
$sendMessage[✅ Icon of the server : $guildIcon]
$endif
```

## Notes

- `$guildIcon[]` and `$serverIcon[]` sont strictement identicals.
- The URL provient du CDN Discord and est accessible publicment.
- Returns ae string vide si the server n'a pas d'icon.
