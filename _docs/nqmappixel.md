---
layout: doc
title: $NQmapPixel[]
translation_key: docs
category: "Image & Canvas"
function_name: NQmapPixel
syntax: $NQmapPixel[name;r;g;b;a]
description: "Returns the pixel mapped to the closest color of the color map, as [r, g, b, a] (nothing is changed in place)."
---
# $NQmapPixel — Returns the pixel mapped to the closest color of the color map, as [r, g, b, a] (nothing is changed in place).

## Syntax

```
$NQmapPixel[name;r;g;b;a]
```

## Parameters

- **name** *(String, required)* — Instance name
- **r** *(Number, required)* — Red
- **g** *(Number, required)* — Green
- **b** *(Number, required)* — Blue
- **a** *(Number, required)* — Alpha

## Return Value

- Json.

## Usage

```
$NQmapPixel[name;r;g;b;a] → result
```

## Example

```bdfd
$sendMessage[$NQmapPixel[name;r;g;b;a]]
```
