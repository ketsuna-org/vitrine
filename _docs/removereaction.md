---
layout: doc
title: $removeReaction
translation_key: docs
category: "Moderation"
function_name: removeReaction
syntax: $removeReaction[channelID;messageID;emoji]
description: Removes a specific reaction (emoji) from a given message. Useful for removing control reactions after an action.
---

# $removeReaction

The `$removeReaction[]` function allows **removing a specific reaction** from a message.

## Syntax

```
$removeReaction[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the target message. |
| `emoji` | The emoji to remove (Unicode or custom `<:name:ID>`). |

## Return Value

This function does not return a value.

## Behavior

- Removes ONLY the bot's reaction.
- To remove other users' reactions, the `MANAGE_MESSAGES` permission is required.
- If the emoji is not present as a reaction, nothing happens.

## Examples

### Progress indicator

```bdfd
$addCmdReactions[⏳]
$wait[3]
$removeReaction[$channelID;$messageID;⏳]
$addCmdReactions[✅]
```

### Selective cleanup

```bdfd
$removeReaction[$channelID;$messageID;❌]
$addMessageReactions[$channelID;$messageID;✅]
$editMessage[Action confirmed.]
```

### Confirmation system

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $removeReaction[$channelID;$messageID;⏳]
  $addMessageReactions[$channelID;$messageID;✅]
$else
  $removeReaction[$channelID;$messageID;⏳]
  $addMessageReactions[$channelID;$messageID;❌]
$endif
```

## Notes

- To remove all reactions at once, use `$clearReactions[]`.
- The emoji must be exactly the same as the one used for the reaction.
- Custom emojis must be in the format `<:name:ID>`.
