---
layout: doc
title: $imageBaseline[]
translation_key: docs
category: "Image & Canvas"
function_name: imageBaseline
syntax: $imageBaseline[(canvas);(baseline)]
description: "Sets or returns the vertical alignment (top, center, bottom) of the rectangles and images drawn next. (alias of $rectBaseline)"
---
# $imageBaseline — Sets or returns the vertical alignment (top, center, bottom) of the rectangles and images drawn next. (alias of $rectBaseline)

## Syntax

```
$imageBaseline[(canvas);(baseline)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **baseline** *(String, optional)* — top, center or bottom

## Return Value

- String.

## Usage

```
$imageBaseline[canvas;baseline] → result
```

## Example

```bdfd
$sendMessage[$imageBaseline[canvas;baseline]]
```
