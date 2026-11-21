---
layout: doc
title: $dbGet
translation_key: docs
category: "Database"
function_name: dbGet
syntax: $dbGet[collection;id;(path);(default)]
description: Reads a document or one value of it from a collection. Not in BDFD.
---

# $dbGet

`$dbGet` reads from the Bot Creator database. The data lives in the **server's space** (the user's own space in a direct message). [`$dbSpace`](/docs/dbspace/) switches the rest of the run to the user or the bot. A script can never read another server's or another user's data.

Reads are never counted: there is no limit on the number of reads in a command.

## Syntax

```
$dbGet[collection;id;(path);(default)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `id` | Document id, 1 to 128 bytes. Often a Discord ID. |
| `path` | Optional. A dotted path inside the document, such as `stats.wins`. Without it, the whole document is returned as JSON. |
| `default` | Optional. Returned when the document or the path does not exist. Empty by default. |

## Return value

- The whole document as JSON, or the value at `path` (text as is, numbers and booleans as text, objects and lists as JSON).
- `default` when the document or the path is missing.

## Examples

### One value

```bdfd
You have $dbGet[players;$authorID;xp;0] XP.
```

### The whole document

```bdfd
$dbGet[players;$authorID]
```
