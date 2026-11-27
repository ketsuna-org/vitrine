---
layout: doc
title: $colorMapRgba[]
translation_key: docs
category: "Image & Canvas"
function_name: colorMapRgba
syntax: $colorMapRgba[name]
description: "Returns the RGBA color map of the sample (JSON)."
---
# $colorMapRgba — Returns the RGBA color map of the sample (JSON).

## Syntax

```
$colorMapRgba[name]
```

## Parameters

- **name** *(String, required)* — Instance name

## Return Value

- Json.

## Usage

```
$colorMapRgba[name] → result
```

## Example

```bdfd
$sendMessage[$colorMapRgba[name]]
```
