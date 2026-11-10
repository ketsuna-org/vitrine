---
layout: doc
title: $listRemove[]
translation_key: docs
category: "Lists & Helpers"
function_name: listRemove
syntax: $listRemove[list;item;(separator)]
description: "Removes every occurrence of an item and returns the new list."
---
# $listRemove — Removes every occurrence of an item and returns the new list

## Syntax

```
$listRemove[list;item;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **item** *(text, required)* — The item to remove.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string: the new list (empty when nothing is left).

## Usage

```
$listRemove[a,b,a;a] → "b"
$listRemove[a;a] → ""
```

## Example

```bdfd
$sendMessage[$listRemove[a,b,a;a]]
```
