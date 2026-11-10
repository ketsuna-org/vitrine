---
layout: doc
title: $listCount[]
translation_key: docs
category: "Lists & Helpers"
function_name: listCount
syntax: $listCount[list;(separator)]
description: "Counts the items of a list. An empty list has 0 items."
---
# $listCount — Counts the items of a list

## Syntax

```
$listCount[list;(separator)]
```

## Parameters

- **list** *(text, required)* — The items joined by the separator.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listCount[a,b,c] → "3"
$listCount[] → "0"
$listCount[a|b;|] → "2"
```

## Important Notes

- Lists are plain text: nothing is stored between two calls.

## Example

```bdfd
$sendMessage[$listCount[a,b,c]]
```
