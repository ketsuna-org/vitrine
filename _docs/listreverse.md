---
layout: doc
title: $listReverse[]
translation_key: docs
category: "Lists & Helpers"
function_name: listReverse
syntax: $listReverse[list;(separator)]
description: "Reverses the order of a list."
---
# $listReverse — Reverses the order of a list

## Syntax

```
$listReverse[list;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listReverse[1,2,3] → "3,2,1"
```

## Example

```bdfd
$sendMessage[$listReverse[1,2,3]]
```
