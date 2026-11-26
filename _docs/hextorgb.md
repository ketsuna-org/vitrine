---
layout: doc
title: $hexToRgb[]
translation_key: docs
category: "Math & Text"
function_name: hexToRgb
syntax: $hexToRgb[hex]
description: "Converts HEX colors to a list of RGB values."
---
# $hexToRgb — Converts HEX colors to a list of RGB values.

## Syntax

```
$hexToRgb[hex]
```

## Parameters

- **hex** *(String, required)* — Colors like #ff0000 or #f00

## Return Value

- String.

## Usage

```
$hexToRgb[hex] → result
```

## Example

```bdfd
$sendMessage[$hexToRgb[hex]]
```
