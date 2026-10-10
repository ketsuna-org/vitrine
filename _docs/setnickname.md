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
| `nickname` | The new nickname to apply. Required; at most 32 characters (a longer value raises an error). An empty value is sent as an empty nickname (the Discord nickname is cleared). |
| `userID` | Optional. The ID of the target user. If omitted, the command author is targeted (not a mentioned user). An empty or non-numeric ID raises `Missing or invalid user ID.` |

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
$onlyIf[$mentioned[1]!=;Usage: !nick @member new nickname]
$setNickname[$message[>1];$mentioned[1]]
$sendMessage[✅ Nickname modified.]
```

### Applying a nickname with a prefix

```bdfd
$setNickname[[Member] $username;$mentioned[1]]
$sendMessage[Formatted nickname applied.]
```

## Notes

- The bot must have the `Manage Nicknames` permission.
- The nickname is rejected by the engine if it exceeds 32 characters.
- The bot needs `Manage Nicknames`; if Discord refuses the change (for example a target above the bot's highest role), an error is raised.
- To change the global username of the bot, use `$changeUsername`.
- An empty `nickname` clears the member's nickname.
