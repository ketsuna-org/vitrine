---
layout: doc
title: $arrayAdvancedSort[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayAdvancedSort
syntax: $arrayAdvancedSort[array;a;b;code;(other)]
description: "Sorts with code that compares two items `a` and `b` and returns a number."
---
# $arrayAdvancedSort — Sorts with code that compares two items `a` and `b` and returns a number.

## Syntax

```
$arrayAdvancedSort[array;a;b;code;(other)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **a** *(text, required)* — Local variable for the first item.
- **b** *(text, required)* — Local variable for the second item.
- **code** *(code, required)* — Code returning a negative, zero or positive number.
- **other** *(text, optional)* — Array that receives the result.

## Return Value

- string.

## Usage

```
$arrayAdvancedSort[a;x;y;$sub[$env[x];$env[y]]]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayAdvancedSort[a;x;y;$sub[$env[x];$env[y]]]]
```
