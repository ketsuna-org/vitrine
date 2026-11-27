---
layout: doc
title: $stroke[]
translation_key: docs
category: "Image & Canvas"
function_name: stroke
syntax: $stroke[(canvas);style]
description: "Strokes the current path with the line width, dash and transform of the canvas."
---
# $stroke — Strokes the current path with the line width, dash and transform of the canvas.

## Syntax

```
$stroke[(canvas);style]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **style** *(String, required)* — Color

## Return Value

- None.

## Usage

```
$stroke[canvas;style] → result
```

## Example

```bdfd
$sendMessage[$stroke[canvas;style]]
```
