---
layout: doc
title: $fontVariantCaps[]
translation_key: docs
category: "Image & Canvas"
function_name: fontVariantCaps
syntax: $fontVariantCaps[(canvas);(type)]
description: "Sets or returns the capitals of the text drawn next: normal, or small-caps, all-small-caps, petite-caps, all-petite-caps, unicase, titling-caps (all drawn as upper case, the fonts have no small capitals)."
---
# $fontVariantCaps — Sets or returns the capitals of the text drawn next: normal, or small-caps, all-small-caps, petite-caps, all-petite-caps, unicase, titling-caps (all drawn as upper case, the fonts have no small capitals).

## Syntax

```
$fontVariantCaps[(canvas);(type)]
```

## Parameters

- **canvas** *(String, optional)* — Canvas name (empty: the current canvas)
- **type** *(String, optional)* — Variant

## Return Value

- String.

## Usage

```
$fontVariantCaps[canvas;type] → result
```

## Example

```bdfd
$sendMessage[$fontVariantCaps[canvas;type]]
```
