---
layout: doc
title: $putImageData[]
translation_key: docs
category: "Image & Canvas"
function_name: putImageData
syntax: $putImageData[(canvas);pixels;x;y;width;height;(type)]
description: "Places pixels (JSON array, Rgba or Hex) in an area of the canvas without blending. (alias of $putPixels)"
---
# $putImageData — Places pixels (JSON array, Rgba or Hex) in an area of the canvas without blending. (alias of $putPixels)

## Syntax

```
$putImageData[(canvas);pixels;x;y;width;height;(type)]
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
$putImageData[canvas;pixels;x;y;width;height;type] → result
```

## Example

```bdfd
$sendMessage[$putImageData[canvas;pixels;x;y;width;height;type]]
```
