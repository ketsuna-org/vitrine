---
layout: doc
title: $unBan
translation_key: docs
category: "Moderation"
function_name: unBan
syntax: $unBan
description: Unbans the banned user whose username matches the text of the message. The user will be able to rejoin the server with a new invite.
---

# $unBan

The function `$unBan` allows you to **unban a user** from the server, found by **username** in the server ban list. Once unbanned, the user will be able to rejoin the server with a new invite.

## Syntax

```
$unBan
```

## Parameters

This function takes no argument (a bracket form `$unBan[...]` is rejected). It reads the text of the message that triggered the command (`message.content`; for a prefix command, the arguments after the command name joined by spaces, i.e. what `$message` returns) and looks for a banned user whose username equals it (case-insensitive, full ban list searched). To unban by ID, use `$unBanID[]`.

## Return Value

- **Type**: String (empty)
- An empty string if the unban is successful.
- An error is raised if the text is empty (`A banned username is required.`), if no banned user matches (`Banned user not found`), or if the bot lacks the `Ban Members` permission.

## Behavior

- The bot must have the `Ban Members` permission.
- The user must be in the server's ban list.
- The ban list is searched by username; for an ID, use `$unBanID[]`.

## Examples

### Simple Unban

```bdfd
$unBan
$sendMessage[✅ **$message** was unbanned.]
```

### Unban with Confirmation

```bdfd
$unBan
$title[🔓 Unban]
$description[
**User:** $message
**Unbanned by:** $username
]
$color[#57F287]
$sendMessage[Unban done.]
```

### Command with a username

```bdfd
$if[$message==]
  $sendMessage[Please provide the username of a banned user.]
$else
  $unBan
  $sendMessage[✅ User **$message** unbanned.]
$endif
```

## Notes

- The unbanned user does not automatically rejoin the server; they must use an invite.
- Works only if the user is in the ban list.
- To unban by ID, use `$unBanID[]`.

