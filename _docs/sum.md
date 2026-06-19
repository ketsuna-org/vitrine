---
layout: doc
title: $sum[]
translation_key: docs
category: "Math & Text"
function_name: sum
syntax: $sum[value1;value2;...]
description: Calculates the somme of all values fournies.
---

# $sum[]

The function `$sum[]` additionne all values numériques qui lui sont passées. Elle est variadique, ce qui signifie qu'elle accepte un number illimité of arguments.

## Syntax

```
$sum[value1;value2;...]
```

## Parameters

| Parameter | Type   | Required | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `values` | number | Yes         | List of values numériques separatedes par `;`. Variadique. |

## Behavior

- Additionne all values in the ordre où they are fournies.
- Si noe value is notsée, retourne `0`.
- Les values non numériques sont ignorées or convertedes en `0` according to the context.
- Supports thes numbers décimaux.

## Examples

**Somme simple :**
```
$sum[5;10;15]
→ 30
```

**Avec a single value :**
```
$sum[42]
→ 42
```

**Sans argument :**
```
$sum[]
→ 0
```

**Dans un context pratique (total of un panier) :**
```
$sum[$getVar[item1];$getVar[item2];$getVar[item3]]
```

## Notes

- The result est toudays une string of becauseactères représentant un number.
- Pour opérations plus complexs, utilisez `$calculate[]`.
- Les points-virgules `;` sont requireds like separators.
