---
layout: doc
title: $dbCreate
translation_key: docs
category: "Database"
function_name: dbCreate
syntax: $dbCreate[collection;id;json]
description: Creates a document only if it does not exist yet. Not in BDFD.
---

# $dbCreate

`$dbCreate` is `$dbSet` that refuses to overwrite: when the document already exists, nothing changes and `$dbLastError` is `conflict`. It is atomic, so two people cannot both create the same document.

## Syntax

```
$dbCreate[collection;id;json]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `json` | The document: a JSON object. |

## Return value

- The revision (1) when created.
- Empty when it already existed (`$dbLastError` is `conflict`).

## Examples

### Register once

```bdfd
$dbCreate[players;$authorID;{"xp":0}]
$if[$dbLastError==conflict]
  You are already registered.
$endif
```
