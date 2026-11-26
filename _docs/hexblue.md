---
layout: doc
title: $hexBlue[]
translation_key: docs
category: "Image & Canvas"
function_name: hexBlue
syntax: $hexBlue[hex]
description: "Returns the blue component (0 to 255) of a six-digit hexadecimal color."
---
# $hexBlue — Returns the blue component (0 to 255) of a six-digit hexadecimal color.

## Syntax

```
$hexBlue[hex]
```

## Parameters

- **hex** *(String, required)* — Six-digit hexadecimal color

## Return Value

- String.

## Usage

```
$hexBlue[hex] → result
```

## Example

```bdfd
$sendMessage[$hexBlue[hex]]
```
