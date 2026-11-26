---
layout: doc
title: $arraySlice[]
translation_key: docs
category: "Lists & Helpers"
function_name: arraySlice
syntax: $arraySlice[array;other;start;(end)]
description: "A part of an array; stores it in another array or returns JSON."
---
# $arraySlice — A part of an array; stores it in another array or returns JSON.

## Syntax

```
$arraySlice[array;other;start;(end)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **other** *(text, required, may be empty)* — Array that receives the result.
- **start** *(number, required)* — First index.
- **end** *(number, optional)* — End index (excluded).

## Return Value

- string.

## Usage

```
$arraySlice[a;;1] → ["1","2"]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arraySlice[a;;1]]
```
