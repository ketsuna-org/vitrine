---
layout: doc
title: $arrayFind[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayFind
syntax: $arrayFind[array;variable;condition]
description: "First item for which a condition is true."
---
# $arrayFind — First item for which a condition is true.

## Syntax

```
$arrayFind[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arrayFind[a;x;$env[x]<3] → "1"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayFind[a;x;$env[x]<3]]
```
