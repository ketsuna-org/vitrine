---
layout: doc
title: $listMin[]
translation_key: docs
category: "Lists & Helpers"
function_name: listMin
syntax: $listMin[list;(separator)]
description: "The smallest number of a list of numbers. An empty list gives an empty text."
---
# $listMin — The smallest number of a list of numbers

## Syntax

```
$listMin[list;(separator)]
```

## Parameters

- **list** *(text, required)* — Numbers joined by the separator. Text that is not a number raises an error.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listMin[3,9,2.5]
```

## Example

```bdfd
$sendMessage[$listMin[3,9,2.5]]
```
