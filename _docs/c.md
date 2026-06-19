---
layout: doc
title: $c
translation_key: docs
category: "Math & Text"
function_name: c
syntax: $c[expression]
description: Alias of $calculate. Performs a mathematical calculation and returns the result. Supports basic operations, mathematical functions, and variables.
aliases:
  - $calculate
---
# $c (alias of $calculate)

The `$c[]` function is a **shortened alias** of `$calculate[]`. It performs mathematical calculations and returns the result.

## Syntax

```
$c[expression]
```

## Parameters

| Parameter | Description |
|---|---|
| `expression` | Mathematical expression to evaluate. |

## Supported Operators

| Operator | Description | Example |
|---|---|---|
| `+` | Addition | `$c[2+3]` → `5` |
| `-` | Subtraction | `$c[10-4]` → `6` |
| `*` | Multiplication | `$c[6*7]` → `42` |
| `/` | Division | `$c[15/3]` → `5` |
| `%` | Modulo | `$c[10%3]` → `1` |
| `^` | Exponentiation (Power) | `$c[2^10]` → `1024` |

## Examples

### Basic calculations

```bdfd
$sendMessage[5 + 3 = $c[5+3]]
$sendMessage[100 / 4 = $c[100/4]]
$sendMessage[2^8 = $c[2^8]]
```

### Calculation with decimals

```bdfd
$enableDecimals
$sendMessage[22/7 = $c[22/7]]
```

### Levels system

```bdfd
$let[xp;$getVar[xp]]
$let[level;$c[$var[xp]/100]]
$sendMessage[Level: $round[$var[level];0]]
```

### Calculation with variables

```bdfd
$var[price;49]
$var[quantity;3]
$let[total;$c[$var[price]*$var[quantity]]]
$sendMessage[Total: $var[total]€]
```

## Notes

- `$c[]` is strictly identical to `$calculate[]` — just shorter.
- Without `$enableDecimals`, the results are rounded.
- Supports parentheses for priorities: `$c[(2+3)*4]` → `20`.
