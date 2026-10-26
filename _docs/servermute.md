---
layout: doc
title: $serverMute
translation_key: docs
category: "Moderation"
function_name: serverMute
syntax: $serverMute[userID;mute]
description: Server-mutes or unmutes a member in voice.
---

# $serverMute

Server-mutes or unmutes a member in voice. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$serverMute[userID;mute]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The member's ID (digits only). |
| `mute` | `true` (default) to mute, `false` to unmute. |

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
