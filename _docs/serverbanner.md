---
layout: doc
title: $serverBanner[]
translation_key: docs
category: "Entity Info"
function_name: serverBanner
syntax: $serverBanner
description: Returns the URL of the Discord server banner (available only for servers with boost level 2 or higher).
---

# $serverBanner[] — Server Banner

`$serverBanner[]` returns the URL of the Discord server banner. The banner is a horizontal image displayed at the top of the channel list on desktop clients.

> **Prerequisite**: The server must be boost level 2 or higher to be able to set a custom banner.

## Syntax

```
$serverBanner
```

## Parameters

No parameters.

## Return Value

- **Type**: `string`
- The URL of the server banner, or an empty string if the server does not have one.

## Usage

### Display in an embed

```bdfd
$title[$serverName]
$description[$serverDescription]
$image[$serverBanner]
$color[#5865F2]
$sendEmbedMessage
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
$sendEmbedMessage
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
$sendEmbedMessage
```

## Notes

- `$serverBanner[]` is an alias of `$guildBanner[]`.
- Requires a server boost level of 2 or 3.
- The banner is different from the icon (the icon is square, while the banner is rectangular with a ~16:9 ratio).
- If the server does not have a banner, plan a fallback (such as the server icon or a default image).
