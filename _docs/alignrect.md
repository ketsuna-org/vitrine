---
layout: doc
title: $alignRect[]
translation_key: docs
category: "Image & Canvas"
function_name: alignRect
syntax: $alignRect[(canvas);(align)]
description: "Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)"
---
# $alignRect — Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)

## Syntax

```
$alignRect[(canvas);(align)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **align** *(String, optional)* — left, center or right

## Return Value

- String.

## Usage

```
$alignRect[canvas;align] → result
```

## Example

```bdfd
$sendMessage[$alignRect[canvas;align]]
```
