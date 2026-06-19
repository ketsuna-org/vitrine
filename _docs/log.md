---
layout: doc
title: $log[]
translation_key: docs
category: "Math & Text"
function_name: log
syntax: $log[value]
description: Calculates the logarithme naturel (base e) d'un number.
---

# $log[]

The function `$log[]` calcule le **logarithme naturel** (or logarithme népérien, noté `ln`), it is-à-dire le logarithme en base `e` (≈ 2.71828).

## Syntax

```
$log[value]
```

## Parameters

| Parameter | Type   | Required | Description                                        |
|-----------|--------|-------------|----------------------------------------------------|
| `value`  | number | Yes         | The namebre dont on veut le logarithme. Doit être > 0. |

## Behavior

- Returns the logarithme naturel de the value sous forme de decimal number (double précision).
- `$log[1]` → `0` (because e^0 = 1).
- `$log[e]` → `1` (because e^1 = e).
- Pour `0` or les numbers négatifs, le comportement est indéfini (peut retourner `-Infinity`, `NaN` or une error).

## Examples

**Logarithme de 1 :**
```
$log[1]
→ 0
```

**Logarithme de e (approx.) :**
```
$log[2.718281828]
→ ~1
```

**Logarithme d'un grand number :**
```
$log[1000]
→ 6.907755...
```

**Logarithme d'une fraction :**
```
$log[0.5]
→ -0.693147...
```

## Notes

- C'est le logarithme **naturel** (base e), pas le logarithme base 10.
- Pour le logarithme base 10, utilisez dans `$calculate[]` : `$calculate[log10(value)]`.
- Pour le logarithme dans une base arbitraire, utilisez la formule : `log_b(a) = ln(a) / ln(b)`, soit `$calculate[log(a) / log(b)]`.
- The function inverse est l'exponentielle : `$calculate[exp(value)]`.
- La précision est celle d'un `double` Java (~15 chiffres significatifs).
