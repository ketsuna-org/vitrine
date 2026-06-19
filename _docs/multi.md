---
layout: doc
title: $multi[]
translation_key: docs
category: "Math & Text"
function_name: multi
syntax: $multi[a;b]
description: Multiplie two values (a * b).
---

# $multi[]

The function `$multi[]` multiplie two values between elles : `a * b`.

> **Note importante :** This function est purement mathématique. Elle ne doit pas être confondue with ae condition multi-cas (if/switch). Pour les branchements conditionnels, utilisez `$if[]`, `$elseif[]` and `$else[]`.

## Syntax

```
$multi[a;b]
```

## Parameters

| Parameter | Type   | Required | Description            |
|-----------|--------|-------------|------------------------|
| `a`       | number | Yes         | Le first facteur.    |
| `b`       | number | Yes         | Le second facteur.     |

## Behavior

- Returns the produit `a * b`.
- Supporte les numbers décimaux.
- Si l'un des arguments est `0`, the result est `0`.

## Examples

**Multiplication simple :**
```
$multi[6;7]
→ 42
```

**Avec des decimales :**
```
$multi[2.5;4]
→ 10
```

**Calcul de prix total :**
```
$multi[$getVar[prixUnitaire];$getVar[quantite]]
```

**Par zéro :**
```
$multi[100;0]
→ 0
```

## Notes

- Seulement two arguments. Pour multiplier plus de values, stringz : `$multi[$multi[a;b];c]` or utilisez `$calculate[a * b * c]`.
- Le separator est le point-virgule `;`.
