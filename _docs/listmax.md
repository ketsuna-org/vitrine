---
layout: doc
title: $listMax[]
translation_key: docs
category: "Lists & Helpers"
function_name: listMax
syntax: $listMax[list;(separator)]
description: "The largest number of a list of numbers. An empty list gives an empty text."
---
# $listMax — The largest number of a list of numbers

## Syntax

```
$listMax[list;(separator)]
```

## Parameters

- **list** *(text, required)* — Numbers joined by the separator. Text that is not a number raises an error.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- number.

## Usage

```
$listMax[3,9,2.5]
```

## Example

```bdfd
$sendMessage[$listMax[3,9,2.5]]
```
