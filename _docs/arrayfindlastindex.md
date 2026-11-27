---
layout: doc
title: $arrayFindLastIndex[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFindLastIndex
syntax: $arrayFindLastIndex[array;variable;condition]
description: "Index of the last item for which a condition is true (-1 if none)."
---
# $arrayFindLastIndex — Index of the last item for which a condition is true (-1 if none).

## Syntax

```
$arrayFindLastIndex[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arrayFindLastIndex[a;x;$env[x]<3] → "2"
```

## Example

```bdfd
$sendMessage[$arrayFindLastIndex[a;x;$env[x]<3]]
```
