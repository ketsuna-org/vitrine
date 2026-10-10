---
layout: doc
title: $removeReaction
translation_key: docs
category: "Moderation"
function_name: removeReaction
syntax: $removeReaction[channelID;messageID;userID;emoji]
description: Removes all reactions of a given emoji from a given message. Useful for removing control reactions after an action.
---

# $removeReaction

The `$removeReaction[]` function allows **removing all reactions of a specific emoji** from a message.

## Syntax

```
$removeReaction[channelID;messageID;userID;emoji]
```

The function requires exactly 4 arguments.

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the target message. |
| `userID` | Required argument, but its value is not read by the engine (it does not restrict the removal to this user). |
| `emoji` | The emoji to remove (Unicode, custom `<:name:ID>` or a numeric custom emoji ID). |

## Return Value

This function does not return a value.

## Behavior

- Removes every reaction using this emoji from the message (all users, not only the bot's).
- The bot needs the `MANAGE_MESSAGES` permission in the channel.
- An empty emoji raises the error "An emoji is required.".

## Examples

### Progress indicator

```bdfd
$addCmdReactions[⏳]
$wait[3]
$removeReaction[$channelID;$messageID;$authorID;⏳]
$addCmdReactions[✅]
```

### Selective cleanup

```bdfd
$removeReaction[$channelID;$messageID;$authorID;❌]
$addMessageReactions[$channelID;$messageID;✅]
```

## Notes

- To remove all reactions at once, use `$clearReactions[channelID;messageID;!all]`.
- The emoji must be exactly the same as the one used for the reaction.
- Custom emojis must be in the format `<:name:ID>`.
