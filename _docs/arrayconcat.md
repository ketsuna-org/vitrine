---
layout: doc
title: $arrayConcat[]
translation_key: docs
category: "Lists & Helpers"
function_name: arrayConcat
syntax: $arrayConcat[other;arrays]
description: "Joins several arrays; stores the result in another array, or returns JSON when the first argument is empty."
---
# $arrayConcat — Joins several arrays; stores the result in another array, or returns JSON when the first argument is empty.

## Syntax

```
$arrayConcat[other;arrays]
```

## Parameters

- **other** *(text, required, may be empty)* — Array that receives the result (empty to return JSON).
- **arrays** *(text, required)* — Names of the arrays to join.

## Return Value

- string.

## Usage

```
$arrayConcat[;a;b]
```

## Example

```bdfd
$sendMessage[$arrayConcat[;a;b]]
```
