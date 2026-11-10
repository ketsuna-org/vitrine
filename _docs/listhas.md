---
layout: doc
title: $listHas[]
translation_key: docs
category: "Lists & Helpers"
function_name: listHas
syntax: $listHas[list;item;(separator)]
description: "Tells whether a list contains an item (exact match)."
---
# $listHas — Tells whether a list contains an item (exact match)

## Syntax

```
$listHas[list;item;(separator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **item** *(text, required)* — The item to look for.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.

## Return Value

- `true` or `false`.

## Usage

```
$listHas[1,2,3;2] → "true"
$listHas[1,2,3;4] → "false"
```

## Example

```bdfd
$sendMessage[$listHas[1,2,3;2]]
```
