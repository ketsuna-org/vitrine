---
layout: doc
title: $bigintSum[]
translation_key: docs
category: "Math & Text"
function_name: bigintSum
syntax: $bigintSum[numbers]
description: "Adds integers of any size."
---
# $bigintSum — Adds integers of any size.

## Syntax

```
$bigintSum[numbers]
```

## Parameters

- **numbers** *(number, required)* — Integers to add.

## Return Value

- string.

## Usage

```
$bigintSum[9007199254740993;1] → "9007199254740994"
```

## Example

```bdfd
$sendMessage[$bigintSum[9007199254740993;1]]
```
