---
layout: doc
title: $arrayUnique[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayUnique
syntax: $arrayUnique[array;(other)]
description: "Removes duplicates; stores the result in another array or returns JSON."
---
# $arrayUnique — Removes duplicates; stores the result in another array or returns JSON.

## Syntax

```
$arrayUnique[array;(other)]
```

## Parameters

- **array** *(text, required)* — Name of the array.
- **other** *(text, optional)* — Array that receives the result.

## Return Value

- string.

## Usage

```
$arrayUnique[a]
```

## Example

```bdfd
$arrayLoad[a;,;3,1,2]
$sendMessage[$arrayUnique[a]]
```
