---
layout: doc
title: $editEmoji
translation_key: docs
category: "Emojis"
function_name: editEmoji
syntax: $editEmoji[emojiID;name]
description: Renames a custom emoji of the server.
---

# $editEmoji

Renames a custom emoji of the server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$editEmoji[emojiID;name]
```

## Parameters

| Parameter | Description |
|---|---|
| `emojiID` | **Required.** The ID of the custom emoji. |
| `name` | **Required.** The new name (letters, digits and underscores). |

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
