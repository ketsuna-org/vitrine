---
layout: doc
title: $serverMute
translation_key: docs
category: "Moderation"
function_name: serverMute
syntax: $serverMute[userID;mute;(reason)]
description: Server-mutes or unmutes a member in voice.
---

# $serverMute

Server-mutes or unmutes a member in voice. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$serverMute[userID;mute;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `mute` | `true` (default) to mute, `false` to unmute. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- Not the same as `$mute` (a timeout): this one only affects voice.
- The bot needs Mute Members in the guild.

## Examples

```bdfd
$serverMute[$mentioned[1]]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
