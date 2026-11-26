---
layout: doc
title: $NQcolorMapRgba[]
translation_key: docs
category: "Image & Canvas"
function_name: NQcolorMapRgba
syntax: $NQcolorMapRgba[name]
description: "Returns the RGBA color map of the sample (JSON). (alias of $colorMapRgba)"
---
# $NQcolorMapRgba — Returns the RGBA color map of the sample (JSON). (alias of $colorMapRgba)

## Syntax

```
$NQcolorMapRgba[name]
```

## Parameters

- **name** *(String, required)* — Instance name

## Return Value

- Json.

## Usage

```
$NQcolorMapRgba[name] → result
```

## Example

```bdfd
$sendMessage[$NQcolorMapRgba[name]]
```
