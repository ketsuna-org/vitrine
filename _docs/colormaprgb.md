---
layout: doc
title: $colorMapRgb[]
translation_key: docs
category: "Image & Canvas"
function_name: colorMapRgb
syntax: $colorMapRgb[name]
description: "Returns the RGB color map of the sample (JSON)."
---
# $colorMapRgb — Returns the RGB color map of the sample (JSON).

## Syntax

```
$colorMapRgb[name]
```

## Parameters

- **name** *(String, required)* — Instance name

## Return Value

- Json.

## Usage

```
$colorMapRgb[name] → result
```

## Example

```bdfd
$sendMessage[$colorMapRgb[name]]
```
