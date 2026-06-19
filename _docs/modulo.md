---
layout: doc
title: $modulo[]
translation_key: docs
category: "Math & Text"
function_name: modulo
syntax: $modulo[a;b]
description: Calculates the reste of la division euclidienne of a par b (a % b). Si b = 0, retourne 0.
---

# $modulo[]

The function `$modulo[]` retourne le reste of la division euclidienne of `a` par `b` (opération modulo : `a % b`). Comme `$divide[]`, it is protégée contre la division par zéro.

## Syntax

```
$modulo[a;b]
```

## Parameters

| Parameter | Type   | Required | Description        |
|-----------|--------|-------------|--------------------|
| `a`       | number | Yes         | Le dividende.      |
| `b`       | number | Yes         | Le diviseur.       |

## Behavior

- Returns the reste of `a` divisé par `b`.
- Si `b = 0`, retourne `0` (protection intégrée).
- The result a toudays le even ifgne que le dividende `a`.

## Examples

**Modulo simple :**
```
$modulo[17;5]
→ 2
```

**Détection pair/impair :**
```
$modulo[$getVar[number];2]
→ 0 si pair, 1 si impair
```

**Avec multiple exacts :**
```
$modulo[20;5]
→ 0
```

**Modulo par zéro (protégé) :**
```
$modulo[42;0]
→ 0
```

## Cas of usage courants

- Vérifier if a number est divisible par un autre.
- Alterner comportements (pair/impair).
- Boucler une list (index % taille).
- Calculer cycles (all N itérations).

## Notes

- Pour les numbers négatifs, le comportement suit la définition mathématique standard : `$modulo[-17;5]` → `-2`.
