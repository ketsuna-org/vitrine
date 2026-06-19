---
layout: doc
title: $ban
translation_key: docs
category: "Moderation"
function_name: ban
syntax: $ban[userID;(reason);(deleteMessagesDays)]
description: Bans a user from the Discord server.
---

# $ban

The `$ban` function **bans a user** of the Discord server. The bot must have the permission `BanMembers`.

## Syntax

```
$ban[userID;(reason);(deleteMessagesDays)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the user to ban. Required. |
| `reason` | Optional. The ban reason. |
| `deleteMessagesDays` | Optional. Number of days (0-7) of messages to delete. Default `0`. |

## Return value

None. The function bans the user and deletes their messages if requested.

## Examples

### Simple ban with mention

```bdfd
$ban[$mentioned[1];Spam]
$sendMessage[<@$mentioned[1]> has been banni pour spam.]
```

### Ban with message deletion

```bdfd
$ban[$findUser[JeanDupont];Harcèlement;7]
$sendMessage[JeanDupont banni — 7 days of messages deleteds.]
```

### Ban command with confirmation

```bdfd
$if[$argsCount<1]
  $sendMessage[Usage: !ban <@mention> <reason>]
  $stop
$endif

$ban[$mentioned[1];$replaceText[$message;-;$mentioned[1];]]
$sendMessage[✅ <@$mentioned[1]> banni.]
```

## Notes

- The bot must have the permission `BanMembers`.
- `deleteMessagesDays` accepte a value between `0` and `7`.
- The bot cannot bannir a user ayant a role supérieur its own.
- To ban by ID without mention, use `$banID`.
