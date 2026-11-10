---
layout: doc
title: $logarithm[]
translation_key: docs
category: "Math & Text"
function_name: logarithm
syntax: $logarithm[number;(base)]
description: "Logarithm of a positive number, natural by default. (`$log` is already used for logs.)"
---
# $logarithm — Logarithm of a positive number, natural by default. (`$log` is already used for logs.)

## Syntax

```
$logarithm[number;(base)]
```

## Parameters

- **number** *(number, required)* — Must be positive.
- **base** *(number, optional)* — Positive and not 1. Default e.

## Return Value

- string.

## Usage

```
$logarithm[100;10] → "2"
```

## Example

```bdfd
$sendMessage[$logarithm[1000;10]]
```
