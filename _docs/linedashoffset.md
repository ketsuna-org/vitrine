---
layout: doc
title: $lineDashOffset[]
translation_key: docs
category: "Image & Canvas"
function_name: lineDashOffset
syntax: $lineDashOffset[(canvas);(offset)]
description: "Sets or returns the dash offset of a canvas."
---
# $lineDashOffset — Sets or returns the dash offset of a canvas.

## Syntax

```
$lineDashOffset[(canvas);(offset)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **offset** *(Number, optional)* — Offset

## Return Value

- Number.

## Usage

```
$lineDashOffset[canvas;offset] → result
```

## Example

```bdfd
$sendMessage[$lineDashOffset[canvas;offset]]
```
