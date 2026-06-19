---
layout: doc
title: $unTimeout
translation_key: docs
category: "Moderation"
function_name: unTimeout
syntax: $unTimeout[userID]
description: Removes the timeout of a user before its expiration.
---

# $unTimeout

The function `$unTimeout` **removes the timeout** of a user before its expiration, restoring their ability to send messages and speak in voice. The bot must have the `ModerateMembers` permission.

## Syntax

```
$unTimeout[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to free from timeout. Required. |

## Return Value

None. The user is freed from timeout.

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

- The bot must have the `ModerateMembers` permission.
- Use `$isTimedOut` to check if a user is in timeout before calling `$unTimeout`.
- Only has effect if the user is currently in timeout.
