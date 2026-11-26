---
layout: doc
title: $rgbToHex[]
translation_key: docs
category: "Math & Text"
function_name: rgbToHex
syntax: $rgbToHex[(allowShort);rgb]
description: "Converts groups of three RGB values to a list of HEX colors."
---
# $rgbToHex — Converts groups of three RGB values to a list of HEX colors.

## Syntax

```
$rgbToHex[(allowShort);rgb]
```

## Parameters

- **allowShort** *(Boolean, optional)* — true to give #f00 when possible
- **rgb** *(String, required)* — Values 0 to 255, by three

## Return Value

- String.

## Usage

```
$rgbToHex[allowShort;rgb] → result
```

## Example

```bdfd
$sendMessage[$rgbToHex[allowShort;rgb]]
```
