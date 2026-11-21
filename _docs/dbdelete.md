---
layout: doc
title: $dbDelete
translation_key: docs
category: "Database"
function_name: dbDelete
syntax: $dbDelete[collection;id]
description: Deletes a document. Not in BDFD.
---

# $dbDelete

`$dbDelete` removes the document. Deleting a document that does not exist is not an error.

## Syntax

```
$dbDelete[collection;id]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |

## Return value

- `true` when a document was deleted, `false` otherwise.

## Examples

```bdfd
$dbDelete[players;$authorID]
Your data was deleted.
```
