---
layout: doc
title: $userServerBanner
translation_key: docs
category: "Entity Info"
function_name: userServerBanner
syntax: $userServerBanner[userID;(size);(format)]
description: Returns the URL of the member's server profile banner, or an empty string if they have none. Bot Creator function, not in BDFD.
---

# $userServerBanner

The `$userServerBanner` function returns the **URL of the banner of a member's server profile**. It is ready to use: no need to build the CDN URL from a hash. This function does not exist in BDFD: it is specific to Bot Creator.

## Syntax

```
$userServerBanner[userID;(size);(format)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required - The ID of the member (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |
| `size` | Optional - Image size in pixels: a power of two from 16 to 4096. Empty or absent: Discord's default size. Another value raises `Invalid image size`. |
| `format` | Optional - `png`, `jpg`, `jpeg`, `webp` or `gif`. Empty or absent: `png`, or `gif` for an animated image. `gif` on a static image keeps its default format. |

## Return Value

- **Type**: String (URL) or empty string
- The URL of the server banner of the member.
- An empty string if the member has no server banner. The global banner (`$userBanner`) is never substituted, so a script can tell the two apart.

## Behavior

- The user must be a member of the server, otherwise the error `User is not a member of this guild.` is raised.

## Examples

### Prefer the server banner, fall back to the global one

```bdfd
$if[$userServerBanner[$authorID]!=]
  $image[$userServerBanner[$authorID;1024;png]]
$elseif[$authorBanner!=]
  $image[$authorBanner]
$endif
$sendMessage[Profile]
```

## Notes

- Use `$userBanner` for the global banner and `$userBannerColor` for the accent color.
- In a JavaScript bot (discord.js): `member.bannerURL({ size: 1024, extension: 'png' })`, `null` when the member has no server banner.
