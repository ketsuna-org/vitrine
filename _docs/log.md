---
layout: doc
title: $log[]
translation_key: docs
category: "Math & Text"
function_name: log
syntax: $log[value]
description: Calculates the natural logarithm (base e) of a number.
---

# $log[]

The function `$log[]` calculates the **natural logarithm** (denoted as `ln`), which is the logarithm in base `e` (≈ 2.71828).

## Syntax

```
$log[value]
```

## Parameters

| Parameter | Type   | Required | Description                                        |
|-----------|--------|-------------|----------------------------------------------------|
| `value`  | number | Yes         | The number whose logarithm to calculate. Must be > 0. |

## Behavior

- Returns the natural logarithm of the value as a decimal number (double precision).
- `$log[1]` → `0` (because e^0 = 1).
- `$log[e]` → `1` (because e^1 = e).
- For `0` or negative numbers, the behavior is undefined (may return `-Infinity`, `NaN` or generate an error).

## Examples

**Logarithm of 1:**
```
$log[1]
→ 0
```

**Logarithm of e (approx.):**
```
$log[2.718281828]
→ ~1
```

**Logarithm of a large number:**
```
$log[1000]
→ 6.907755...
```

**Logarithm of a fraction:**
```
$log[0.5]
→ -0.693147...
```

## Notes

- This is the **natural** logarithm (base e), not the base 10 logarithm.
- For base 10 logarithm, use inside `$calculate[]`: `$calculate[log10(value)]`.
- For a logarithm in an arbitrary base, use the change of base formula: `log_b(a) = ln(a) / ln(b)`, which translates to `$calculate[log(a) / log(b)]`.
- The inverse function is exponential: `$calculate[exp(value)]`.
- The precision matches that of a Java `double` (~15 significant digits).
