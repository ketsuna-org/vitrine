---
layout: doc
title: $listSum[]
translation_key: docs
category: "Lists & Helpers"
function_name: listSum
syntax: $listSum[list;(separator)]
description: "The sum of a list of numbers. An empty list gives an empty text."
---
# $listSum — The sum of a list of numbers

## Syntax

```
$listSum[list;(separator)]
```

## Parameters

- **list** *(text, required)* — Numbers joined by the separator. Text that is not a number raises an error.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listSum[3,9,2.5]
```

## Example

```bdfd
$sendMessage[$listSum[3,9,2.5]]
```
