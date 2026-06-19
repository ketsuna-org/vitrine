---
layout: doc
title: $serverVanityURL[]
translation_key: docs
category: "Entity Info"
function_name: serverVanityURL
syntax: $serverVanityURL
description: Returns the custom URL code (vanity URL) of the Discord server. Available only for level 3 boosted servers or partnered/verified servers.
---

# $serverVanityURL[] — Custom URL of the Server

`$serverVanityURL[]` returns the custom URL code (vanity URL) of the server. This short URL allows creating an easy-to-remember invite link (e.g., `discord.gg/my-server`).

> **Prerequisite**: Server boost level 3, or Discord partnered/verified server.

## Syntax

```
$serverVanityURL
```

## Parameters

None.

## Return Value

- **Type**: `string`
- The code of the custom URL (e.g., `"my-server"`), or an empty string if not available.

## Usage

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
$sendEmbedMessage
```

### Welcome page

```bdfd
$title[Information on $serverName]
$addField[🌟 URL;discord.gg/$serverVanityURL;yes]
$addField[👑 Owner;<@$serverOwner>;yes]
$addField[👥 Members;$membersCount;yes]
$thumbnail[$serverIcon]
$color[#5865F2]
$sendEmbedMessage
```

## Notes

- The complete URL is `discord.gg/<code>` or `https://discord.gg/<code>`.
- The code is configured in the server settings (under "Overview" → "Custom Invite Link").
- Requires boost level 3 or Partnered/Verified status.
- The code is unique across all of Discord.
- If the server does not have a custom URL, use `$createInvite[]` to generate a standard invite link.
