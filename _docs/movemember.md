---
layout: doc
title: $moveMember
translation_key: docs
category: "Moderation"
function_name: moveMember
syntax: $moveMember[userID;channelID]
description: Moves a member who is in a voice channel to another voice channel.
---

# $moveMember

Moves a member who is in a voice channel to another voice channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$moveMember[userID;channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `channelID` | **Required.** The destination voice channel ID. |

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
