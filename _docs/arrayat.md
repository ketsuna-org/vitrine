---
layout: doc
title: $arrayAt[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayAt
syntax: $arrayAt[array;index]
description: "Item at an index (negative counts from the end)."
---
# $arrayAt — Item at an index (negative counts from the end).

## Syntax

```
$arrayAt[array;index]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **index** *(number, required)* — Position.

## Return Value

- string.

## Usage

```
$arrayAt[a;-1] → "2"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayAt[a;-1]]
```
