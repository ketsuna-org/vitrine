---
layout: doc
title: $disconnectMember
translation_key: docs
category: "Moderation"
function_name: disconnectMember
syntax: $disconnectMember[userID;(reason)]
description: Disconnects a member from their voice channel.
---

# $disconnectMember

Disconnects a member from their voice channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$disconnectMember[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The member must be connected to a voice channel.
- The bot needs Move Members in the guild.

## Examples

```bdfd
$disconnectMember[$mentioned[1]]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
