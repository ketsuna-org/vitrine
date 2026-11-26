---
layout: doc
title: $hexToRgba[]
translation_key: docs
category: "Math & Text"
function_name: hexToRgba
syntax: $hexToRgba[hex]
description: "Converts HEX colors to a list of RGBA values."
---
# $hexToRgba — Converts HEX colors to a list of RGBA values.

## Syntax

```
$hexToRgba[hex]
```

## Parameters

- **hex** *(String, required)* — Colors like #ff000080

## Return Value

- String.

## Usage

```
$hexToRgba[hex] → result
```

## Example

```bdfd
$sendMessage[$hexToRgba[hex]]
```
