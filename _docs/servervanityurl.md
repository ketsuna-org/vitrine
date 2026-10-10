---
layout: doc
title: $serverVanityURL[]
translation_key: docs
category: "Entity Info"
function_name: serverVanityURL
syntax: $serverVanityURL[(unused)]
description: Returns the vanity URL code supplied by the host in the guild.vanityUrlCode context variable, or an empty string.
---

# $serverVanityURL[] — Custom URL of the Server

`$serverVanityURL[]` returns the value of the `guild.vanityUrlCode` context variable supplied by the host (the vanity URL code of the current server). The engine does not query Discord itself.

## Syntax

```
$serverVanityURL[(unused)]
```

## Parameters

One optional argument is accepted but ignored: the vanity URL of another server cannot be read.

## Return Value

- **Type**: `string`
- The code as supplied by the host (for example `"my-server"`), without `discord.gg/`.
- An empty string if the host supplied none (for example when the server has no vanity URL).

## Examples

### Invite link

```bdfd
$if[$serverVanityURL!=]
$sendMessage[🔗 Join us: **discord.gg/$serverVanityURL**]
$else
$sendMessage[This server does not have a custom URL.]
$endif
```

### Invite embed

```bdfd
$title[🌟 $serverName]
$description[$serverDescription]
$addField[Join;discord.gg/$serverVanityURL;yes]
$addField[Members;$membersCount;yes]
$thumbnail[$serverIcon]
$image[$serverSplash]
$color[#9B59B6]
```

### Welcome page

```bdfd
$title[Information on $serverName]
$addField[🌟 URL;discord.gg/$serverVanityURL;yes]
$addField[👑 Owner;<@$serverOwner>;yes]
$addField[👥 Members;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
```

## Notes

- Build the link yourself: `https://discord.gg/<code>`; the function returns only the code.
- When the code is empty, the examples would produce a broken link, so test it first as in the first example.
