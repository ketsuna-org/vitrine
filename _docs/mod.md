---
layout: doc
title: $mod
translation_key: docs
category: "Math & Text"
function_name: mod
syntax: $mod[a;b]
description: "Remainder that is never negative for a positive divisor."
---

# $mod

Remainder that is never negative for a positive divisor.

## Syntax

```
$mod[a;b]
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
$mod[-3;8] → "5"
$mod[19;8] → "3"
```

## Example

```bdfd
$setUserVar[cell;$mod[$getUserVar[x];8]]
```

## Notes

JavaScript: `bc.math.mod(a, b)`. `$modulo` keeps the sign of the dividend (`$modulo[-3;8]` is `-3`); `$mod` pairs with `$floorDiv` (`a = $floorDiv*b + $mod`).
