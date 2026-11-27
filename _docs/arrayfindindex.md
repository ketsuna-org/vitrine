---
layout: doc
title: $arrayFindIndex[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFindIndex
syntax: $arrayFindIndex[array;variable;condition]
description: "Index of the first item for which a condition is true (-1 if none)."
---
# $arrayFindIndex — Index of the first item for which a condition is true (-1 if none).

## Syntax

```
$arrayFindIndex[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arrayFindIndex[a;x;$env[x]<3] → "1"
```

## Example

```bdfd
$sendMessage[$arrayFindIndex[a;x;$env[x]<3]]
```
