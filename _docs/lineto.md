---
layout: doc
title: $lineTo[]
translation_key: docs
category: "Image & Canvas"
function_name: lineTo
syntax: $lineTo[(canvas);x;y]
description: "Adds a straight line to the current path."
---
# $lineTo — Adds a straight line to the current path.

## Syntax

```
$lineTo[(canvas);x;y]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y

## Return Value

- None.

## Usage

```
$lineTo[canvas;x;y] → result
```

## Example

```bdfd
$sendMessage[$lineTo[canvas;x;y]]
```
