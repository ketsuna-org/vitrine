---
layout: doc
title: $canvasCrop[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasCrop
syntax: $canvasCrop[(canvas);(top);(left);(right);(bottom)]
description: "Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)"
---
# $canvasCrop — Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)

## Syntax

```
$canvasCrop[(canvas);(top);(left);(right);(bottom)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **top** *(Boolean, optional)* — Trim the top (true)
- **left** *(Boolean, optional)* — Trim the left (true)
- **right** *(Boolean, optional)* — Trim the right (true)
- **bottom** *(Boolean, optional)* — Trim the bottom (true)

## Return Value

- None.

## Usage

```
$canvasCrop[canvas;top;left;right;bottom] → result
```

## Example

```bdfd
$sendMessage[$canvasCrop[canvas;top;left;right;bottom]]
```
