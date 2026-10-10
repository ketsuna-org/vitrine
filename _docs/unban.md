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

| Parameter | Description |
|---|---|
This function takes no argument. It reads the text of the message that triggered the command (`message.content`) and looks for a banned user whose username equals it (case-insensitive). An error is raised if that text is empty. To unban by ID, use `$unBanID[]`.

## Return Value

- **Type**: String (empty)
- An empty string if the unban is successful.
- An error is raised if no banned user matches or if the bot lacks permissions.

## Behavior

- The bot must have the `BAN_MEMBERS` permission.
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

