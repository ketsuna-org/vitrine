---
layout: doc
title: $GIFEncoderGlobalPalette[]
translation_key: docs
category: "Image & Canvas"
function_name: GIFEncoderGlobalPalette
syntax: $GIFEncoderGlobalPalette[(gif)]
description: "Returns a global palette (red, green, blue values, JSON) computed from the first frame."
---
# $GIFEncoderGlobalPalette — Returns a global palette (red, green, blue values, JSON) computed from the first frame.

## Syntax

```
$GIFEncoderGlobalPalette[(gif)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)

## Return Value

- Json.

## Usage

```
$GIFEncoderGlobalPalette[gif] → result
```

## Example

```bdfd
$sendMessage[$GIFEncoderGlobalPalette[gif]]
```
