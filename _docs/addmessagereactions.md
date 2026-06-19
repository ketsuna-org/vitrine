---
layout: doc
title: $addMessageReactions
translation_key: docs
category: "Moderation"
function_name: addMessageReactions
syntax: $addMessageReactions[channelID;messageID;emoji1;...]
description: Adds one or more reactions to a specific message identified by its channel and message IDs.
---

# $addMessageReactions

The `$addMessageReactions[]` function **adds reactions to any message** on the server, identified by its channel and message ID.

## Syntax

```
$addMessageReactions[channelID;messageID;emoji1;emoji2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the target message. |
| `messageID` | The ID of the message to add the reactions to. |
| `emoji1;emoji2;...` | List of emojis to add, separated by `;`. |

## Return value

This function does not return a value.

## Behavior

- Allows reacting to old messages or messages in other channels.
- The bot must have access to the channel and the `ADD_REACTIONS` permission.
- The message must exist and not have been deleted.

## Examples

### Reacting to a rules message

```bdfd
$addMessageReactions[$rulesChannelID;123456789012345678;✅]
```

### Reaction to a stored message

```bdfd
$let[msgID;$getUserVar[lastMessageID]]
$let[chanID;$getUserVar[lastChannelID]]
$addMessageReactions[$chanID;$msgID;👍;👎]
```

### Reacting to a giveaway message

```bdfd
$addMessageReactions[$giveawayChannel;123456789;🎉]
$sendMessage[React with 🎉 to participate!]
```

## Notes

- `$addMessageReactions[]` is the most flexible function for reactions because it can target any message.
- For the bot's own response message, prefer `$addReactions[]`.
- For the trigger message, use `$addCmdReactions[]`.

