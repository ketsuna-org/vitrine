---
layout: doc
title: $scale[]
translation_key: docs
category: "Image & Canvas"
function_name: scale
syntax: $scale[(canvas);x;y]
description: "Adds a scaling to the transform of a canvas."
---
# $scale — Adds a scaling to the transform of a canvas.

## Syntax

```
$scale[(canvas);x;y]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — Horizontal factor
- **y** *(Number, required)* — Vertical factor

## Return Value

- None.

## Usage

```
$scale[canvas;x;y] → result
```

## Example

```bdfd
$sendMessage[$scale[canvas;x;y]]
```
