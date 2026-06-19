---
layout: doc
title: $memberID
translation_key: docs
category: "Entity Info"
function_name: memberID
syntax: $memberID
description: Returns the Discord ID of the member. Equivalent to $userID in most contexts, but explicitly oriented as "member of the server".
---

# $memberID

The function `$memberID` returns the **Discord ID** of the member who triggered the command. It is functionally equivalent to `$userID` but explicitly tied to the concept of a "member of the server".

## Syntax

```
$memberID
```

## Return Value

- **Type** : Snowflake (numeric string of 17-19 digits)
- The unique ID of the member on Discord

## Behavior

- `$memberID` takes **no arguments**.
- In most cases, `$memberID` and `$userID` return the same value.
- The distinction is conceptual: `$memberID` refers to the **member of the server**, whereas `$userID` refers to the **Discord user**.

## Examples

### Member profile

```bdfd
$title[Member: $memberNick]
$description[
**Member ID:** $memberID
**Permissions:** $memberPerms
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- In BDFD, `$memberID` and `$userID` are interchangeable for the triggering user.
- `$memberID` is useful for semantic clarity in the code (when working explicitly with members).
- For uniqueness and permanence, the member ID is identical to the user ID.

