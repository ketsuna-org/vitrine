---
layout: doc
title: $arrayLastIndexOf[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayLastIndexOf
syntax: $arrayLastIndexOf[array;value]
description: "Index of the last item equal to a value (-1 when absent)."
---
# $arrayLastIndexOf — Index of the last item equal to a value (-1 when absent).

## Syntax

```
$arrayLastIndexOf[array;value]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **value** *(text, required)* — The value.

## Return Value

- string.

## Usage

```
$arrayLastIndexOf[a;2] → "2"
```

## Example

```bdfd
$sendMessage[$arrayLastIndexOf[a;2]]
```
