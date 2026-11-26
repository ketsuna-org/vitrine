---
layout: doc
title: $mapPixel[]
translation_key: docs
category: "Image & Canvas"
function_name: mapPixel
syntax: $mapPixel[name;r;g;b;a]
description: "Returns the pixel mapped to the closest color of the color map, as [r, g, b, a] (nothing is changed in place). (alias of $NQmapPixel)"
---
# $mapPixel — Returns the pixel mapped to the closest color of the color map, as [r, g, b, a] (nothing is changed in place). (alias of $NQmapPixel)

## Syntax

```
$mapPixel[name;r;g;b;a]
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
$mapPixel[name;r;g;b;a] → result
```

## Example

```bdfd
$sendMessage[$mapPixel[name;r;g;b;a]]
```
