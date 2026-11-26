---
layout: doc
title: $hexToInt[]
translation_key: docs
category: "Math & Text"
function_name: hexToInt
syntax: $hexToInt[hex]
description: "Converts a hexadecimal value to a number."
---
# $hexToInt — Converts a hexadecimal value to a number.

## Syntax

```
$hexToInt[hex]
```

## Parameters

- **hex** *(text, required)* — Hex value, with or without `#` / `0x`.

## Return Value

- string.

## Usage

```
$hexToInt[ff] → "255"
```

## Example

```bdfd
$sendMessage[$hexToInt[ff]]
```
