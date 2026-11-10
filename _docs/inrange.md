---
layout: doc
title: $inRange[]
translation_key: docs
category: "Lists & Helpers"
function_name: inRange
syntax: $inRange[number;min;max]
description: "Tells whether a number is between two bounds (both included)."
---
# $inRange — Tells whether a number is between two bounds (both included)

## Syntax

```
$inRange[number;min;max]
```

## Parameters

- **number** *(number, required)* — The value.
- **min** *(number, required)* — Lower bound.
- **max** *(number, required)* — Upper bound.

## Return Value

- `true` or `false`.

## Usage

```
$inRange[5;1;10] → "true"
```

## Example

```bdfd
$sendMessage[$inRange[5;1;10]]
```
