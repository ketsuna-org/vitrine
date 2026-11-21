---
layout: doc
title: $dbCooldown
translation_key: docs
category: "Database"
function_name: dbCooldown
syntax: $dbCooldown[collection;id;seconds]
description: Starts a cooldown or says how many seconds are left. Not in BDFD.
---

# $dbCooldown

`$dbCooldown` stores a document that **expires**. The first call starts the cooldown and returns `0`; while it runs, each call returns the seconds left and does not extend it.

## Syntax

```
$dbCooldown[collection;id;seconds]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | What is on cooldown, often a user ID. |
| `seconds` | Length of the cooldown, 1 or more. |

## Return value

- `0` when the cooldown just started (the action is allowed).
- The number of seconds left otherwise.

## Examples

```bdfd
$if[$dbCooldown[daily;$authorID;86400]>0]
  Come back in $dbCooldown[daily;$authorID;86400] seconds.
$stop
$endif
Here is your daily reward!
```
