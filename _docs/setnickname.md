---
layout: doc
title: $setNickname
translation_key: docs
category: "Moderation"
function_name: setNickname
syntax: $setNickname[nickname;(userID)]
description: Modifies the nickname of a user on the server.
---

# $setNickname

The function `$setNickname` **modifies the nickname** of a user on the Discord server. The nickname is specific to each server and does not affect the global username. The bot must have the `Manage Nicknames` permission.

## Syntax

```
$setNickname[nickname;(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `nickname` | The new nickname to apply. Required. Leave empty to reset the nickname. |
| `userID` | Optional. The ID of the target user. If omitted, the mentioned user is targeted. |

## Return Value

None. The nickname is modified.

## Examples

### Simple change

```bdfd
$setNickname[Gentil Member;$mentioned[1]]
$sendMessage[Nickname of <@$mentioned[1]> changed to "Gentil Member".]
```

### Resetting the nickname

```bdfd
$setNickname[;$mentioned[1]]
$sendMessage[Nickname of <@$mentioned[1]> reset.]
```

### Moderation command

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !nick <@mention> <new nickname>]
  $stop
$endif

$setNickname[$replaceText[$message;-;$mentioned[1];];$mentioned[1]]
$sendMessage[✅ Nickname modified.]
```

### Applying a nickname with a prefix

```bdfd
$setNickname[[Member] $username;$mentioned[1]]
$sendMessage[Formatted nickname applied.]
```

## Notes

- The bot must have the `Manage Nicknames` permission.
- The bot cannot modify the nickname of a user with a higher role than its own.
- To change the global username of the bot, use `$changeUsername`.
- Leaving `nickname` empty resets the nickname to the default username.
