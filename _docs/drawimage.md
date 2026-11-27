---
layout: doc
title: $drawImage[]
translation_key: docs
category: "Image & Canvas"
function_name: drawImage
syntax: $drawImage[(canvas);src;x;y;(width);(height);(radius)]
description: "Draws an image (a name from $loadImage or a source) on a canvas, with an optional corner radius."
---
# $drawImage — Draws an image (a name from $loadImage or a source) on a canvas, with an optional corner radius.

## Syntax

```
$drawImage[(canvas);src;x;y;(width);(height);(radius)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **src** *(String, required)* — Image name or source
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y
- **width** *(Number, optional)* — Width
- **height** *(Number, optional)* — Height
- **radius** *(Number, optional)* — Corner radius

## Return Value

- None.

## Usage

```
$drawImage[canvas;src;x;y;width;height;radius] → result
```

## Example

```bdfd
$sendMessage[$drawImage[canvas;src;x;y;width;height;radius]]
```
