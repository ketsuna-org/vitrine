---
layout: doc
title: $clearReactions
translation_key: docs
category: "Moderation"
function_name: clearReactions
syntax: $clearReactions[messageID]
description: Removes all reactions from a specific message. Usually requires appropriate permissions to clear reactions from other users.
---

# $clearReactions

The `$clearReactions[]` function **removes all reactions** from a message in a single operation.

## Syntax

```
$clearReactions[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message from which you want to remove all reactions. |

## Return value

This function does not return a value.

## Behavior

- Removes ALL reactions from the message, including those of other users if the bot has the `MANAGE_MESSAGES` permission.
- If the bot does not have `MANAGE_MESSAGES`, only the bot's own reactions can be deleted.
- Useful for resetting a reaction system (poll, giveaway, etc.).

## Examples

### Resetting a poll

```bdfd
$clearReactions[$messageID]
$addMessageReactions[$channelID;$messageID;👍;👎;🤷]
$sendMessage[The votes have been reset.]
```

### Automatic cleanup

```bdfd
$clearReactions[$messageID]
$addReactions[✅]
$editMessage[Finished!]
```

### Removal after closing

```bdfd
$clearReactions[$messageID]
$sendMessage[This poll is now closed.]
```

## Notes

- `$clearReactions[]` removes all reactions, not just the bot's.
- Requires the `MANAGE_MESSAGES` permission to delete other users' reactions.
- To delete a specific reaction, use `$removeReaction[]`.
