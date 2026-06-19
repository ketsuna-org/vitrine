---
layout: doc
title: $multi[]
translation_key: docs
category: "Math & Text"
function_name: multi
syntax: $multi[a;b]
description: Multiplie deux valeurs (a * b).
parameters:
  - name: a
    type: number
    required: true
    description: Le premier facteur.
  - name: b
    type: number
    required: true
    description: Le second facteur.
returns:
  type: string (number)
  description: Le produit a * b.
related:
  - calculate
  - sum
  - sub
  - divide
examples:
  - title: Multiplication simple
    code: |
      $multi[6;7]
  - title: Avec des décimales
    code: |
      $multi[2.5;4]
  - title: Avec des variables
    code: |
      $multi[$getVar[prix];$getVar[quantite]]
---

# $multi[]

La fonction `$multi[]` multiplie deux valeurs entre elles : `a * b`.

> **Note importante :** Cette fonction est purement mathématique. Elle ne doit pas être confondue avec une condition multi-cas (if/switch). Pour les branchements conditionnels, utilisez `$if[]`, `$elseif[]` et `$else[]`.

## Syntaxe

```
$multi[a;b]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description            |
|-----------|--------|-------------|------------------------|
| `a`       | number | Oui         | Le premier facteur.    |
| `b`       | number | Oui         | Le second facteur.     |

## Comportement

- Retourne le produit `a * b`.
- Supporte les nombres décimaux.
- Si l'un des arguments est `0`, le résultat est `0`.

## Exemples

**Multiplication simple :**
```
$multi[6;7]
→ 42
```

**Avec des décimales :**
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

- Seulement deux arguments. Pour multiplier plus de valeurs, chaînez : `$multi[$multi[a;b];c]` ou utilisez `$calculate[a * b * c]`.
- Le séparateur est le point-virgule `;`.
