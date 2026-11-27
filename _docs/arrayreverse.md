---
layout: doc
title: $arrayReverse[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayReverse
syntax: $arrayReverse[array;(other)]
description: "Reverses an array; stores the result in another array or returns JSON."
---
# $arrayReverse — Reverses an array; stores the result in another array or returns JSON.

## Syntax

```
$arrayReverse[array;(other)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **other** *(text, optional)* — Array that receives the result.

## Return Value

- string.

## Usage

```
$arrayReverse[a] → ["2","1","3"]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayReverse[a]]
```
