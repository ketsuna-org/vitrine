---
layout: doc
title: $editEmoji
translation_key: docs
category: "Emojis"
function_name: editEmoji
syntax: $editEmoji[emojiID;name;(reason)]
description: Renames a custom emoji of the server.
---

# $editEmoji

Renames a custom emoji of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$editEmoji[emojiID;name;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | **Required.** The ID of the custom emoji. |
| `name` | **Required.** The new name (letters, digits and underscores). |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Expressions in the guild.
- Runs in a guild only.

## Examples

```bdfd
$editEmoji[123456789012345678;party]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
