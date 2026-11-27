---
layout: doc
title: $lineJoin[]
translation_key: docs
category: "Image & Canvas"
function_name: lineJoin
syntax: $lineJoin[(canvas);(shape)]
description: "Sets or returns the line join of a canvas (round, bevel, miter)."
---
# $lineJoin — Sets or returns the line join of a canvas (round, bevel, miter).

## Syntax

```
$lineJoin[(canvas);(shape)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **shape** *(String, optional)* — Join shape

## Return Value

- String.

## Usage

```
$lineJoin[canvas;shape] → result
```

## Example

```bdfd
$sendMessage[$lineJoin[canvas;shape]]
```
