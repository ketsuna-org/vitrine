---
layout: doc
title: $canvasBuffer[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasBuffer
syntax: $canvasBuffer[(canvas);variable;(format)]
description: "Stores the canvas as base64 in a variable read with $env[name]."
---
# $canvasBuffer — Stores the canvas as base64 in a variable read with $env[name].

## Syntax

```
$canvasBuffer[(canvas);variable;(format)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **variable** *(String, required)* — Variable name
- **format** *(String, optional)* — png (default), jpeg or gif

## Return Value

- None.

## Usage

```
$canvasBuffer[canvas;variable;format] → result
```

## Example

```bdfd
$sendMessage[$canvasBuffer[canvas;variable;format]]
```
