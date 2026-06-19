---
layout: doc
title: $kick
translation_key: docs
category: "Moderation"
function_name: kick
syntax: $kick[userID;(reason)]
description: Kicks a user from the Discord server.
---

# $kick

The function `$kick` **kicks a user** from the Discord server. Unlike a ban, the user can rejoin with a new invite. The bot must have the `Kick Members` permission.

## Syntax

```
$kick[userID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to kick. Required. |
| `reason` | Optional. The reason for the kick. |

## Return Value

None. The user is kicked from the server.

## Examples

### Simple kick

```bdfd
$kick[$mentioned[1];Rules violation]
$sendMessage[<@$mentioned[1]> has been kicked.]
```

### Kick command with confirmation

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !kick <@mention> <reason>]
  $stop
$endif

$kick[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[✅ Kick completed successfully.]
```

### Check before kick

```bdfd
$if[$isAdmin==true]
  $kick[$mentioned[1];Abuse]
  $sendMessage[Member kicked.]
$else
  $sendMessage[Permission denied. Admin required.]
$endif
```

## Notes

- The bot must have the `Kick Members` permission.
- The kicked user can be re-invited.
- Use `$ban` for a permanent ban.
- To kick the mentioned user without specifying the ID, use `$kickMention`.
