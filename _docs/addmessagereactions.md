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
| `channelID` | Required. The ID of the channel containing the target message (digits only, otherwise the error "Invalid Discord ID."). |
| `messageID` | Required. The ID of the message to add the reactions to (digits only). |
| `emoji1;emoji2;...` | Required, at least one. Emojis to add, separated by `;`. A Unicode emoji, a custom emoji `<:name:ID>` / `<a:name:ID>`, a numeric emoji ID, or a BDFD alias such as `:name:`. An empty argument or plain ASCII text is an error. |

## Return value

Returns an empty string.

## Behavior

- Allows reacting to old messages or messages in other channels.
- The bot needs the Read Message History permission in the channel, and Add Reactions when at least one emoji is not already on the message (otherwise "Missing channel permissions for reactions."). An emoji already present on the message is not added again.
- All emojis are validated first, then added one by one in the given order.
- The message must exist and not have been deleted.

## Examples

### Reacting to a rules message

```bdfd
$addMessageReactions[$rulesChannelID;123456789012345678;✅]
```

### Reaction to a stored message

```bdfd
$var[msgID;$getUserVar[lastMessageID]]
$var[chanID;$getUserVar[lastChannelID]]
$addMessageReactions[$var[chanID];$var[msgID];👍;👎]
```

### Reacting to a giveaway message

```bdfd
$addMessageReactions[123456789012345678;123456789;🎉]
$sendMessage[React with 🎉 to participate!]
```

## Notes

- `$addMessageReactions[]` is the most flexible function for reactions because it can target any message.
- For the bot's own response message, prefer `$addReactions[]`.
- For the trigger message, use `$addCmdReactions[]`.

