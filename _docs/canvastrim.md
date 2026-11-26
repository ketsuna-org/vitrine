---
layout: doc
title: $canvasTrim[]
translation_key: docs
category: "Image & Canvas"
function_name: canvasTrim
syntax: $canvasTrim[(canvas);(top);(left);(right);(bottom)]
description: "Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)"
---
# $canvasTrim — Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)

## Syntax

```
$canvasTrim[(canvas);(top);(left);(right);(bottom)]
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
$canvasTrim[canvas;top;left;right;bottom] → result
```

## Example

```bdfd
$sendMessage[$canvasTrim[canvas;top;left;right;bottom]]
```
