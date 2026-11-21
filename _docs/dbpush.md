---
layout: doc
title: $dbPush
translation_key: docs
category: "Database"
function_name: dbPush
syntax: $dbPush[collection;id;path;value;(maxLength)]
description: Adds a value at the end of a list in a document, keeping only the latest ones. Not in BDFD.
---

# $dbPush

`$dbPush` adds a value in a list of a document **atomically** (no lost update when several people write at once). The document and the list are created if needed.

## Syntax

```
$dbPush[collection;id;path;value;(maxLength)]
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
$dbPush[players;$authorID;items;"sword";100]
```
