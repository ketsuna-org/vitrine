---
layout: doc
title: $encoderGlobalPalette[]
translation_key: docs
category: "Image & Canvas"
function_name: encoderGlobalPalette
syntax: $encoderGlobalPalette[(gif)]
description: "Returns a global palette (red, green, blue values, JSON) computed from the first frame. (alias of $GIFEncoderGlobalPalette)"
---
# $encoderGlobalPalette — Returns a global palette (red, green, blue values, JSON) computed from the first frame. (alias of $GIFEncoderGlobalPalette)

## Syntax

```
$encoderGlobalPalette[(gif)]
```

## Parameters

- **gif** *(String, optional)* — Encoder name (empty: the only one)

## Return Value

- Json.

## Usage

```
$encoderGlobalPalette[gif] → result
```

## Example

```bdfd
$sendMessage[$encoderGlobalPalette[gif]]
```
