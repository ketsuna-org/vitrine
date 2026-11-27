---
layout: doc
title: $arraySome[]
translation_key: docs
category: "Lists & Helpers"
function_name: arraySome
syntax: $arraySome[array;variable;condition]
description: "Tells whether a condition is true for at least one item."
---
# $arraySome — Tells whether a condition is true for at least one item.

## Syntax

```
$arraySome[array;variable;condition]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **condition** *(code, required)* — Condition.

## Return Value

- string.

## Usage

```
$arraySome[a;x;$env[x]>2] → "true"
```

## Example

```bdfd
$sendMessage[$arraySome[a;x;$env[x]>2]]
```
