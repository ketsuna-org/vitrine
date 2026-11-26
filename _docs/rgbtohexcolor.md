---
layout: doc
title: $rgbToHexColor[]
translation_key: docs
category: "Math & Text"
function_name: rgbToHexColor
syntax: $rgbToHexColor[red;green;blue]
description: "Converts red, green and blue components (0 to 255) into a #RRGGBB color. Unlike $rgbToHex (ForgeCanvas list), returns plain text."
---
# $rgbToHexColor — Converts red, green and blue components (0 to 255) into a #RRGGBB color. Unlike $rgbToHex (ForgeCanvas list), returns plain text.

## Syntax

```
$rgbToHexColor[red;green;blue]
```

## Parameters

- **red** *(Integer, required)* — 0 to 255
- **green** *(Integer, required)* — 0 to 255
- **blue** *(Integer, required)* — 0 to 255

## Return Value

- String.

## Usage

```
$rgbToHexColor[red;green;blue] → result
```

## Example

```bdfd
$sendMessage[$rgbToHexColor[red;green;blue]]
```
