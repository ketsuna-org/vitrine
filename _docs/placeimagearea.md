---
layout: doc
title: $placeImageArea[]
translation_key: docs
category: "Image & Canvas"
function_name: placeImageArea
syntax: $placeImageArea[(canvas);src;srcX;srcY;(srcWidth);(srcHeight);x;y;(width);(height);(radius)]
description: "Draws one area of an image (crop) on the canvas; not available after a transform. (alias of $drawImageArea)"
---
# $placeImageArea — Draws one area of an image (crop) on the canvas; not available after a transform. (alias of $drawImageArea)

## Syntax

```
$placeImageArea[(canvas);src;srcX;srcY;(srcWidth);(srcHeight);x;y;(width);(height);(radius)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **src** *(String, required)* — Image source or name
- **srcX** *(Number, required)* — Area X
- **srcY** *(Number, required)* — Area Y
- **srcWidth** *(Number, optional)* — Area width
- **srcHeight** *(Number, optional)* — Area height
- **x** *(Number, required)* — Destination X
- **y** *(Number, required)* — Destination Y
- **width** *(Number, optional)* — Drawn width
- **height** *(Number, optional)* — Drawn height
- **radius** *(Number, optional)* — Corner radius

## Return Value

- None.

## Usage

```
$placeImageArea[canvas;src;srcX;srcY;srcWidth;srcHeight;x;y;width;height;radius] → result
```

## Example

```bdfd
$sendMessage[$placeImageArea[canvas;src;srcX;srcY;srcWidth;srcHeight;x;y;width;height;radius]]
```
