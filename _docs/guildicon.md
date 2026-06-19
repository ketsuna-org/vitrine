---
layout: doc
title: $guildIcon[]
translation_key: docs
category: "Entity Info"
function_name: guildIcon
syntax: $guildIcon
description: Alias of $serverIcon. Returns the URL of the Discord server icon.
---

# $guildIcon[] — Server Icon (Alias)

`$guildIcon[]` is an alias of `$serverIcon[]`. It returns the URL of the Discord server icon.

## Syntax

```
$guildIcon
```

## Parameters

No parameters.

## Return Value

- **Type** : `string`
- The direct URL of the icon (PNG/WEBP format), or an empty string.

## Usage

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
$description[Official message]
$color[#2ECC71]
$sendEmbedMessage
```

### Icon check

```bdfd
$if[$guildIcon==]
$sendMessage[⚠️ This server does not have a custom icon.]
$else
$sendMessage[✅ Server icon: $guildIcon]
$endif
```

## Notes

- `$guildIcon[]` and `$serverIcon[]` are strictly identical.
- The URL comes from the Discord CDN and is publicly accessible.
- Returns an empty string if the server has no icon.
