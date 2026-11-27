---
layout: doc
title: $globalPalette[]
translation_key: docs
category: "Image & Canvas"
function_name: globalPalette
syntax: $globalPalette[(gif)]
description: "Returns a global palette (red, green, blue values, JSON) computed from the first frame. (alias of $GIFEncoderGlobalPalette)"
---
# $globalPalette — Returns a global palette (red, green, blue values, JSON) computed from the first frame. (alias of $GIFEncoderGlobalPalette)

## Syntax

```
$globalPalette[(gif)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)

## Return Value

- Json.

## Usage

```
$globalPalette[gif] → result
```

## Example

```bdfd
$sendMessage[$globalPalette[gif]]
```
