---
layout: doc
title: $dbUpdate
translation_key: docs
category: "Database"
function_name: dbUpdate
syntax: $dbUpdate[collection;id;path;value]
description: Changes one value inside a document without touching the rest. Not in BDFD.
---

# $dbUpdate

`$dbUpdate` is a merge of one path: the rest of the document is left as it is, and the document is created if it does not exist. For counters, use [`$dbIncrement`](/docs/dbincrement/) instead (a read then a write can lose updates).

## Syntax

```
$dbUpdate[collection;id;path;value]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `path` | Dotted path to set, such as `stats.wins`. The objects on the way are created. |
| `value` | The new value. Read as JSON when it is valid JSON (`5`, `true`, `"007"`, `{"a":1}`, `[1,2]`), as text otherwise. A whole number of 16 digits or more (a Discord ID) stays text. Write `null` to delete the key. |

## Return value

- The new revision.
- Empty on a handled error.

## Examples

```bdfd
$dbUpdate[players;$authorID;title;"Champion"]
$dbUpdate[players;$authorID;stats.wins;12]
```
