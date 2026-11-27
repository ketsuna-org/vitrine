---
layout: doc
title: $hexGreen[]
translation_key: docs
category: "Image & Canvas"
function_name: hexGreen
syntax: $hexGreen[hex]
description: "Returns the green component (0 to 255) of a six-digit hexadecimal color."
---
# $hexGreen — Returns the green component (0 to 255) of a six-digit hexadecimal color.

## Syntax

```
$hexGreen[hex]
```

## Parameters

- **hex** *(String, required)* — Six-digit hexadecimal color

## Return Value

- String.

## Usage

```
$hexGreen[hex] → result
```

## Example

```bdfd
$sendMessage[$hexGreen[hex]]
```
