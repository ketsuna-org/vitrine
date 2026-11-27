---
layout: doc
title: $getImageData[]
translation_key: docs
category: "Image & Canvas"
function_name: getImageData
syntax: $getImageData[(canvas);x;y;width;height;(type)]
description: "Returns the pixels of an area (at most 40000) as a JSON array: Rgba (default, four numbers per pixel) or Hex. (alias of $getPixels)"
---
# $getImageData — Returns the pixels of an area (at most 40000) as a JSON array: Rgba (default, four numbers per pixel) or Hex. (alias of $getPixels)

## Syntax

```
$getImageData[(canvas);x;y;width;height;(type)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — Area X
- **y** *(Number, required)* — Area Y
- **width** *(Number, required)* — Area width
- **height** *(Number, required)* — Area height
- **type** *(String, optional)* — Rgba or Hex

## Return Value

- Json.

## Usage

```
$getImageData[canvas;x;y;width;height;type] → result
```

## Example

```bdfd
$sendMessage[$getImageData[canvas;x;y;width;height;type]]
```
