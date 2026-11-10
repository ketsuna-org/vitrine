---
layout: doc
title: $clamp[]
translation_key: docs
category: "Math & Text"
function_name: clamp
syntax: $clamp[number;min;max]
description: "Keeps a number between a minimum and a maximum."
---
# $clamp — Keeps a number between a minimum and a maximum.

## Syntax

```
$clamp[number;min;max]
```

## Parameters

- **number** *(number, required)* — The number.
- **min** *(number, required)* — Lower bound.
- **max** *(number, required)* — Upper bound. Must not be below the minimum.

## Return Value

- string.

## Usage

```
$clamp[15;0;10] → "10"
```

## Example

```bdfd
$sendMessage[$clamp[$message[1];1;100]]
```
