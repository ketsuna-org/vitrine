---
layout: doc
title: $serverDeafen
translation_key: docs
category: "Moderation"
function_name: serverDeafen
syntax: $serverDeafen[userID;deaf;(reason)]
description: Server-deafens or undeafens a member in voice.
---

# $serverDeafen

Server-deafens or undeafens a member in voice. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$serverDeafen[userID;deaf;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `deaf` | `true` (default) to deafen, `false` to undeafen. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Deafen Members in the guild.

## Examples

```bdfd
$serverDeafen[$mentioned[1];false]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
