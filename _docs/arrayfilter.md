---
layout: doc
title: $arrayFilter[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFilter
syntax: $arrayFilter[array;variable;condition;(other)]
description: "Keeps the items for which a condition is true."
---
# $arrayFilter — Keeps the items for which a condition is true.

## Syntax

```
$arrayFilter[array;variable;condition;(other)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition run for each item.
- **other** *(text, optional)* — Array that receives the result.

## Return Value

- string.

## Usage

```
$arrayFilter[a;x;$env[x]>1]
```

## Example

```bdfd
$sendMessage[$arrayFilter[a;x;$env[x]>1]]
```
