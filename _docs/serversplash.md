---
layout: doc
title: $serverSplash[]
translation_key: docs
category: "Entity Info"
function_name: serverSplash
syntax: $serverSplash
description: Returns the URL of the invite splash image of the Discord server. Available only for partnered or verified servers with a sufficient boost level.
---

# $serverSplash[] — Server Invite Splash Image

`$serverSplash[]` returns the URL of the background image that appears on the Discord invite page of the server (when a user clicks an invite link).

> **Prerequisite**: This feature is reserved for Discord partnered or verified servers, or servers with a sufficient boost level.

## Syntax

```
$serverSplash
```

## Parameters

None.

## Return Value

- **Type**: `string`
- The URL of the splash image, or an empty string if not available.

## Usage

### Simple display

```bdfd
$if[$serverSplash!=]
$sendMessage[Invite splash: $serverSplash]
$else
$sendMessage[This server does not have an invite splash image.]
$endif
```

### Embed with splash

```bdfd
$title[$serverName — Join us!]
$description[$serverDescription]
$image[$serverSplash]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

### Custom invite page

```bdfd
$title[🌟 Invite — $serverName]
$description[You are invited to join $serverName!]
$image[$serverSplash]
$addField[Invite Link;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$color[#9B59B6]
$sendEmbedMessage
```

## Notes

- The splash image is distinct from the server banner: it specifically appears on the invite page.
- Reserved for partnered or verified servers (Partner or Verified badge), or those with sufficient boosts.
- If the server is not eligible or has no splash image, the function returns an empty string.
- Recommended dimensions: 1920x1080px (16:9 ratio).
