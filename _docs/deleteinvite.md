---
layout: doc
title: $deleteInvite
translation_key: docs
category: "Moderation"
function_name: deleteInvite
syntax: $deleteInvite[inviteCode]
description: Revokes an invite.
---

# $deleteInvite

Revokes an invite. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$deleteInvite[inviteCode]
```

## Parameters

| Parameter | Description |
|---|---|
| `inviteCode` | **Required.** The invite code, without the `discord.gg/` part. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Channels in the guild.

## Examples

```bdfd
$deleteInvite[abc123]
```
