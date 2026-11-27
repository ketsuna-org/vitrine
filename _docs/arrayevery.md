---
layout: doc
title: $arrayEvery[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayEvery
syntax: $arrayEvery[array;variable;condition]
description: "Tells whether a condition is true for every item."
---
# $arrayEvery — Tells whether a condition is true for every item.

## Syntax

```
$arrayEvery[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arrayEvery[a;x;$env[x]>0] → "true"
```

## Example

```bdfd
$sendMessage[$arrayEvery[a;x;$env[x]>0]]
```
