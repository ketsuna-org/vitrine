---
layout: doc
title: $arrayRandomIndex[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayRandomIndex
syntax: $arrayRandomIndex[array]
description: "A random valid index (-1 for an empty array)."
---
# $arrayRandomIndex — A random valid index (-1 for an empty array).

## Syntax

```
$arrayRandomIndex[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayRandomIndex[a]
```

## Example

```bdfd
$sendMessage[$arrayRandomIndex[a]]
```
