---
layout: doc
title: $memberNick
translation_key: docs
category: "Entity Info"
function_name: memberNick
syntax: $memberNick[(userID)]
description: Returns the nickname of a member on the server, falling back to a display name or username when no nickname is available.
---

# $memberNick

The function `$memberNick` returns the **nickname** of a member on the current server, with fallbacks when the member has no nickname.

## Syntax

```
$memberNick[(userID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | *(Optional)* The ID of the member. If omitted or empty, the author of the command is used. A value that is not a positive integer raises `Invalid user ID.` |

## Return Value

- **Type** : String of characters
- Without argument, the first value that exists among the context variables `member.nick`, `member.displayName`, `author.displayName`, `author.username` is returned (the host supplies them).
- Otherwise (or with an argument) the member is fetched from Discord: the server nickname if set, otherwise the **username**. The result is therefore not an empty string when the member exists.
- `User is not a member of this guild.` is raised if the user is not a member of the server.

## Behavior

- `$memberNick` and `$nickname` are different functions: `$nickname` always fetches the member and falls back to the user's display name (global name, else username), and it raises an error when the user is not a member.

## Examples

### Message with nickname

```bdfd
$sendMessage[Hello $memberNick!]
```

### Member embed

```bdfd
$title[Member Information]
$author[$memberNick;$authorAvatar]
$description[
**ID:** $memberID
**Permissions:** $memberPerms
]
$color[#5865F2]
```

## Notes

- `$displayName` returns the global display name of a user, or the username if there is none.

