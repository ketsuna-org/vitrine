---
layout: doc
title: $dbCount
translation_key: docs
category: "Database"
function_name: dbCount
syntax: $dbCount[collection;(field);(operator);(value)]
description: Counts the documents of a collection, optionally those matching a condition. Not in BDFD.
---

# $dbCount

`$dbCount` counts without loading the documents.

## Syntax

```
$dbCount[collection;(field);(operator);(value)]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `field` | Optional. Field to test. |
| `operator` | Optional. `=` (default), `!=`, `<`, `<=`, `>`, `>=` or `prefix`. |
| `value` | Value to compare, read like in [`$dbFind`](/docs/dbfind/). |

## Return value

- The number of documents.

## Examples

```bdfd
$dbCount[players]
$dbCount[players;xp;>=;100]
```
