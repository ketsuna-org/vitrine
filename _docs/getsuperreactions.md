---
layout: doc
title: $getSuperReactions
translation_key: docs
category: "Moderation"
function_name: getSuperReactions
syntax: $getSuperReactions[channelID;messageID;separator;emoji]
description: Returns the users who super-reacted to a message with a given emoji, joined by the chosen separator.
---

# $getSuperReactions

Returns the users who super-reacted to a message with a given emoji, joined by the chosen separator. Super reactions are Discord's animated "burst" reactions. This function is a Bot Creator extension: it does not exist in the official BDFD wiki.

## Syntax

```
$getSuperReactions[channelID;messageID;separator;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | **Required.** The ID of the channel containing the message (digits only, otherwise `Invalid Discord ID.`). |
| `messageID` | **Required.** The ID of the message (digits only). |
| `separator` | **Required.** Text placed between two users. Kept literally, spaces included. |
| `emoji` | **Required.** A Unicode emoji, a custom emoji in `<:name:ID>` / `<a:name:ID>` form, a custom emoji ID, or a BDFD alias such as `:name:`. An empty or invalid emoji raises an error. |

All 4 arguments are required; fewer or more is refused ("Invalid argument count").

## Return Value

- **Type**: String
- The user tags (`username`, or `username#discriminator` for legacy accounts) joined by `separator`.
- Empty when nobody super-reacted with this emoji.

## Behavior

- Returns the users, not a count. Each user appears once.
- Normal reactions are not included: use `$getReactions` for those.

## Examples

```bdfd
$sendMessage[Super reactions: $getSuperReactions[$channelID;$messageID;, ;🔥]]
```
