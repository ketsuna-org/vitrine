---
layout: doc
title: $listAdd[]
translation_key: docs
category: "Lists & Helpers"
function_name: listAdd
syntax: $listAdd[list;item;(separator)]
description: "Adds an item at the end of a list and returns the new list."
---
# $listAdd — Adds an item at the end of a list and returns the new list

## Syntax

```
$listAdd[list;item;(separator)]
```

## Parameters

- **list** *(text, required)* — The items; may be empty.
- **item** *(text, required)* — The item to add.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string: the new list.

## Usage

```
$listAdd[a,b;c] → "a,b,c"
$listAdd[;c] → "c"
```

## Example

```bdfd
$sendMessage[$listAdd[a,b;c]]
```
