---
layout: doc
title: $fill[]
translation_key: docs
category: "Image & Canvas"
function_name: fill
syntax: $fill[(canvas);style;(fillRule)]
description: "Fills the current path (each subpath on its own; holes are not handled)."
---
# $fill — Fills the current path (each subpath on its own; holes are not handled).

## Syntax

```
$fill[(canvas);style;(fillRule)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **style** *(String, required)* — Color
- **fillRule** *(String, optional)* — nonzero or evenodd

## Return Value

- None.

## Usage

```
$fill[canvas;style;fillRule] → result
```

## Example

```bdfd
$sendMessage[$fill[canvas;style;fillRule]]
```
