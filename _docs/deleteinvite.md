---
layout: doc
title: $deleteInvite
translation_key: docs
category: "Moderation"
function_name: deleteInvite
syntax: $deleteInvite[inviteCode;(reason)]
description: Revokes an invite.
---

# $deleteInvite

Revokes an invite. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$deleteInvite[inviteCode;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `inviteCode` | **Required.** The invite code, without the `discord.gg/` part. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Channels in the guild.

## Examples

```bdfd
$deleteInvite[abc123]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
