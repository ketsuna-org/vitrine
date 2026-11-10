---
layout: doc
title: $lcm[]
translation_key: docs
category: "Math & Text"
function_name: lcm
syntax: $lcm[a;b;...]
description: "Least common multiple of two or more whole numbers."
---
# $lcm — Least common multiple of two or more whole numbers.

## Syntax

```
$lcm[a;b;...]
```

## Parameters

- **a, b, ...** *(integer, required)* — At least two whole numbers.

## Return Value

- string.

## Usage

```
$lcm[4;6] → "12"
```

## Example

```bdfd
$sendMessage[$lcm[4;6]]
```
