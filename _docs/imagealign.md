---
layout: doc
title: $imageAlign[]
translation_key: docs
category: "Image & Canvas"
function_name: imageAlign
syntax: $imageAlign[(canvas);(align)]
description: "Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)"
---
# $imageAlign — Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge. (alias of $rectAlign)

## Syntax

```
$imageAlign[(canvas);(align)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **align** *(String, optional)* — left, center or right

## Return Value

- String.

## Usage

```
$imageAlign[canvas;align] → result
```

## Example

```bdfd
$sendMessage[$imageAlign[canvas;align]]
```
