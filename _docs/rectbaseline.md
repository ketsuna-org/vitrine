---
layout: doc
title: $rectBaseline[]
translation_key: docs
category: "Image & Canvas"
function_name: rectBaseline
syntax: $rectBaseline[(canvas);(baseline)]
description: "Sets or returns the vertical alignment (top, center, bottom) of the rectangles and images drawn next."
---
# $rectBaseline — Sets or returns the vertical alignment (top, center, bottom) of the rectangles and images drawn next.

## Syntax

```
$rectBaseline[(canvas);(baseline)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **baseline** *(String, optional)* — top, center or bottom

## Return Value

- String.

## Usage

```
$rectBaseline[canvas;baseline] → result
```

## Example

```bdfd
$sendMessage[$rectBaseline[canvas;baseline]]
```
