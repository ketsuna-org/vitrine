---
layout: doc
title: $displayName
translation_key: docs
category: "Entity Info"
function_name: displayName
syntax: $displayName
description: Returns the display name of the user — the server nickname if it exists, otherwise the global username.
---

# $displayName

The variable `$displayName` returns the **display name** of the user on the server. This is the most relevant name in the server context: the nickname if defined, otherwise the global username.

## Syntax

```
$displayName
```

## Return value

- **Type**: String
- Priority: server nickname (`$nickname`) > global username (`$userName`)

## Behavior

- `$displayName` takes **no arguments**.
- If the user has a **nickname** on the server, `$displayName` returns it.
- Otherwise, it returns the **global username**.
- This is the name that other members see on the server.

## Examples

### Welcome message

```bdfd
$title[Welcome $displayName!]
$description[
We are thrilled to welcome you to **$serverName**!
]
$thumbnail[$userAvatar]
$color[#57F287]
$sendMessage[]
```

### User profile

```bdfd
$author[$displayName;$userAvatar]
$title[User Profile]
$description[
**Display Name:** $displayName
**Global Name:** $userName
**Server Nickname:** $nickname
**ID:** $userID
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- `$displayName` is the recommended choice to display a user's name in bot messages.
- It reflects what members actually see on the server.
- Differences: `$userName` (global username only), `$nickname` (server nickname only, can be empty), `$displayName` (the better of the two).
