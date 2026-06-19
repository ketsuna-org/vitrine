---
layout: doc
title: $c
translation_key: docs
category: "Math & Calculations"
function_name: c
syntax: $c[expression]
description: Alias of $calculate. Effectue un calcul mathématique and returns the result. Supports thes opérations of base, les functions mathématiques and les variables.
aliases:
  - $calculate
---
# $c (alias of $calculate)

The `$c[]` function est un **alias raccourci** of `$calculate[]`. Elle effectue calculs mathématiques and returns the result.

## Syntax

```
$c[expression]
```

## Parameters

| Parameter | Description |
|---|---|
| `expression` | Expression mathématique to évaluer. |

## Opérateurs supportés

| Opérateur | Description | Example |
|---|---|---|
| `+` | Addition | `$c[2+3]` → `5` |
| `-` | Soustraction | `$c[10-4]` → `6` |
| `*` | Multiplication | `$c[6*7]` → `42` |
| `/` | Division | `$c[15/3]` → `5` |
| `%` | Modulo | `$c[10%3]` → `1` |
| `^` | Puissance | `$c[2^10]` → `1024` |

## Examples

### Calculs of base

```bdfd
$sendMessage[5 + 3 = $c[5+3]]
$sendMessage[100 / 4 = $c[100/4]]
$sendMessage[2^8 = $c[2^8]]
```

### Calcul with decimales

```bdfd
$enableDecimals
$sendMessage[22/7 = $c[22/7]]
```

### Système of levelx

```bdfd
$let[xp;$getVar[xp]]
$let[level;$c[$var[xp]/100]]
$sendMessage[Level : $round[$var[level];0]]
```

### Calcul with variables

```bdfd
$var[price;49]
$var[quantity;3]
$let[total;$c[$var[price]*$var[quantity]]]
$sendMessage[Total : $var[total]€]
```

## Notes

- `$c[]` est strictement identical to `$calculate[]` — juste plus court.
- Without `$enableDecimals`, the results sont arrondis.
- Supports thes parenthèses for priorités : `$c[(2+3)*4]` → `20`.
