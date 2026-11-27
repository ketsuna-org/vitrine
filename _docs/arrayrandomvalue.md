---
layout: doc
title: $arrayRandomValue[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayRandomValue
syntax: $arrayRandomValue[array]
description: "A random item."
---
# $arrayRandomValue — A random item.

## Syntax

```
$arrayRandomValue[array]
```

## Parameters

- **array** *(text, required)* — Name of the array.

## Return Value

- string.

## Usage

```
$arrayRandomValue[a]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayRandomValue[a]]
```
