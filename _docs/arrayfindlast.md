---
layout: doc
title: $arrayFindLast[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFindLast
syntax: $arrayFindLast[array;variable;condition]
description: "Last item for which a condition is true."
---
# $arrayFindLast — Last item for which a condition is true.

## Syntax

```
$arrayFindLast[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arrayFindLast[a;x;$env[x]<3] → "2"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayFindLast[a;x;$env[x]<3]]
```
