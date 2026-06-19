---
layout: doc
title: $c
translation_key: docs
category: "Math & Calculations"
function_name: c
syntax: $c[expression]
description: Alias de $calculate. Effectue un calcul mathématique et retourne le résultat. Supporte les opérations de base, les fonctions mathématiques et les variables.
parameters:
  - name: expression
    description: L'expression mathématique à évaluer (+, -, *, /, %, ^, sqrt, abs, etc.).
returns:
  - type: number (string)
    description: Le résultat du calcul.
aliases:
  - $calculate
related:
  - $calculate
  - $round
  - $enableDecimals
examples:
  - description: Calcul simple
    code: $sendMessage[2 + 2 = $c[2+2]]
---
# $c (alias de $calculate)

La fonction `$c[]` est un **alias raccourci** de `$calculate[]`. Elle effectue des calculs mathématiques et retourne le résultat.

## Syntaxe

```
$c[expression]
```

## Paramètres

| Paramètre | Description |
|---|---|
| `expression` | Expression mathématique à évaluer. |

## Opérateurs supportés

| Opérateur | Description | Exemple |
|---|---|---|
| `+` | Addition | `$c[2+3]` → `5` |
| `-` | Soustraction | `$c[10-4]` → `6` |
| `*` | Multiplication | `$c[6*7]` → `42` |
| `/` | Division | `$c[15/3]` → `5` |
| `%` | Modulo | `$c[10%3]` → `1` |
| `^` | Puissance | `$c[2^10]` → `1024` |

## Exemples

### Calculs de base

```bdfd
$sendMessage[5 + 3 = $c[5+3]]
$sendMessage[100 / 4 = $c[100/4]]
$sendMessage[2^8 = $c[2^8]]
```

### Calcul avec décimales

```bdfd
$enableDecimals
$sendMessage[22/7 = $c[22/7]]
```

### Système de niveaux

```bdfd
$let[xp;$getVar[xp]]
$let[level;$c[$var[xp]/100]]
$sendMessage[Niveau : $round[$var[level];0]]
```

### Calcul avec variables

```bdfd
$var[price;49]
$var[quantity;3]
$let[total;$c[$var[price]*$var[quantity]]]
$sendMessage[Total : $var[total]€]
```

## Notes

- `$c[]` est strictement identique à `$calculate[]` — juste plus court.
- Sans `$enableDecimals`, les résultats sont arrondis.
- Supporte les parenthèses pour les priorités : `$c[(2+3)*4]` → `20`.
