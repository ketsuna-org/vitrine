---
layout: doc
title: $sub[]
translation_key: docs
category: "Math & Text"
function_name: sub
syntax: $sub[a;b]
description: Soustrait la twoième value de la first (a - b).
---

# $sub[]

The function `$sub[]` effectue une soustraction between two values : `a - b`.

## Syntax

```
$sub[a;b]
```

## Parameters

| Parameter | Type   | Required | Description                        |
|-----------|--------|-------------|------------------------------------|
| `a`       | number | Yes         | The value de départ (minuend).     |
| `b`       | number | Yes         | The value à soustraire (subtrahend). |

## Behavior

- Returns `a - b`.
- The result can be négatif.
- Supporte les numbers décimaux.
- Si les values are not numériques, le comportement est indéfini.

## Examples

**Soustraction simple :**
```
$sub[10;3]
→ 7
```

**Result négatif :**
```
$sub[5;10]
→ -5
```

**Avec des decimales :**
```
$sub[10.5;3.2]
→ 7.3
```

**Calcul de bénéfice :**
```
$sub[$getVar[revenu];$getVar[depense]]
```

## Notes

- Seulement two arguments sont acceptés. Pour soustraire several values, stringz les calls : `$sub[$sub[a;b];c]` or utilisez `$calculate[a - b - c]`.
- Le separator est le point-virgule `;`.
