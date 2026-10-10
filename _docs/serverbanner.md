---
layout: doc
title: $serverBanner[]
translation_key: docs
category: "Entity Info"
function_name: serverBanner
syntax: $serverBanner[(guildID)]
description: Returns the URL of the banner of the current server, or of the server whose ID is given. Empty string if there is none.
---

# $serverBanner[] — Server Banner

`$serverBanner[]` returns the URL of the Discord server banner.

## Syntax

```
$serverBanner[(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `guildID` | *(Optional)* The ID of a server. If omitted or empty, the current server is used. A non-empty value that is not a positive integer raises `Invalid guild ID.` |

## Return Value

- **Type**: `string`
- The URL of the banner (`https://cdn.discordapp.com/banners/<guildID>/<hash>.png`, or `.gif` when the banner hash starts with `a_`), or an empty string if the server does not have one.
- If the server cannot be fetched, the value of the `guild.banner` context variable supplied by the host is returned, or an empty string if there is none.

## Examples

### Display in an embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$image[$serverBanner]
$color[#5865F2]
```

### Server welcome page

```bdfd
$title[🏠 Welcome to $serverName]
$description[$serverDescription]
$image[$serverBanner]
$addField[Members;$membersCount;yes]
$addField[Boosts;$serverBoostCount;yes]
$thumbnail[$serverIcon]
$color[#2ECC71]
$footer[$serverName]
```

### Check and fallback

```bdfd
$if[$serverBanner==]
  $var[bannerURL;$serverIcon]
$else
  $var[bannerURL;$serverBanner]
$endif
$title[$serverName]
$image[$var[bannerURL]]
```

## Notes

- `$guildBanner[guildID]` is a different function: it requires the server ID and raises `Guild not found.` instead of falling back.
- If the server does not have a banner, plan a fallback (such as the server icon or a default image).
