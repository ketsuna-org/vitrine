---
layout: doc
title: $moveMember
translation_key: docs
category: "Moderation"
function_name: moveMember
syntax: $moveMember[userID;channelID;(reason)]
description: Moves a member who is in a voice channel to another voice channel.
---

# $moveMember

Moves a member who is in a voice channel to another voice channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$moveMember[userID;channelID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `channelID` | **Required.** The destination voice channel ID. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The member must already be connected to a voice channel.
- The bot needs Move Members in the guild.

## Examples

```bdfd
$moveMember[$authorID;123456789012345678]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
