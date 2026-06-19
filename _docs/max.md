---
layout: doc
title: $max[]
translation_key: docs
category: "Math & Text"
function_name: max
syntax: $max[value1;value2;...]
description: Retourne la plus grande valeur parmi les arguments fournis.
parameters:
  - name: values
    type: number
    required: true
    description: Liste de valeurs numériques séparées par des points-virgules. Variadique.
returns:
  type: string (number)
  description: La plus grande valeur de la liste.
related:
  - min
  - calculate
examples:
  - title: Maximum de deux nombres
    code: |
      $max[10;3]
  - title: Maximum de plusieurs nombres
    code: |
      $max[5;12;3;8;1]
  - title: Avec des variables
    code: |
      $max[$getVar[a];$getVar[b];$getVar[c]]
  - title: Avec des décimaux
    code: |
      $max[2.5;1.1;3.9]
---

# $max[]

La fonction `$max[]` compare toutes les valeurs fournies et retourne la plus grande d'entre elles. Elle est variadique : elle accepte un nombre illimité d'arguments.

## Syntaxe

```
$max[valeur1;valeur2;...]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `valeurs` | number | Oui         | Liste de valeurs numériques séparées par `;`. Variadique. |

## Comportement

- Parcourt toutes les valeurs et retourne la plus grande.
- Supporte les nombres négatifs et décimaux.
- Avec un seul argument, retourne cet argument.
- Avec zéro argument, le comportement est indéfini (retourne vide ou 0).

## Exemples

**Maximum simple :**
```
$max[10;3]
→ 10
```

**Plusieurs valeurs :**
```
$max[5;12;3;8;1]
→ 12
```

**Avec des négatifs :**
```
$max[-5;10;-2;0]
→ 10
```

**Meilleur score :**
```
$max[$getVar[scoreJ1];$getVar[scoreJ2];$getVar[scoreJ3]]
```

## Notes

- Pour trouver la plus petite valeur, utilisez `$min[]`.
- Pour des comparaisons plus complexes, utilisez `$calculate[max(a, b)]`.
- Le séparateur est le point-virgule `;`.
