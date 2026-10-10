---
layout: doc
title: $unTimeout
translation_key: docs
category: "Moderation"
function_name: unTimeout
syntax: $unTimeout[(userID)]
description: Removes the timeout of a user before its expiration.
---

# $unTimeout

The function `$unTimeout` **removes the timeout** of a user before its expiration, restoring their ability to send messages and speak in voice. The bot must have the `ModerateMembers` permission.

## Syntax

```
$unTimeout[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the user to free from timeout (must be a positive number, otherwise the error `Missing or invalid user ID.` is raised). If omitted or empty, every user mentioned in the message is used (each distinct mention is processed); if there is no mention either, the error `A user ID or user mention is required.` is raised. |

## Return Value

None (empty string). An error is raised if the user ID is invalid, or if the bot cannot remove the timeout: the bot needs the `ModerateMembers` permission, and the operation is refused when the target is the server owner, an administrator, or has a highest role equal to or above the bot's.

## Examples

### Simple removal

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[✅ <@$mentioned[1]> is no longer in timeout.]
```

### Conditional removal

```bdfd
$if[$isTimedOut[$mentioned[1]]==true]
  $unTimeout[$mentioned[1]]
  $sendMessage[Timeout removed.]
$else
  $sendMessage[This user is not in timeout.]
$endif
```

### Pardon command

```bdfd
$unTimeout[$mentioned[1]]
$sendMessage[🙏 Pardon granted. <@$mentioned[1]> can participate again.]
```

## Notes

- The bot must have the `ModerateMembers` permission (or Administrator). The server owner, administrators and members whose highest role is equal to or above the bot's highest role cannot be targeted.
- Use `$isTimedOut` to check if a user is in timeout before calling `$unTimeout`.
