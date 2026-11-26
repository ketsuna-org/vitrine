---
layout: doc
title: $canvasDataUrl[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasDataUrl
syntax: $canvasDataUrl[(canvas);(format)]
description: "Returns the canvas as a data URL (png, jpeg or gif)."
---
# $canvasDataUrl — Returns the canvas as a data URL (png, jpeg or gif).

## Syntax

```
$canvasDataUrl[(canvas);(format)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **format** *(String, optional)* — png (default), jpeg or gif

## Return Value

- String.

## Usage

```
$canvasDataUrl[canvas;format] → result
```

## Example

```bdfd
$sendMessage[$canvasDataUrl[canvas;format]]
```
