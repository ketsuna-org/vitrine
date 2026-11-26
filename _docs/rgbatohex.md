---
layout: doc
title: $rgbaToHex[]
translation_key: docs
category: "Math & Text"
function_name: rgbaToHex
syntax: $rgbaToHex[(alwaysIncludeAlpha);(allowShort);rgba]
description: "Converts groups of four RGBA values to a list of HEX colors."
---
# $rgbaToHex — Converts groups of four RGBA values to a list of HEX colors.

## Syntax

```
$rgbaToHex[(alwaysIncludeAlpha);(allowShort);rgba]
```

## Parameters

- **alwaysIncludeAlpha** *(Boolean, optional)* — true to keep the alpha even when opaque
- **allowShort** *(Boolean, optional)* — true to give a short form when possible
- **rgba** *(String, required)* — Values 0 to 255, by four

## Return Value

- String.

## Usage

```
$rgbaToHex[alwaysIncludeAlpha;allowShort;rgba] → result
```

## Example

```bdfd
$sendMessage[$rgbaToHex[alwaysIncludeAlpha;allowShort;rgba]]
```
