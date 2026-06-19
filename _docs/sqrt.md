---
layout: doc
title: $sqrt[]
translation_key: docs
category: "Math & Text"
function_name: sqrt
syntax: $sqrt[value]
description: Calcule la racine carrée d'un nombre.
parameters:
  - name: value
    type: number
    required: true
    description: Le nombre dont on veut la racine carrée. Doit être positif ou nul.
returns:
  type: string (number)
  description: La racine carrée de la valeur, sous forme de nombre décimal (double).
related:
  - log
  - calculate
  - pow
examples:
  - title: Racine carrée simple
    code: |
      $sqrt[16]
  - title: Racine carrée non entière
    code: |
      $sqrt[2]
  - title: Racine carrée de zéro
    code: |
      $sqrt[0]
---

# $sqrt[]

La fonction `$sqrt[]` calcule la racine carrée d'un nombre positif ou nul.

## Syntaxe

```
$sqrt[valeur]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                                    |
|-----------|--------|-------------|------------------------------------------------|
| `valeur`  | number | Oui         | Le nombre dont on veut la racine carrée. ≥ 0.  |

## Comportement

- Retourne la racine carrée de la valeur sous forme de nombre décimal (double précision).
- Pour les carrés parfaits, le résultat est un entier : `$sqrt[16]` → `4`.
- Pour les autres valeurs, le résultat est un nombre décimal : `$sqrt[2]` → `1.4142135...`.
- Pour `0`, retourne `0`.
- Pour les nombres négatifs, le comportement est indéfini (peut retourner `NaN` ou une erreur).

## Exemples

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

- Ne pas utiliser avec des nombres négatifs.
- Pour la puissance (carré), utilisez `$calculate[value^2]` ou `$multi[value;value]`.
- Pour d'autres racines (cubique, etc.), utilisez `$calculate[value^(1/3)]`.
- La précision est celle d'un `double` Java (~15 chiffres significatifs).
