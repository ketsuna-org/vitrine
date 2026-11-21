---
layout: doc
title: $dbRank
translation_key: docs
category: "Database"
function_name: dbRank
syntax: $dbRank[collection;field;id;(order)]
description: Gives the rank of a document in a collection for a number. Not in BDFD.
---

# $dbRank

`$dbRank` is 1 for the first. Documents with the same value share a rank.

## Syntax

```
$dbRank[collection;field;id;(order)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `field` | Numeric field to rank on. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `order` | Optional. `desc` (default) or `asc`. |

## Return value

- The rank, or `0` when the document or its field does not exist.

## Examples

```bdfd
You are number $dbRank[players;xp;$authorID].
```
