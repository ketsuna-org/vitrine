---
layout: doc
title: $arrayClear[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayClear
syntax: $arrayClear[array]
description: "Empties an array."
---
# $arrayClear — Empties an array.

## Syntax

```
$arrayClear[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayClear[a]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayClear[a]
$sendMessage[$arrayLength[a]]
```
