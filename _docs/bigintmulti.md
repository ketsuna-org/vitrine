---
layout: doc
title: $bigintMulti[]
translation_key: docs
category: "Math & Text"
function_name: bigintMulti
syntax: $bigintMulti[numbers]
description: "Multiplies integers of any size."
---
# $bigintMulti — Multiplies integers of any size.

## Syntax

```
$bigintMulti[numbers]
```

## Parameters

- **numbers** *(number, required)* — Integers to multiply.

## Return Value

- string.

## Usage

```
$bigintMulti[99999999999;99999999999] → "9999999999800000000001"
```

## Example

```bdfd
$sendMessage[$bigintMulti[99999999999;99999999999]]
```
