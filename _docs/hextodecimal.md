---
layout: doc
title: $hexToDecimal[]
translation_key: docs
category: "Image & Canvas"
function_name: hexToDecimal
syntax: $hexToDecimal[hex]
description: "Converts a six-digit hexadecimal color, with or without #, into a decimal integer."
---
# $hexToDecimal — Converts a six-digit hexadecimal color, with or without #, into a decimal integer.

## Syntax

```
$hexToDecimal[hex]
```

## Parameters

- **hex** *(String, required)* — Six-digit hexadecimal color

## Return Value

- String.

## Usage

```
$hexToDecimal[hex] → result
```

## Example

```bdfd
$sendMessage[$hexToDecimal[hex]]
```
