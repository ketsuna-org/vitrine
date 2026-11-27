---
layout: doc
title: $indexedToHex[]
translation_key: docs
category: "Image & Canvas"
function_name: indexedToHex
syntax: $indexedToHex[palette;(transparent);(alwaysAlpha);(allowShort);pixels]
description: "Converts palette indexes to hex colors (JSON array)."
---
# $indexedToHex — Converts palette indexes to hex colors (JSON array).

## Syntax

```
$indexedToHex[palette;(transparent);(alwaysAlpha);(allowShort);pixels]
```

## Parameters

- **palette** *(Json, required)* — Red, green, blue values of the palette
- **transparent** *(Number, optional)* — Index of the transparent color
- **alwaysAlpha** *(Boolean, optional)* — Always add the alpha channel
- **allowShort** *(Boolean, optional)* — Allow the short form
- **pixels** *(Number, required)* — Indexes (0 to 255)

## Return Value

- Json.

## Usage

```
$indexedToHex[palette;transparent;alwaysAlpha;allowShort;pixels] → result
```

## Example

```bdfd
$sendMessage[$indexedToHex[palette;transparent;alwaysAlpha;allowShort;pixels]]
```
