---
layout: doc
title: $changeUsername
translation_key: docs
category: "Moderation"
function_name: changeUsername
syntax: $changeUsername[newName]
description: Changes the username of the bot.
---

# $changeUsername

The `$changeUsername` function **modifies the global username** of the bot on Discord. Unlike `$setNickname`, which changes the nickname per server, `$changeUsername` changes the bot's name globally.

## Syntax

```
$changeUsername[newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `newName` | The new username for the bot. Required. |

## Return value

None. The bot's username is updated globally.

## Examples

### Simple change

```bdfd
$changeUsername[My Awesome Bot]
$sendMessage[✅ The bot is now named "My Awesome Bot".]
```

### Conditional change

```bdfd
$if[$isAdmin==true]
  $changeUsername[$message[1]]
  $sendMessage[Bot username updated.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Programmatic change

```bdfd
$changeUsername[Bot of $serverName]
$sendMessage[Bot name adapted to the server.]
```

## Notes

- **Discord rate limit**: Maximum of 2 username changes per hour.
- The global name is visible on all servers.
- To change the nickname on a specific server, use `$setNickname`.
- To change the name of another user, use `$changeUsernameWithID` (requires special permissions).
- The bot must have a token with the necessary permissions.
