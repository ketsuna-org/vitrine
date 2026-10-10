---
layout: doc
title: $clear
translation_key: docs
category: "Moderation"
function_name: clear
syntax: $clear[(amount);(userID);(removePinned)]
description: Deletes a specified number of messages in the channel.
---

# $clear

The `$clear` function **deletes a specified number of messages** in the current channel. The bot must have the `Manage Messages` and `Read Message History` permissions.

## Syntax

```
$clear[(amount);(userID);(removePinned)]
```

## Parameters

| Parameter | Description |
|---|---|
| `amount` | Number of messages to delete (1-100). If written without brackets (`$clear`), the first argument of the command is used. An empty `$clear[]`, a non-number or a value outside 1-100 raises the error `$clear amount must be between 1 and 100.` |
| `userID` | Optional. Filter: only deletes messages from this user. Must be a positive ID when not empty, otherwise `Invalid user ID.` is raised. |
| `removePinned` | Optional. `"no"`, `"false"`, `"0"` or `"n"` to keep pinned messages. Any other value, including an empty one, deletes pinned messages too. Default behavior: pinned messages are deleted. |

## Return value

None (empty string). The messages are deleted.

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
$argsCheck[>=1;Usage: !clear <number>]

$if[$isAdmin[$authorID]==true]
  $clear[$message[1]]
  $sendMessage[🧹 $message[1] messages deleted.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Keeping pinned messages

```bdfd
$clear[10;;no]
$sendMessage[10 messages deleted (pinned messages kept).]
```

## Notes

- The bot must have the `Manage Messages` and `Read Message History` permissions in the server; otherwise an error is raised.
- Maximum 100 messages per call (values outside 1-100 are rejected).
- The most recent messages of the channel are examined (and filtered by `userID` / `removePinned`) until `amount` matching messages are found. The message that triggered the command is not excluded, so in a prefix command it counts as one of the messages.
- Messages younger than 14 days are bulk-deleted; older ones, and a single leftover message, are deleted one at a time. A message that cannot be deleted is skipped without an error.
- The channel must be a text channel, otherwise an error is raised.
- Pinned messages are deleted unless `removePinned` is `"no"`, `"false"`, `"0"` or `"n"`.
- To set `removePinned` without filtering by user, leave the `userID` field empty (e.g., `$clear[10;;no]`).
