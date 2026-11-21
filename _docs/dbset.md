---
layout: doc
title: $dbSet
translation_key: docs
category: "Database"
function_name: dbSet
syntax: $dbSet[collection;id;json]
description: Writes a whole document, replacing the previous one. Not in BDFD.
---

# $dbSet

`$dbSet` replaces the document completely (or creates it). To change only some fields, use [`$dbUpdate`](/docs/dbupdate/); to change a number safely, use [`$dbIncrement`](/docs/dbincrement/). The data lives in the **server's space** (the user's own space in a direct message). [`$dbSpace`](/docs/dbspace/) switches the rest of the run to the user or the bot. A script can never read another server's or another user's data.

## Syntax

```
$dbSet[collection;id;json]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `json` | The document: a JSON object. Keys starting with `$` and `__proto__` are refused. Up to 16 KB (64 KB on a paid plan). |

## Return value

- The new revision number of the document. It starts at 1 and goes up at every write.
- Empty on a handled error (see [`$dbLastError`](/docs/dblasterror/)).

## Examples

```bdfd
$dbSet[players;$authorID;{"xp":0,"name":"$username"}]
```
