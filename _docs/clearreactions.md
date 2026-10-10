---
layout: doc
title: $clearReactions
translation_key: docs
category: "Moderation"
function_name: clearReactions
syntax: $clearReactions[channelID;messageID;emoji]
description: Removes all reactions, or all reactions of one emoji, from a specific message.
---

# $clearReactions

The `$clearReactions[]` function **removes the reactions** of a message: all of them with `!all`, or only those of one emoji.

## Syntax

```
$clearReactions[channelID;messageID;emoji]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the channel containing the message. |
| `messageID` | Required. The ID of the message. |
| `emoji` | Required. `!all` to remove every reaction, or the emoji whose reactions must be removed (Unicode emoji, `<:name:ID>` custom emoji, emoji ID, or a `:alias:`). An empty emoji is an error. |

## Return value

This function does not return a value (empty string).

## Behavior

- With `!all`, removes ALL reactions from the message.
- With an emoji, removes all reactions of that emoji from the message.
- Both IDs must be positive numeric IDs.
- Useful for resetting a reaction system (poll, giveaway, etc.).

## Examples

### Resetting a poll

```bdfd
$clearReactions[$channelID;$messageID;!all]
$addMessageReactions[$channelID;$messageID;👍;👎;🤷]
$sendMessage[The votes have been reset.]
```

### Automatic cleanup

```bdfd
$clearReactions[$channelID;$messageID;!all]
$addReactions[✅]
$editMessage[$channelID;$messageID;Finished!]
```

### Removal after closing

```bdfd
$clearReactions[$channelID;$messageID;!all]
$sendMessage[This poll is now closed.]
```

## Notes

- `$clearReactions[channelID;messageID;!all]` removes all reactions, not just the bot's.
- To remove one emoji, pass it as the third argument.
