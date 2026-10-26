---
layout: doc
title: $addSuperReaction
translation_key: docs
category: "Moderation"
function_name: addSuperReaction
syntax: $addSuperReaction[channelID;messageID;emoji]
description: Adds a super reaction from the bot to a specific message.
---

# $addSuperReaction

Adds a super reaction from the bot to a specific message. Super reactions are Discord's animated "burst" reactions. This function is a Bot Creator extension: it does not exist in the official BDFD wiki.

## Syntax

```
$addSuperReaction[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | **Required.** The ID of the channel containing the message (digits only, otherwise `Invalid Discord ID.`). |
| `messageID` | **Required.** The ID of the message (digits only). |
| `emoji` | **Required.** A Unicode emoji, a custom emoji in `<:name:ID>` / `<a:name:ID>` form, a custom emoji ID, or a BDFD alias such as `:name:`. An empty or invalid emoji raises an error. |

All 3 arguments are required; fewer or more is refused ("Invalid argument count").

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Read Message History and, when the bot has not already reacted, Add Reactions in the channel.
- Discord limits the number of distinct reactions per message; a refusal is raised as a runtime error you can catch with `$try`.

## Examples

```bdfd
$addSuperReaction[$channelID;$messageID;🔥]
```
