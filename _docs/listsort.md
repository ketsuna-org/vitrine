---
layout: doc
title: $listSort[]
translation_key: docs
category: "Lists & Helpers"
function_name: listSort
syntax: $listSort[list;(order);(numeric);(separator)]
description: "Sorts a list alphabetically (not case sensitive) or by number."
---
# $listSort — Sorts a list alphabetically (not case sensitive) or by number

## Syntax

```
$listSort[list;(order);(numeric);(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **order** *(`asc` or `desc`, optional)* — Default: `asc`.
- **numeric** *(`yes` or `no`, optional)* — `yes` compares numbers. Default: `no`. With `yes`, an item that is not a number raises an error.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listSort[b,C,a] → "a,b,C"
$listSort[10,9,100;desc;yes] → "100,10,9"
```

## Example

```bdfd
$sendMessage[$listSort[b,C,a]]
```
