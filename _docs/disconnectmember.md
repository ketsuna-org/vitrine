---
layout: doc
title: $disconnectMember
translation_key: docs
category: "Moderation"
function_name: disconnectMember
syntax: $disconnectMember[userID]
description: Disconnects a member from their voice channel.
---

# $disconnectMember

Disconnects a member from their voice channel. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$disconnectMember[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |

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
