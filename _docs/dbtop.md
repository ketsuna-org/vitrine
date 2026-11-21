---
layout: doc
title: $dbTop
translation_key: docs
category: "Database"
function_name: dbTop
syntax: $dbTop[collection;field;count;(order)]
description: Returns the first documents of a collection ordered by a number: a leaderboard. Not in BDFD.
---

# $dbTop

`$dbTop` is the leaderboard query. On a large collection, index the field first.

## Syntax

```
$dbTop[collection;field;count;(order)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `field` | Numeric field to rank on. |
| `count` | How many documents (1 to 100). |
| `order` | Optional. `desc` (default, highest first) or `asc`. |

## Return value

- JSON: a list of `{"id":...,"data":{...},"rev":...}`.

## Examples

```bdfd
$dbTop[players;xp;10]
```
