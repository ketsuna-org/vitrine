---
layout: doc
title: $transform[]
translation_key: docs
category: "Image & Canvas"
function_name: transform
syntax: $transform[(canvas);a;b;c;d;e;f]
description: "Multiplies the transform of a canvas by a matrix."
---
# $transform — Multiplies the transform of a canvas by a matrix.

## Syntax

```
$transform[(canvas);a;b;c;d;e;f]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **a** *(Number, required)* — a
- **b** *(Number, required)* — b
- **c** *(Number, required)* — c
- **d** *(Number, required)* — d
- **e** *(Number, required)* — e
- **f** *(Number, required)* — f

## Return Value

- None.

## Usage

```
$transform[canvas;a;b;c;d;e;f] → result
```

## Example

```bdfd
$sendMessage[$transform[canvas;a;b;c;d;e;f]]
```
