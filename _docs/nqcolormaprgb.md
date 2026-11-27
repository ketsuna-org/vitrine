---
layout: doc
title: $NQcolorMapRgb[]
translation_key: docs
category: "Image & Canvas"
function_name: NQcolorMapRgb
syntax: $NQcolorMapRgb[name]
description: "Returns the RGB color map of the sample (JSON). (alias of $colorMapRgb)"
---
# $NQcolorMapRgb — Returns the RGB color map of the sample (JSON). (alias of $colorMapRgb)

## Syntax

```
$NQcolorMapRgb[name]
```

## Parameters

- **name** *(String, required)* — Instance name

## Return Value

- Json.

## Usage

```
$NQcolorMapRgb[name] → result
```

## Example

```bdfd
$sendMessage[$NQcolorMapRgb[name]]
```
