---
layout: doc
title: $guildBanner[]
translation_key: docs
category: "Entity Info"
function_name: guildBanner
syntax: $guildBanner[guildID]
description: Returns the URL of the banner of the Discord server whose ID is given. $serverBanner is the equivalent that can be called without a parameter.
---

# $guildBanner[] — Server Banner

`$guildBanner[guildID]` returns the URL of the banner of the Discord server whose ID is given. To read the banner of the current server without giving its ID, use `$serverBanner`.

## Syntax

```
$guildBanner[guildID]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | The ID of the server. Required: `$guildBanner` without brackets or with empty brackets is refused. |

## Return Value

- **Type** : `string`
- The URL of the banner, or an empty string if the server has no banner.
- An error is raised if the ID is invalid or if the server cannot be found.

## Examples

### Embed with banner

```bdfd
$title[$guildName]
$description[$serverDescription]
$image[$guildBanner[$guildID]]
$thumbnail[$guildIcon]
$color[#5865F2]
```

### Fallback to icon if no banner

```bdfd
$if[$guildBanner[$guildID]!=]
$var[headerImage;$guildBanner[$guildID]]
$else
$var[headerImage;$guildIcon]
$endif
$title[$guildName]
$image[$var[headerImage]]
$color[#5865F2]
```

## Notes

- `$serverBanner` returns the banner of the current server and accepts an optional server ID.
- The banner is a horizontal image displayed at the top of the channel list.
- If the server has no banner, the function returns an empty string.
