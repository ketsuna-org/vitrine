---
layout: doc
title: $floorDiv
translation_key: docs
category: "Math & Text"
function_name: floorDiv
syntax: $floorDiv[a;b]
description: "Integer division rounded down (towards negative infinity)."
---

# $floorDiv

Integer division rounded down (towards negative infinity).

## Syntax

```
$floorDiv[a;b]
```

## Parameters

| Parameter | Description |
|---|---|
| `a` | Dividend (integer). |
| `b` | Divisor (integer, not 0). |

## Return Value

- string.

## Usage

```
$floorDiv[-3;8] → "-1"
$floorDiv[17;8] → "2"
```

## Example

```bdfd
$setUserVar[block;$floorDiv[$getUserVar[x];8]]
```

## Notes

JavaScript: `bc.math.floorDiv(a, b)`. `$divide` truncates towards zero; use this one to cut a grid with negative coordinates into blocks.
