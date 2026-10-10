---
layout: doc
title: $nickname
translation_key: docs
category: "Entity Info"
function_name: nickname
syntax: $nickname[(userID)]
description: Returns the server nickname of a user, or their display name (global name, else username) if they have no nickname.
---

# $nickname

The function `$nickname` returns the **nickname** of a user on the current server. If the user has no nickname it does **not** return an empty string: it returns the user's display name (global name, or the username if there is none).

## Syntax

```
$nickname[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | *(Optional)* The ID of the user. Default: the author of the command. A value that is not a positive integer raises `Invalid user ID.` |

## Return Value

- **Type** : String
- The server nickname if set, otherwise the display name (global name, else username) fetched from Discord.
- The error `User is not a member of this guild.` is raised if the user is not a member of the current server, and `User not found.` if Discord does not know the user.

## Behavior

- The member is always fetched from Discord; the function does not read a context variable (unlike `$memberNick`).
- Because of the fallback, `$nickname` cannot be used to detect whether a nickname is set.

## Examples

### Greeting with the nickname

```bdfd
$sendMessage[Hello $nickname! (username: $userName)]
```

### Displaying name details

```bdfd
$title[Names of $userName]
$description[
**Global Username:** $userName
**Server Nickname:** $nickname
**Display Name:** $displayName
]
$color[#5865F2]
```

## Notes

- `$displayName` returns the global name (or the username) of a user and works for users who are not members of the server.
- `$memberNick` is a different function: without argument it reads host-supplied context variables first (see its page).
