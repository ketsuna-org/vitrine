---
layout: doc
title: $measureText[]
translation_key: docs
category: "Image & Canvas"
function_name: measureText
syntax: $measureText[(canvas);text;font;(property)]
description: "Measures a text as the canvas draws it (CSS font such as "20px Geist"): returns JSON, or one metric (width, actualBoundingBoxLeft/Right/Ascent/Descent, fontBoundingBoxAscent/Descent, emHeightAscent/Descent, alphabeticBaseline). Heights are approximated from the line height."
---
# $measureText — Measures a text as the canvas draws it (CSS font such as "20px Geist"): returns JSON, or one metric (width, actualBoundingBoxLeft/Right/Ascent/Descent, fontBoundingBoxAscent/Descent, emHeightAscent/Descent, alphabeticBaseline). Heights are approximated from the line height.

## Syntax

```
$measureText[(canvas);text;font;(property)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **text** *(String, required)* — Text to measure
- **font** *(String, required)* — CSS font, for example 20px Geist
- **property** *(String, optional)* — Metric to return (empty: JSON)

## Return Value

- String.

## Usage

```
$measureText[canvas;text;font;property] → result
```

## Example

```bdfd
$sendMessage[$measureText[canvas;text;font;property]]
```
