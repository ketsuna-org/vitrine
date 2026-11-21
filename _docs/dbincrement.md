---
layout: doc
title: $dbIncrement
translation_key: docs
category: "Database"
function_name: dbIncrement
syntax: $dbIncrement[collection;id;path;amount;(min);(max)]
description: Adds to a number of a document atomically, with an optional minimum and maximum. Not in BDFD.
---

# $dbIncrement

`$dbIncrement` is **atomic**: a hundred people earning XP at the same moment never lose a point, and the guard cannot be raced. When the guard refuses, nothing changes and `$dbLastError` is `conflict`.

## Syntax

```
$dbIncrement[collection;id;path;amount;(min);(max)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `path` | Dotted path of the number. Missing counts as 0. |
| `amount` | The number to add; negative to subtract. Integers stay exact up to 9 007 199 254 740 991. |
| `min` | Optional. The result may not go below it. Use `0` for a balance. |
| `max` | Optional. The result may not go above it. |

## Return value

- The new value.
- Empty when refused or failed (see [`$dbLastError`](/docs/dblasterror/)).

## Examples

### Give XP

```bdfd
$dbIncrement[players;$authorID;xp;15]
```

### Spend coins, never below zero

```bdfd
$dbIncrement[wallet;$authorID;cash;-50;0]
```
