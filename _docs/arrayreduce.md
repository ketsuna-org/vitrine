---
layout: doc
title: $arrayReduce[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayReduce
syntax: $arrayReduce[array;accumulator;item;code;(start)]
description: "Folds an array to one value: the code returns the new accumulator."
---
# $arrayReduce — Folds an array to one value: the code returns the new accumulator.

## Syntax

```
$arrayReduce[array;accumulator;item;code;(start)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **accumulator** *(text, required)* — Local variable that holds the accumulator.
- **item** *(text, required)* — Local variable that holds the item.
- **code** *(code, required)* — Code returning the new accumulator.
- **start** *(number, optional)* — Start value (default 0).

## Return Value

- string.

## Usage

```
$arrayReduce[a;t;x;$sum[$env[t];$env[x]]] → "6"
```

## Example

```bdfd
$sendMessage[$arrayReduce[a;t;x;$sum[$env[t];$env[x]]]]
```
