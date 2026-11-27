---
layout: doc
title: $drawRect[]
translation_key: docs
category: "Image & Canvas"
function_name: drawRect
syntax: $drawRect[(canvas);type;(style);x;y;width;height;(radius)]
description: "Draws a rectangle (type fill or stroke) with an optional corner radius."
---
# $drawRect — Draws a rectangle (type fill or stroke) with an optional corner radius.

## Syntax

```
$drawRect[(canvas);type;(style);x;y;width;height;(radius)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **type** *(String, required)* — fill or stroke
- **style** *(String, optional)* — Color (hex or name)
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y
- **width** *(Number, required)* — Width
- **height** *(Number, required)* — Height
- **radius** *(Number, optional)* — Corner radius

## Return Value

- None.

## Usage

```
$drawRect[canvas;type;style;x;y;width;height;radius] → result
```

## Example

```bdfd
$sendMessage[$drawRect[canvas;type;style;x;y;width;height;radius]]
```
