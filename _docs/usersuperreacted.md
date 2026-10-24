---
layout: doc
title: $userSuperReacted
translation_key: docs
category: "Moderation"
function_name: userSuperReacted
syntax: $userSuperReacted[channelID;messageID;userID;emoji]
description: Checks if a specific user super-reacted with a given emoji on a message. Returns true or false.
---

# $userSuperReacted

Checks if a specific user super-reacted with a given emoji on a message. Returns true or false. Super reactions are Discord's animated "burst" reactions. This function is a Bot Creator extension: it does not exist in the official BDFD wiki.

## Syntax

```
$userSuperReacted[channelID;messageID;userID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | **Required.** The ID of the channel containing the message (digits only, otherwise `Invalid Discord ID.`). |
| `messageID` | **Required.** The ID of the message (digits only). |
| `userID` | **Required.** The ID of the user to check (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |
| `emoji` | **Required.** A Unicode emoji, a custom emoji in `<:name:ID>` / `<a:name:ID>` form, a custom emoji ID, or a BDFD alias such as `:name:`. An empty or invalid emoji raises an error. |

All 4 arguments are required; fewer or more is refused ("Invalid argument count").

## Return Value

- **Type**: String (boolean)
- `true` if the user is among the users who super-reacted with the emoji, `false` otherwise.

## Behavior

- Normal reactions are not counted: use `$userReacted` for those.

## Examples

```bdfd
$if[$userSuperReacted[$channelID;$messageID;$authorID;🔥]==true]
  $sendMessage[Thanks for the super reaction!]
$endif
```
