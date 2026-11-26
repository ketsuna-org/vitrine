---
layout: doc
title: $decimalToHex[]
translation_key: docs
category: "Math & Text"
function_name: decimalToHex
syntax: $decimalToHex[decimal]
description: "Converts a decimal color (0 to 16777215) into a six-digit uppercase hexadecimal code, without #."
---
# $decimalToHex — Converts a decimal color (0 to 16777215) into a six-digit uppercase hexadecimal code, without #.

## Syntax

```
$decimalToHex[decimal]
```

## Parameters

- **decimal** *(Integer, required)* — Decimal color, 0 to 16777215

## Return Value

- String.

## Usage

```
$decimalToHex[decimal] → result
```

## Example

```bdfd
$sendMessage[$decimalToHex[decimal]]
```
