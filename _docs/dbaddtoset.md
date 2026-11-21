---
layout: doc
title: $dbAddToSet
translation_key: docs
category: "Database"
function_name: dbAddToSet
syntax: $dbAddToSet[collection;id;path;value;(maxLength)]
description: Adds a value to a list only if it is not already there. Not in BDFD.
---

# $dbAddToSet

`$dbAddToSet` adds a value in a list of a document **atomically** (no lost update when several people write at once). The document and the list are created if needed.

## Syntax

```
$dbAddToSet[collection;id;path;value;(maxLength)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `path` | Dotted path of the list. Missing counts as an empty list. |
| `value` | The value. Read as JSON when valid (`3`, `"text"`, `{"id":1}`), as text otherwise. |
| `maxLength` | Optional. Keep only the latest `maxLength` items (the oldest are dropped). |

## Return value

- The new revision.
- Empty on a handled error.

## Examples

```bdfd
$dbAddToSet[players;$authorID;items;"sword";100]
```
