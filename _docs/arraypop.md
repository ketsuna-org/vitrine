---
layout: doc
title: $arrayPop[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayPop
syntax: $arrayPop[array]
description: "Removes and returns the last item."
---
# $arrayPop — Removes and returns the last item.

## Syntax

```
$arrayPop[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayPop[a] → "2"
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayPop[a]]
```
