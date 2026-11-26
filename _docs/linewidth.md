---
layout: doc
title: $lineWidth[]
translation_key: docs
category: "Image & Canvas"
function_name: lineWidth
syntax: $lineWidth[(canvas);(width)]
description: "Sets or returns the line width of a canvas."
---
# $lineWidth — Sets or returns the line width of a canvas.

## Syntax

```
$lineWidth[(canvas);(width)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **width** *(Number, optional)* — Width in pixels

## Return Value

- Number.

## Usage

```
$lineWidth[canvas;width] → result
```

## Example

```bdfd
$sendMessage[$lineWidth[canvas;width]]
```
