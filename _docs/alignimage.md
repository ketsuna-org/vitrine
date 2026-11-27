---
layout: doc
title: $alignImage[]
translation_key: docs
category: "Image & Canvas"
function_name: alignImage
syntax: $alignImage[(canvas);(align)]
description: "Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)"
---
# $alignImage — Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)

## Syntax

```
$alignImage[(canvas);(align)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **align** *(String, optional)* — left, center or right

## Return Value

- String.

## Usage

```
$alignImage[canvas;align] → result
```

## Example

```bdfd
$sendMessage[$alignImage[canvas;align]]
```
