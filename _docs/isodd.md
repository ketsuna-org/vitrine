---
layout: doc
title: $isOdd[]
translation_key: docs
category: "Math & Text"
function_name: isodd
syntax: $isOdd[integer]
description: "`true` when a whole number is odd."
---
# $isOdd — `true` when a whole number is odd.

## Syntax

```
$isOdd[integer]
```

## Parameters

- **integer** *(integer, required)* — The number.

## Return Value

- string.

## Usage

```
$isOdd[7] → "true"
```

## Example

```bdfd
$sendMessage[$isOdd[7]]
```
