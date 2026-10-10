---
layout: doc
title: $serverSplash[]
translation_key: docs
category: "Entity Info"
function_name: serverSplash
syntax: $serverSplash[(unused)]
description: Returns the invite splash value supplied by the host in the guild.splash context variable, or an empty string.
---

# $serverSplash[] — Server Invite Splash Image

`$serverSplash[]` returns the value of the `guild.splash` context variable supplied by the host (the invite splash image of the current server). The engine does not query Discord itself.

## Syntax

```
$serverSplash[(unused)]
```

## Parameters

One optional argument is accepted but ignored: the splash of another server cannot be read.

## Return Value

- **Type**: `string`
- The text of `guild.splash` as supplied by the host; when the bot runner builds it, it is the URL of the splash image.
- An empty string if the host supplied none (for example when the server has no splash image).

## Examples

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
```

### Custom invite page

```bdfd
$title[🌟 Invite — $serverName]
$description[You are invited to join $serverName!]
$image[$serverSplash]
$addField[Invite Link;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$color[#9B59B6]
```

## Notes

- The splash image is a different value from the server banner (`$serverBanner`).
- If there is no splash image, the function returns an empty string; an empty `$image[]` should then be avoided.
