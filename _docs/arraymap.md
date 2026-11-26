---
layout: doc
title: $arrayMap[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayMap
syntax: $arrayMap[array;variable;code;(other)]
description: "Builds an array from the result of code run on each item."
---
# $arrayMap — Builds an array from the result of code run on each item.

## Syntax

```
$arrayMap[array;variable;code;(other)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **code** *(code, required)* — Code whose result replaces the item.
- **other** *(text, optional)* — Array that receives the result.

## Return Value

- string.

## Usage

```
$arrayMap[a;x;$sum[$env[x];1]]
```

## Example

```bdfd
$sendMessage[$arrayMap[a;x;$sum[$env[x];1]]]
```
