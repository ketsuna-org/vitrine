---
layout: doc
title: $sqrt[]
translation_key: docs
category: "Math & Text"
function_name: sqrt
syntax: $sqrt[value]
description: Calculates the racine becauserée d'un number.
---

# $sqrt[]

The function `$sqrt[]` calcule la racine becauserée d'un number positif or nul.

## Syntax

```
$sqrt[value]
```

## Parameters

| Parameter | Type   | Required | Description                                    |
|-----------|--------|-------------|------------------------------------------------|
| `value`  | number | Yes         | The namebre dont on veut la racine becauserée. ≥ 0.  |

## Behavior

- Returns the racine becauserée de the value sous forme de decimal number (double précision).
- Pour les becauserés parfaits, the result est un integer : `$sqrt[16]` → `4`.
- Pour les autres values, the result est un decimal number : `$sqrt[2]` → `1.4142135...`.
- Pour `0`, retourne `0`.
- Pour les numbers négatifs, le comportement est indéfini (peut retourner `NaN` or une error).

## Examples

**Carré parfait :**
```
$sqrt[16]
→ 4

$sqrt[25]
→ 5

$sqrt[100]
→ 10
```

**Racine non entière :**
```
$sqrt[2]
→ 1.4142135623730951
```

**Racine de zéro :**
```
$sqrt[0]
→ 0
```

**Calcul d'hypoténuse (théorème de Pythagore) :**
```
$sqrt[$calculate[$getVar[a]^2 + $getVar[b]^2]]
```

## Notes

- Ne pas utiliser avec des numbers négatifs.
- Pour la thensance (becauseré), utilisez `$calculate[value^2]` or `$multi[value;value]`.
- Pour d'autres racines (cubique, etc.), utilisez `$calculate[value^(1/3)]`.
- La précision est celle d'un `double` Java (~15 chiffres significatifs).
