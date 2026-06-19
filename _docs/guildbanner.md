---
layout: doc
title: $guildBanner[]
translation_key: docs
category: "Entity Info"
function_name: guildBanner
syntax: $guildBanner
description: Alias of $serverBanner. Returns the URL of the banner of the Discord server (requires boost level 2+).
---

# $guildBanner[] — Server Banner (Alias)

`$guildBanner[]` is an alias of `$serverBanner[]`. It returns the URL of the banner of the Discord server.

> **Prerequisite** : Boost level 2 or higher required.

## Syntax

```
$guildBanner
```

## Parameters

No parameters.

## Return Value

- **Type** : `string`
- The URL of the banner, or an empty string if not available.

## Usage

### Embed with banner

```bdfd
$title[$guildName]
$description[$serverDescription]
$image[$guildBanner]
$thumbnail[$guildIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Fallback to icon if no banner

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

- `$guildBanner[]` and `$serverBanner[]` are interchangeable.
- The banner is a horizontal image (ratio ~16:9) displayed at the top of the channel list.
- If the server does not have the required level, the function returns an empty string.
