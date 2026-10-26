---
layout: doc
title: $serverDeafen
translation_key: docs
category: "Moderation"
function_name: serverDeafen
syntax: $serverDeafen[userID;deaf]
description: Server-deafens or undeafens a member in voice.
---

# $serverDeafen

Server-deafens or undeafens a member in voice. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$serverDeafen[userID;deaf]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `deaf` | `true` (default) to deafen, `false` to undeafen. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Deafen Members in the guild.

## Examples

```bdfd
$serverDeafen[$mentioned[1];false]
```
