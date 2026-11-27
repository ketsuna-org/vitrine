---
layout: doc
title: $arrayIndexOf[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayIndexOf
syntax: $arrayIndexOf[array;value]
description: "Index of the first item equal to a value (-1 when absent)."
---
# $arrayIndexOf — Index of the first item equal to a value (-1 when absent).

## Syntax

```
$arrayIndexOf[array;value]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **value** *(text, required)* — The value.

## Return Value

- string.

## Usage

```
$arrayIndexOf[a;1] → "1"
```

## Example

```bdfd
$sendMessage[$arrayIndexOf[a;1]]
```
