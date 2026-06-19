---
layout: doc
title: $unmute
translation_key: docs
category: "Moderation"
function_name: unmute
syntax: $unmute[userID]
description: Removes the mute of a user.
---

# $unmute

The function `$unmute` **removes the mute** of a user on the Discord server, allowing them to speak again in voice channels. The bot must have the `MuteMembers` permission.

## Syntax

```
$unmute[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to unmute. Required. |

## Return Value

None. The user can speak again in voice.

## Examples

### Simple unmute

```bdfd
$unmute[$mentioned[1]]
$sendMessage[🔊 <@$mentioned[1]> can speak again!]
```

### Conditional unmute

```bdfd
$if[$isAdmin==true]
  $unmute[$mentioned[1]]
  $sendMessage[Member re-enabled in voice.]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- The bot must have the `MuteMembers` permission.
- Only has effect if the user is currently muted.
- To remove a timeout (temporary text and voice silence), use `$unTimeout`.
