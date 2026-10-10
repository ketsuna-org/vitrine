---
layout: doc
title: $displayName
translation_key: docs
category: "Entity Info"
function_name: displayName
syntax: $displayName[(userID)]
description: Returns the global display name of a user (the author by default), or the username if the user has none. It is not the server nickname.
---

# $displayName

The function `$displayName` returns the **global display name** of a user (the "display name" the user set on their Discord account), or the username if there is none. It does **not** use the server nickname; for that, see `$nickname`.

## Syntax

```
$displayName[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the user. If omitted, the author of the command is used. An ID that is not a positive number raises `Invalid user ID.`; an unknown user raises `User not found.` |

## Return value

- **Type**: String
- Priority: global display name of the account (`globalName`) > username (`$userName`)

## Behavior

- The user is read from Discord (a user account, not the member of the server), so the server nickname is never used.
- If the account has a global display name, `$displayName` returns it; otherwise it returns the username.
- `$nickname` returns the server nickname of the member, falling back to this same display name when there is no nickname.

## Examples

### Welcome message

```bdfd
$title[Welcome $displayName!]
$description[
We are thrilled to welcome you to **$serverName**!
]
$thumbnail[$userAvatar[$authorID]]
$color[#57F287]
```

### User profile

```bdfd
$author[$displayName;$userAvatar[$authorID]]
$title[User Profile]
$description[
**Display Name:** $displayName
**Username:** $userName
**Server Nickname:** $nickname
**ID:** $userID
]
$color[#5865F2]
```

## Notes

- Differences: `$userName` (username of the account), `$nickname[(userID)]` (server nickname, or the display name when the member has none; the user must be a member of the server), `$displayName[(userID)]` (global display name or username, never the server nickname).
