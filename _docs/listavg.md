---
layout: doc
title: $listAvg[]
translation_key: docs
category: "Lists & Helpers"
function_name: listAvg
syntax: $listAvg[list;(separator)]
description: "The average of a list of numbers. An empty list gives an empty text."
---
# $listAvg — The average of a list of numbers

## Syntax

```
$listAvg[list;(separator)]
```

## Parameters

- **list** *(text, required)* — Numbers joined by the separator. Text that is not a number raises an error.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listAvg[3,9,2.5]
```

## Example

```bdfd
$sendMessage[$listAvg[3,9,2.5]]
```
