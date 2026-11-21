---
layout: doc
title: $dbExists
translation_key: docs
category: "Database"
function_name: dbExists
syntax: $dbExists[collection;id]
description: Tells whether a document exists. Not in BDFD.
---

# $dbExists

`$dbExists` answers `true` or `false`. The data lives in the **server's space** (the user's own space in a direct message). [`$dbSpace`](/docs/dbspace/) switches the rest of the run to the user or the bot. A script can never read another server's or another user's data.

## Syntax

```
$dbExists[collection;id]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |

## Return value

- `true` or `false`.

## Examples

```bdfd
$if[$dbExists[players;$authorID]==false]
  Use /start first.
$endif
```
