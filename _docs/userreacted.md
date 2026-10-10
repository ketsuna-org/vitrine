---
layout: doc
title: $userReacted
translation_key: docs
category: "Entity Info"
function_name: userReacted
syntax: $userReacted[channelID;messageID;userID;emoji]
description: Checks if a specific user reacted with a given emoji on a message. Returns true or false.
---

# $userReacted

The `$userReacted` function checks if a user has reacted with a specific emoji on a given message.

## Syntax

```
$userReacted[channelID;messageID;userID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | **Required.** The ID of the channel containing the message. |
| `messageID` | **Required.** The ID of the message on which to check the reaction. |
| `userID` | **Required.** The ID of the user to check (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |
| `emoji` | **Required.** The emoji to check: a Unicode emoji, a custom emoji in `<:name:ID>` / `<a:name:ID>` form, a custom emoji ID, or a BDFD alias such as `:name:`. An empty or invalid emoji raises an error. |

All four arguments are required; fewer or more is refused ("Invalid argument count").

## Return Value

- **Type**: String (boolean)
- `true` if the user is among the users who reacted with the specified emoji.
- `false` otherwise.

## Behavior

- Retrieves the list of users who reacted with the given emoji on the message and looks for `userID` in it.
- The channel and message IDs must be valid IDs.
- The message must be accessible to the bot.

## Examples

### Check a reaction on the current message

```bdfd
$if[$userReacted[$channelID;$messageID;$authorID;✅]==true]
  $sendMessage[You reacted with ✅.]
$else
  $sendMessage[You have not reacted with ✅.]
$endif
```

### Condition for a giveaway

```bdfd
$if[$userReacted[$channelID;$messageID;$authorID;🎉]==true]
  $sendMessage[✅ You are participating in the giveaway!]
$else
  $sendMessage[❌ You must react with 🎉 to participate.]
$endif
```

## Notes

- For custom emojis, use the `<:name:ID>` (or `<a:name:ID>`) format, or the emoji ID.
