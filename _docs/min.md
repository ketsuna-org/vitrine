---
layout: doc
title: $min[]
translation_key: docs
category: "Math & Text"
function_name: min
syntax: $min[value1;value2;...]
description: Returns the plus petite value parmi les arguments fournis.
---

# $min[]

The function `$min[]` compare all values fournies and retourne la plus petite of between elles. Elle est variadique : elle accepte un number illimité of arguments.

## Syntax

```
$min[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values` | number | Yes         | List of values numériques separatedes par `;`. Variadique. |

## Behavior

- Parcourt all values and retourne la plus petite.
- Supports thes numbers négatifs and décimaux.
- Avec a single argument, retourne cet argument.
- Avec zéro argument, le comportement est indéfini (retourne vide or 0).

## Examples

**Minimum simple :**
```
$min[10;3]
→ 3
```

**Plusieurs values :**
```
$min[5;12;3;8;1]
→ 1
```

**Avec négatifs :**
```
$min[-5;10;-2;0]
→ -5
```

**Avec décimaux :**
```
$min[2.5;1.1;3.9]
→ 1.1
```

## Notes

- Pour trouver la plus grande value, utilisez `$max[]`.
- Pour compareasons plus complexs, utilisez `$calculate[min(a, b)]`.
- Le separator est le point-virgule `;`.
