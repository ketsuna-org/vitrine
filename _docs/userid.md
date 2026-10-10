---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID
description: Returns the Discord ID of the user of the execution context (the user.id variable, falling back to author.id).
---

# $userID

The `$userID` function returns the **Discord ID** of the user of the current execution (the user who ran the command or interaction).

## Syntax

```
$userID
```

## Return Value

- **Type**: String (the Discord ID, digits only)
- The value of the context variable `user.id`; if that variable is not set, the value of `author.id`; if neither is set, an empty string.

## Behavior

- `$userID` takes **no arguments**.
- Reads `user.id` first and falls back to `author.id`; it does not call Discord.

## Examples

### Display the user ID

```bdfd
$title[Your User ID]
$description[**ID:** `$userID`]
$color[#5865F2]
```

### Use the ID in a condition

```bdfd
$if[$userID==123456789012345678]
  $sendMessage[Hello administrator!]
$else
  $sendMessage[Hello user!]
$endif
```

## Difference with $authorID

- `$userID` reads `user.id`, then `author.id`.
- `$authorID` reads `author.id`, then `user.id`.

Both return the same value whenever only one of the two variables is set or when both hold the same user.

## Notes

- Use `$userID` in comparisons with `$if[]` to create commands reserved for specific users.
