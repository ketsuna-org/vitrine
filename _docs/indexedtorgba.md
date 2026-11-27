---
layout: doc
title: $indexedToRgba[]
translation_key: docs
category: "Image & Canvas"
function_name: indexedToRgba
syntax: $indexedToRgba[palette;(transparent);pixels]
description: "Converts palette indexes to red, green, blue, alpha values (JSON array)."
---
# $indexedToRgba — Converts palette indexes to red, green, blue, alpha values (JSON array).

## Syntax

```
$indexedToRgba[palette;(transparent);pixels]
```

## Parameters

- **palette** *(Json, required)* — Red, green, blue values of the palette
- **transparent** *(Number, optional)* — Index of the transparent color
- **pixels** *(Number, required)* — Indexes (0 to 255)

## Return Value

- Json.

## Usage

```
$indexedToRgba[palette;transparent;pixels] → result
```

## Example

```bdfd
$sendMessage[$indexedToRgba[palette;transparent;pixels]]
```
