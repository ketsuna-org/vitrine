---
layout: doc
title: $drawImageArea[]
translation_key: docs
category: "Image & Canvas"
function_name: drawImageArea
syntax: $drawImageArea[(canvas);src;srcX;srcY;(srcWidth);(srcHeight);x;y;(width);(height);(radius)]
description: "Draws one area of an image (crop) on the canvas; not available after a transform."
---
# $drawImageArea — Draws one area of an image (crop) on the canvas; not available after a transform.

## Syntax

```
$drawImageArea[(canvas);src;srcX;srcY;(srcWidth);(srcHeight);x;y;(width);(height);(radius)]
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
$drawImageArea[canvas;src;srcX;srcY;srcWidth;srcHeight;x;y;width;height;radius] → result
```

## Example

```bdfd
$sendMessage[$drawImageArea[canvas;src;srcX;srcY;srcWidth;srcHeight;x;y;width;height;radius]]
```
