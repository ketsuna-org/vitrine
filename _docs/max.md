---
layout: doc
title: $max[]
translation_key: docs
category: "Math & Text"
function_name: max
syntax: $max[value1;value2;...]
description: Returns the plus grande value parmi les arguments fournis.
---

# $max[]

The function `$max[]` compare all values fournies and retourne la plus grande d'between elles. Elle est variadique : elle accepte un number illimité d'arguments.

## Syntax

```
$max[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values` | number | Yes         | List de values numériques separatedes par `;`. Variadique. |

## Behavior

- Parcourt all values and retourne la plus grande.
- Supporte les numbers négatifs and décimaux.
- Avec a single argument, retourne cet argument.
- Avec zéro argument, le comportement est indéfini (retourne vide or 0).

## Examples

**Maximum simple :**
```
$max[10;3]
→ 10
```

**Plusieurs values :**
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

- Pour trouver la plus petite value, utilisez `$min[]`.
- Pour des compareasons plus complexs, utilisez `$calculate[max(a, b)]`.
- Le separator est le point-virgule `;`.
