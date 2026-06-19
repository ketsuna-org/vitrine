---
layout: doc
title: $sub[]
translation_key: docs
category: "Math & Text"
function_name: sub
syntax: $sub[a;b]
description: Soustrait la deuxième valeur de la première (a - b).
---

# $sub[]

La fonction `$sub[]` effectue une soustraction entre deux valeurs : `a - b`.

## Syntaxe

```
$sub[a;b]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                        |
|-----------|--------|-------------|------------------------------------|
| `a`       | number | Oui         | La valeur de départ (minuend).     |
| `b`       | number | Oui         | La valeur à soustraire (subtrahend). |

## Comportement

- Retourne `a - b`.
- Le résultat peut être négatif.
- Supporte les nombres décimaux.
- Si les valeurs ne sont pas numériques, le comportement est indéfini.

## Exemples

**Soustraction simple :**
```
$sub[10;3]
→ 7
```

**Résultat négatif :**
```
$sub[5;10]
→ -5
```

**Avec des décimales :**
```
$sub[10.5;3.2]
→ 7.3
```

**Calcul de bénéfice :**
```
$sub[$getVar[revenu];$getVar[depense]]
```

## Notes

- Seulement deux arguments sont acceptés. Pour soustraire plusieurs valeurs, chaînez les appels : `$sub[$sub[a;b];c]` ou utilisez `$calculate[a - b - c]`.
- Le séparateur est le point-virgule `;`.
