---
layout: doc
title: $bezierCurveTo[]
translation_key: docs
category: "Image & Canvas"
function_name: bezierCurveTo
syntax: $bezierCurveTo[(canvas);cx1;cy1;cx2;cy2;x;y]
description: "Adds a cubic Bézier curve to the current path."
---
# $bezierCurveTo — Adds a cubic Bézier curve to the current path.

## Syntax

```
$bezierCurveTo[(canvas);cx1;cy1;cx2;cy2;x;y]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **cx1** *(Number, required)* — First control X
- **cy1** *(Number, required)* — First control Y
- **cx2** *(Number, required)* — Second control X
- **cy2** *(Number, required)* — Second control Y
- **x** *(Number, required)* — End X
- **y** *(Number, required)* — End Y

## Return Value

- None.

## Usage

```
$bezierCurveTo[canvas;cx1;cy1;cx2;cy2;x;y] → result
```

## Example

```bdfd
$sendMessage[$bezierCurveTo[canvas;cx1;cy1;cx2;cy2;x;y]]
```
