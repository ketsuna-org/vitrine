---
layout: doc
title: $quadraticCurveTo[]
translation_key: docs
category: "Image & Canvas"
function_name: quadraticCurveTo
syntax: $quadraticCurveTo[(canvas);cx;cy;x;y]
description: "Adds a quadratic Bézier curve to the current path."
---
# $quadraticCurveTo — Adds a quadratic Bézier curve to the current path.

## Syntax

```
$quadraticCurveTo[(canvas);cx;cy;x;y]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **cx** *(Number, required)* — Control X
- **cy** *(Number, required)* — Control Y
- **x** *(Number, required)* — End X
- **y** *(Number, required)* — End Y

## Return Value

- None.

## Usage

```
$quadraticCurveTo[canvas;cx;cy;x;y] → result
```

## Example

```bdfd
$sendMessage[$quadraticCurveTo[canvas;cx;cy;x;y]]
```
