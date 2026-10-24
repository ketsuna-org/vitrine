---
layout: doc
title: $userID
translation_key: docs
category: "Entity Info"
function_name: userID
syntax: $userID[(Username)]
description: Returns the Discord ID of the user of the execution context, or of the server member found by username.
---

# $userID

The `$userID` function returns the **Discord ID** of the user of the current execution (the user who ran the command or interaction).

## Syntax

```
$userID[(Username)]
```

## Parameters

| Parameter | Description |
|---|---|
| `Username` | Optional. A username, or `name#discriminator` (the discriminator is checked; `#0` or `#0000` for an account without one). The match is **case-insensitive** and searches the members of the current server. If omitted or empty (`$userID`, `$userID[]`), the user of the context is used. |

## Return Value

- **Type**: String (the Discord ID, digits only)
- Without a name: the value of the context variable `user.id`; if that variable is not set, the value of `author.id`; if neither is set, an empty string.
- With a name: the ID of the first member found, or an empty string if nobody matches (no error).

## Behavior

- Without a name, reads `user.id` first and falls back to `author.id`; it does not call Discord.
- With a name, lists the members of the server through Discord, which can be slow on large servers.

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

### Find a member by name

```bdfd
$sendMessage[ID: $userID[$message[1]]]
```

## Difference with $authorID

- `$userID` reads `user.id`, then `author.id`.
- `$authorID` reads `author.id`, then `user.id`.

Both return the same value whenever only one of the two variables is set or when both hold the same user.

## Notes

- Use `$userID` in comparisons with `$if[]` to create commands reserved for specific users.
