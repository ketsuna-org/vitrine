---
layout: doc
title: $resizeCanvas[]
translation_key: docs
category: "Image & Canvas"
function_name: resizeCanvas
syntax: $resizeCanvas[(canvas);width;height]
description: "Resizes a canvas; as in ForgeCanvas, the canvas is emptied (transparent)."
---
# $resizeCanvas — Resizes a canvas; as in ForgeCanvas, the canvas is emptied (transparent).

## Syntax

```
$resizeCanvas[(canvas);width;height]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **width** *(Number, required)* — New width
- **height** *(Number, required)* — New height

## Return Value

- None.

## Usage

```
$resizeCanvas[canvas;width;height] → result
```

## Example

```bdfd
$sendMessage[$resizeCanvas[canvas;width;height]]
```
