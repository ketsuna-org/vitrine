---
layout: doc
title: $removeSuperReaction
translation_key: docs
category: "Moderation"
function_name: removeSuperReaction
syntax: $removeSuperReaction[channelID;messageID;emoji]
description: Removes the bot's own super reaction from a message.
---

# $removeSuperReaction

Removes the bot's own super reaction from a message. Super reactions are Discord's animated "burst" reactions. This function is a Bot Creator extension: it does not exist in the official BDFD wiki.

## Syntax

```
$removeSuperReaction[channelID;messageID;emoji]
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

- Only the bot's own super reaction is removed, other users' are untouched.
- The bot needs Read Message History in the channel.

## Examples

```bdfd
$removeSuperReaction[$channelID;$messageID;🔥]
```
