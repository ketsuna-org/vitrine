---
layout: doc
title: $memberID
translation_key: docs
category: "Entity Info"
function_name: memberID
syntax: $memberID
description: Returns the Discord ID of the member who triggered the command (member.id, else the author ID).
---

# $memberID

The function `$memberID` returns the **Discord ID** of the member who triggered the command.

## Syntax

```
$memberID
```

## Return Value

- **Type** : Snowflake (numeric string)
- The value of the `member.id` context variable if the host supplied it, otherwise the ID of the command author (`author.id`, then `user.id`).
- If none of these is available, or the author ID is not a positive integer, the error `Invalid user ID.` is raised.

## Behavior

- `$memberID` takes **no arguments**.
- `$userID` reads `user.id` first, then `author.id`; `$memberID` reads `member.id` first, then `author.id`, then `user.id`. For the triggering user they give the same result.

## Examples

### Member profile

```bdfd
$title[Member: $memberNick]
$description[
**Member ID:** $memberID
**Permissions:** $memberPerms
]
$color[#5865F2]
```

## Notes

- For the triggering user, `$memberID`, `$userID` and `$authorID` give the same ID.

