---
layout: doc
title: $hexRed[]
translation_key: docs
category: "Image & Canvas"
function_name: hexRed
syntax: $hexRed[hex]
description: "Returns the red component (0 to 255) of a six-digit hexadecimal color."
---
# $hexRed — Returns the red component (0 to 255) of a six-digit hexadecimal color.

## Syntax

```
$hexRed[hex]
```

## Parameters

- **hex** *(String, required)* — Six-digit hexadecimal color

## Return Value

- String.

## Usage

```
$hexRed[hex] → result
```

## Example

```bdfd
$sendMessage[$hexRed[hex]]
```
