---
layout: doc
title: $endPoll
translation_key: docs
category: "Polls"
function_name: endPoll
syntax: $endPoll[channelID;messageID]
description: Ends a poll right now.
---

# $endPoll

Ends a poll right now. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$endPoll[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Channel ID (digits only). Optional: empty means the current channel. |
| `messageID` | **Required.** The ID of the message holding the poll. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Messages in the guild.
- Discord only accepts this for polls that are still running.

## Examples

```bdfd
$endPoll[$channelID;$message[1]]
```
