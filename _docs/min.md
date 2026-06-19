---
layout: doc
title: $min[]
translation_key: docs
category: "Math & Text"
function_name: min
syntax: $min[value1;value2;...]
description: Retourne la plus petite valeur parmi les arguments fournis.
parameters:
  - name: values
    type: number
    required: true
    description: Liste de valeurs numériques séparées par des points-virgules. Variadique.
returns:
  type: string (number)
  description: La plus petite valeur de la liste.
related:
  - max
  - calculate
examples:
  - title: Minimum de deux nombres
    code: |
      $min[10;3]
  - title: Minimum de plusieurs nombres
    code: |
      $min[5;12;3;8;1]
  - title: Avec des variables
    code: |
      $min[$getVar[a];$getVar[b];$getVar[c]]
  - title: Avec des décimaux
    code: |
      $min[2.5;1.1;3.9]
---

# $min[]

La fonction `$min[]` compare toutes les valeurs fournies et retourne la plus petite d'entre elles. Elle est variadique : elle accepte un nombre illimité d'arguments.

## Syntaxe

```
$min[valeur1;valeur2;...]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `valeurs` | number | Oui         | Liste de valeurs numériques séparées par `;`. Variadique. |

## Comportement

- Parcourt toutes les valeurs et retourne la plus petite.
- Supporte les nombres négatifs et décimaux.
- Avec un seul argument, retourne cet argument.
- Avec zéro argument, le comportement est indéfini (retourne vide ou 0).

## Exemples

**Minimum simple :**
```
$min[10;3]
→ 3
```

**Plusieurs valeurs :**
```
$min[5;12;3;8;1]
→ 1
```

**Avec des négatifs :**
```
$min[-5;10;-2;0]
→ -5
```

**Avec des décimaux :**
```
$min[2.5;1.1;3.9]
→ 1.1
```

## Notes

- Pour trouver la plus grande valeur, utilisez `$max[]`.
- Pour des comparaisons plus complexes, utilisez `$calculate[min(a, b)]`.
- Le séparateur est le point-virgule `;`.
