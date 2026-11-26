---
layout: doc
title: $arrayForEach[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayForEach
syntax: $arrayForEach[array;variable;code]
description: "Runs code once per item; `$env[variable]` holds the current item."
---
# $arrayForEach — Runs code once per item; `$env[variable]` holds the current item.

## Syntax

```
$arrayForEach[array;variable;code]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **variable** *(text, required)* — Local variable that holds the item.
- **code** *(code, required)* — Code run for each item.

## Return Value

- string.

## Usage

```
$arrayForEach[a;x;$letSum[t;$env[x]]]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$arrayForEach[a;x;$letSum[total;$env[x]]]
$sendMessage[$get[total]]
```
