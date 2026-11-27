---
layout: doc
title: $arrayIncludes[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayIncludes
syntax: $arrayIncludes[array;value]
description: "Tells whether an array contains a value."
---
# $arrayIncludes — Tells whether an array contains a value.

## Syntax

```
$arrayIncludes[array;value]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **value** *(text, required)* — The value.

## Return Value

- string.

## Usage

```
$arrayIncludes[a;1] → "true"
```

## Example

```bdfd
$sendMessage[$arrayIncludes[a;1]]
```
