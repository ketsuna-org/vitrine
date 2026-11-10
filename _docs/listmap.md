---
layout: doc
title: $listMap[]
translation_key: docs
category: "Lists & Helpers"
function_name: listMap
syntax: $listMap[list;template;(separator);(outputSeparator)]
description: "Applies a template to each item. `{item}` is the item and `{index}` its position (starting at 1)."
---
# $listMap — Applies a template to each item

## Syntax

```
$listMap[list;template;(separator);(outputSeparator)]
```

## Parameters

- **list** *(text, required)* — The items.
- **template** *(text, required)* — Text with `{item}` and/or `{index}`.
- **separator** *(text, optional)* — The text between two items. Default: `,`. `\n` means a new line.
- **outputSeparator** *(text, optional)* — Separator of the result. Default: the same as `separator`. `\n` means a new line.

## Return Value

- string.

## Usage

```
$listMap[1,2;<@&{item}>] → "<@&1>,<@&2>"
$listMap[x,y;{index}. {item};,;\n] → "1. x" then "2. y"
```

## Important Notes

- The template is plain text, no code is run.

## Example

```bdfd
$sendMessage[$listMap[1,2;<@&{item}>]]
```
