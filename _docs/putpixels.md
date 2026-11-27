---
layout: doc
title: $putPixels[]
translation_key: docs
category: "Image & Canvas"
function_name: putPixels
syntax: $putPixels[(canvas);pixels;x;y;width;height;(type)]
description: "Places pixels (JSON array, Rgba or Hex) in an area of the canvas without blending."
---
# $putPixels — Places pixels (JSON array, Rgba or Hex) in an area of the canvas without blending.

## Syntax

```
$putPixels[(canvas);pixels;x;y;width;height;(type)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **pixels** *(Json, required)* — Pixels
- **x** *(Number, required)* — Area X
- **y** *(Number, required)* — Area Y
- **width** *(Number, required)* — Area width
- **height** *(Number, required)* — Area height
- **type** *(String, optional)* — Rgba or Hex

## Return Value

- None.

## Usage

```
$putPixels[canvas;pixels;x;y;width;height;type] → result
```

## Example

```bdfd
$sendMessage[$putPixels[canvas;pixels;x;y;width;height;type]]
```
