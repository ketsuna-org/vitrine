---
layout: doc
title: $dbPull
translation_key: docs
category: "Database"
function_name: dbPull
syntax: $dbPull[collection;id;path;value]
description: Removes every occurrence of a value from a list in a document. Not in BDFD.
---

# $dbPull

`$dbPull` removes a value in a list of a document **atomically** (no lost update when several people write at once). The document and the list are created if needed.

## Syntax

```
$dbPull[collection;id;path;value]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `path` | Dotted path of the list. Missing counts as an empty list. |
| `value` | The value. Read as JSON when valid (`3`, `"text"`, `{"id":1}`), as text otherwise. |

## Return value

- The new revision.
- Empty on a handled error.

## Examples

```bdfd
$dbPull[players;$authorID;items;"sword"]
```
