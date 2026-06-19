---
layout: doc
title: $nickname
translation_key: docs
category: "Entity Info"
function_name: nickname
syntax: $nickname
description: Returns the nickname of the user on the current server. Returns an empty string if no nickname is set.
---

# $nickname

The variable `$nickname` returns the **nickname** of the user on the current server. Unlike `$displayName`, it returns an empty string if the user does not have a custom nickname.

## Syntax

```
$nickname
```

## Return Value

- **Type** : String
- The server nickname if set, otherwise an **empty string**

## Behavior

- `$nickname` takes **no arguments**.
- Returns only the nickname **specific to the server**.
- If the user uses their global username (no nickname set), it returns `""` (an empty string).
- The maximum length of a nickname is 32 characters.

## Examples

### Detecting if a nickname is set

```bdfd
$if[$nickname!=]
  $sendMessage[Hello $nickname! (nickname: $nickname, username: $userName)]
$else
  $sendMessage[Hello $userName!]
$endif
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
$sendMessage[]
```

## Notes

- Do not confuse `$nickname` (server nickname only) with `$displayName` (nickname or global name).
- For displaying names in messages, `$displayName` is generally preferred because it will never be empty.
- Useful for commands where you want to explicitly check if the user has set a server nickname.
