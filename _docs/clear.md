---
layout: doc
title: $clear
translation_key: docs
category: "Moderation"
function_name: clear
syntax: $clear[amount;(userID);(removePinned)]
description: Deletes a specified number of messages in the channel.
---

# $clear

The `$clear` function **deletes a specified number of messages** in the current channel. This function is dedicated to bulk-deleting messages (moderation), not to be confused with the variable function `$clear` of the same name. The bot must have the `ManageMessages` permission.

## Syntax

```
$clear[amount;(userID);(removePinned)]
```

## Parameters

| Parameter | Description |
|---|---|
| `amount` | Number of messages to delete (1-100). Required. |
| `userID` | Optional. Filter: only deletes messages from this user. |
| `removePinned` | Optional. `"yes"` to include pinned messages. Default is `"no"`. |

## Return value

None. The messages are deleted.

## Examples

### Simple deletion

```bdfd
$clear[50]
$sendMessage[🧹 50 messages have been cleared.]
```

### Targeted deletion by user

```bdfd
$clear[100;$mentioned[1]]
$sendMessage[🧹 Messages from <@$mentioned[1]> deleted.]
```

### Clear command with verification

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !clear <number>]
  $stop
$endif

$if[$isAdmin==true]
  $clear[$message[1]]
  $sendMessage[🧹 $message[1] messages deleted.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Deletion including pinned messages

```bdfd
$clear[10;;yes]
$sendMessage[10 messages deleted (pinned included).]
```

## Notes

- The bot must have the `ManageMessages` permission.
- Maximum 100 messages per call (Discord API limitation).
- Messages older than 14 days cannot be deleted by the Discord API.
- `removePinned` defaults to `"no"`: pinned messages are ignored.
- If `userID` is omitted, leave the semicolon field empty (e.g., `$clear[10;;yes]`).
- This `$clear` function is dedicated to moderation. To clear a variable, see `$clear` in the Variables category.
