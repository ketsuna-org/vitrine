---
layout: doc
title: $rotate[]
translation_key: docs
category: "Image & Canvas"
function_name: rotate
syntax: $rotate[(canvas);angle]
description: "Adds a rotation (radians) to the transform of a canvas."
---
# $rotate — Adds a rotation (radians) to the transform of a canvas.

## Syntax

```
$rotate[(canvas);angle]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **angle** *(Number, required)* — Angle in radians

## Return Value

- None.

## Usage

```
$rotate[canvas;angle] → result
```

## Example

```bdfd
$sendMessage[$rotate[canvas;angle]]
```
