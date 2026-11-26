---
layout: doc
title: $drawText[]
translation_key: docs
category: "Image & Canvas"
function_name: drawText
syntax: $drawText[(canvas);type;text;font;style;x;y;(maxWidth)]
description: "Draws filled text; the font is written like CSS ("bold 24px Arial"), y is the baseline unless $textBaseline says otherwise."
---
# $drawText — Draws filled text; the font is written like CSS ("bold 24px Arial"), y is the baseline unless $textBaseline says otherwise.

## Syntax

```
$drawText[(canvas);type;text;font;style;x;y;(maxWidth)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **type** *(String, required)* — fill (stroke is not supported)
- **text** *(String, required)* — Text
- **font** *(String, required)* — Font, e.g. 24px Arial
- **style** *(String, required)* — Color
- **x** *(Number, required)* — X
- **y** *(Number, required)* — Y
- **maxWidth** *(Number, optional)* — Maximum width

## Return Value

- None.

## Usage

```
$drawText[canvas;type;text;font;style;x;y;maxWidth] → result
```

## Example

```bdfd
$sendMessage[$drawText[canvas;type;text;font;style;x;y;maxWidth]]
```
