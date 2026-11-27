---
layout: doc
title: $trimCanvas[]
translation_key: docs
category: "Image & Canvas"
function_name: trimCanvas
syntax: $trimCanvas[(canvas);(top);(left);(right);(bottom)]
description: "Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)"
---
# $trimCanvas — Crops the transparent borders of a canvas (each side can be kept with false). (alias of $cropCanvas)

## Syntax

```
$trimCanvas[(canvas);(top);(left);(right);(bottom)]
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
$trimCanvas[canvas;top;left;right;bottom] → result
```

## Example

```bdfd
$sendMessage[$trimCanvas[canvas;top;left;right;bottom]]
```
