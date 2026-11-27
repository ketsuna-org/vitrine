---
layout: doc
title: $canvasSize[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasSize
syntax: $canvasSize[(canvas);(property)]
description: "Returns the size of a canvas, or its width or height."
---
# $canvasSize — Returns the size of a canvas, or its width or height.

## Syntax

```
$canvasSize[(canvas);(property)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **property** *(String, optional)* — width or height

## Return Value

- String.

## Usage

```
$canvasSize[canvas;property] → result
```

## Example

```bdfd
$sendMessage[$canvasSize[canvas;property]]
```
