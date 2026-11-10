---
layout: doc
title: $listGet[]
translation_key: docs
category: "Lists & Helpers"
function_name: listGet
syntax: $listGet[list;position;(separator)]
description: "Gets one item of a list. Position 1 is the first item, -1 the last."
---
# $listGet — Gets one item of a list

## Syntax

```
$listGet[list;position;(separator)]
```

## Parameters

- **list** *(text, required)* — The items joined by the separator.
- **position** *(integer, required)* — 1 for the first item, 2 for the second. A negative number counts from the end.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string: the item, or an empty text when the position does not exist (never an error).

## Usage

```
$listGet[a,b,c;2] → "b"
$listGet[a,b,c;-1] → "c"
$listGet[a,b,c;9] → ""
```

## Example

```bdfd
$sendMessage[$listGet[a,b,c;2]]
```
