---
layout: doc
title: $gcd[]
translation_key: docs
category: "Math & Text"
function_name: gcd
syntax: $gcd[a;b;...]
description: "Greatest common divisor of two or more whole numbers."
---
# $gcd — Greatest common divisor of two or more whole numbers.

## Syntax

```
$gcd[a;b;...]
```

## Parameters

- **a, b, ...** *(integer, required)* — At least two whole numbers.

## Return Value

- string.

## Usage

```
$gcd[12;18] → "6"
```

## Example

```bdfd
$sendMessage[$gcd[12;18]]
```
