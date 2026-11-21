---
layout: doc
title: $dbTransfer
translation_key: docs
category: "Database"
function_name: dbTransfer
syntax: $dbTransfer[collection;fromId;toId;path;amount]
description: Moves an amount from one document to another in a single atomic step. Not in BDFD.
---

# $dbTransfer

`$dbTransfer` takes the amount from one document and gives it to the other **in one transaction**: either both change or neither. The giver cannot go below `0` (`$dbLastError` is `conflict` when the balance is too low).

## Syntax

```
$dbTransfer[collection;fromId;toId;path;amount]
```

## Parameters

| Parameter | Description |
|---|---|
| `collection` | Collection name: lowercase letters, digits, `_`, `.` or `-` (up to 64 characters). It is created on first write. |
| `fromId` | Document that gives. |
| `toId` | Document that receives. Created if needed. |
| `path` | Dotted path of the number in both documents. |
| `amount` | A positive number. |

## Return value

- `true` when done.
- Empty when refused or failed.

## Examples

```bdfd
$dbTransfer[wallet;$authorID;$mentioned[1];cash;$message[2]]
$if[$dbLastError==conflict]
  Not enough cash.
$endif
```
