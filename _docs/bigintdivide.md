---
layout: doc
title: $bigintDivide[]
translation_key: docs
category: "Math & Text"
function_name: bigintDivide
syntax: $bigintDivide[numbers]
description: "Divides integers of any size (integer division)."
---
# $bigintDivide — Divides integers of any size (integer division).

## Syntax

```
$bigintDivide[numbers]
```

## Parameters

- **numbers** *(number, required)* — Dividend, then divisors.

## Return Value

- string.

## Usage

```
$bigintDivide[10;3] → "3"
```

## Example

```bdfd
$sendMessage[$bigintDivide[10;3]]
```
