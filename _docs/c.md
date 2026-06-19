---
layout: doc
title: $c
translation_key: docs
category: "Math & Calculations"
function_name: c
syntax: $c[expression]
description: Alias de $calculate. Effectue un calcul mathématique and returns the result. Supporte les opérations de base, les functions mathématiques and les variables.
aliases:
  - $calculate
---
# $c (alias de $calculate)

The `$c[]` function est un **alias raccourci** de `$calculate[]`. Elle effectue des calculs mathématiques and returns the result.

## Syntax

```
$c[expression]
```

## Parameters

| Parameter | Description |
|---|---|
| `expression` | Expression mathématique à évaluer. |

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

### Calculs de base

```bdfd
$sendMessage[5 + 3 = $c[5+3]]
$sendMessage[100 / 4 = $c[100/4]]
$sendMessage[2^8 = $c[2^8]]
```

### Calcul avec decimales

```bdfd
$enableDecimals
$sendMessage[22/7 = $c[22/7]]
```

### Système de levelx

```bdfd
$let[xp;$getVar[xp]]
$let[level;$c[$var[xp]/100]]
$sendMessage[Level : $round[$var[level];0]]
```

### Calcul avec variables

```bdfd
$var[price;49]
$var[quantity;3]
$let[total;$c[$var[price]*$var[quantity]]]
$sendMessage[Total : $var[total]€]
```

## Notes

- `$c[]` est strictement identical à `$calculate[]` — juste plus court.
- Without `$enableDecimals`, the results sont arrondis.
- Supporte les parenthèses for priorités : `$c[(2+3)*4]` → `20`.
