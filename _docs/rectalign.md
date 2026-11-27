---
layout: doc
title: $rectAlign[]
translation_key: docs
category: "Image & Canvas"
function_name: rectAlign
syntax: $rectAlign[(canvas);(align)]
description: "Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge."
---
# $rectAlign — Sets or returns the horizontal alignment (left, center, right) of the rectangles and images drawn next: x is their left edge, center or right edge.

## Syntax

```
$rectAlign[(canvas);(align)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **align** *(String, optional)* — left, center or right

## Return Value

- String.

## Usage

```
$rectAlign[canvas;align] → result
```

## Example

```bdfd
$sendMessage[$rectAlign[canvas;align]]
```
