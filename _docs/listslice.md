---
layout: doc
title: $listSlice[]
translation_key: docs
category: "Lists & Helpers"
function_name: listSlice
syntax: $listSlice[list;from;(to);(separator)]
description: "Keeps the items between two positions (both included)."
---
# $listSlice — Keeps the items between two positions (both included)

## Syntax

```
$listSlice[list;from;(to);(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **from** *(integer, required)* — First position to keep (1 is the first item). Negative counts from the end.
- **to** *(integer, optional)* — Last position to keep. Default: the end of the list.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string: empty when the range is outside the list.

## Usage

```
$listSlice[a,b,c,d;2;3] → "b,c"
$listSlice[a,b,c,d;-2] → "c,d"
```

## Example

```bdfd
$sendMessage[$listSlice[a,b,c,d;2;3]]
```
