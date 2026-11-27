---
layout: doc
title: $getPixels[]
translation_key: docs
category: "Image & Canvas"
function_name: getPixels
syntax: $getPixels[(canvas);x;y;width;height;(type)]
description: "Returns the pixels of an area (at most 40000) as a JSON array: Rgba (default, four numbers per pixel) or Hex."
---
# $getPixels — Returns the pixels of an area (at most 40000) as a JSON array: Rgba (default, four numbers per pixel) or Hex.

## Syntax

```
$getPixels[(canvas);x;y;width;height;(type)]
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
$getPixels[canvas;x;y;width;height;type] → result
```

## Example

```bdfd
$sendMessage[$getPixels[canvas;x;y;width;height;type]]
```
