---
layout: doc
title: $arraySort[]
translation_key: docs
category: "Lists & Helpers"
function_name: arraySort
syntax: $arraySort[array;(other);(order)]
description: "Sorts an array in place (text by default, `asc` or `desc` for numbers) and returns JSON, or stores it in another array."
---
# $arraySort — Sorts an array in place (text by default, `asc` or `desc` for numbers) and returns JSON, or stores it in another array.

## Syntax

```
$arraySort[array;(other);(order)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **other** *(text, optional)* — Array that receives the result.
- **order** *(text, optional)* — asc or desc for numeric order.

## Return Value

- string.

## Usage

```
$arraySort[a;;asc] → ["1","2","3"]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arraySort[a;;asc]]
```
