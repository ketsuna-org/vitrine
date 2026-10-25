---
layout: doc
title: $createInvite
translation_key: docs
category: "Moderation"
function_name: createInvite
syntax: $createInvite[channelID;maxAgeSeconds;maxUses;temporary]
description: Creates an invite to a channel and returns its code.
---

# $createInvite

Creates an invite to a channel and returns its code. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$createInvite[channelID;maxAgeSeconds;maxUses;temporary]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Channel ID (digits only). Optional: empty means the current channel. |
| `maxAgeSeconds` | Lifetime in seconds. Empty means 86400 (one day), `0` never expires. |
| `maxUses` | Number of uses. Empty or `0` means unlimited. |
| `temporary` | `true` to kick members who were not given a role when they leave. |

## Return Value

- **Type**: String
- The invite code. The link is `https://discord.gg/<code>`.

## Behavior

- All arguments are optional.
- The bot needs Create Invite in the guild.

## Examples

```bdfd
$sendMessage[https://discord.gg/$createInvite[$channelID;3600;1]]
```
