---
layout: doc
title: $max[]
translation_key: docs
category: "Math & Text"
function_name: max
syntax: $max[value1;value2;...]
description: Retourne la plus grande valeur parmi les arguments fournis.
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
