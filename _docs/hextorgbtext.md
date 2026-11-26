---
layout: doc
title: $hexToRGBText[]
translation_key: docs
category: "Math & Text"
function_name: hexToRGBText
syntax: $hexToRGBText[hex;(separator)]
description: "Converts a six-digit hexadecimal color into its decimal RGB components, joined by a separator (comma by default). Unlike $hexToRGB (ForgeCanvas list), returns plain text."
---
# $hexToRGBText — Converts a six-digit hexadecimal color into its decimal RGB components, joined by a separator (comma by default). Unlike $hexToRGB (ForgeCanvas list), returns plain text.

## Syntax

```
$hexToRGBText[hex;(separator)]
```

## Parameters

- **hex** *(String, required)* — Six-digit hexadecimal color
- **separator** *(String, optional)* — Separator, comma by default

## Return Value

- String.

## Usage

```
$hexToRGBText[hex;separator] → result
```

## Example

```bdfd
$sendMessage[$hexToRGBText[hex;separator]]
```
