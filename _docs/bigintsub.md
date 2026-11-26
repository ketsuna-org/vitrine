---
layout: doc
title: $bigintSub[]
translation_key: docs
category: "Math & Text"
function_name: bigintSub
syntax: $bigintSub[numbers]
description: "Subtracts integers of any size."
---
# $bigintSub — Subtracts integers of any size.

## Syntax

```
$bigintSub[numbers]
```

## Parameters

- **numbers** *(number, required)* — First integer, then those to subtract.

## Return Value

- string.

## Usage

```
$bigintSub[10;3] → "7"
```

## Example

```bdfd
$sendMessage[$bigintSub[10;3]]
```
