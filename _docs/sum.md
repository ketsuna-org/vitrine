---
layout: doc
title: $sum[]
translation_key: docs
category: "Math & Text"
function_name: sum
syntax: $sum[value1;value2;...]
description: Calcule la somme de toutes les valeurs fournies.
parameters:
  - name: values
    type: string (number)
    required: true
    description: Liste de valeurs numériques séparées par des points-virgules. Accepte un nombre variable d'arguments.
returns:
  type: string (number)
  description: La somme de toutes les valeurs. Retourne "0" si aucun argument n'est fourni.
related:
  - calculate
  - sub
  - multi
  - divide
examples:
  - title: Somme de deux nombres
    code: |
      $sum[5;3]
  - title: Somme de plusieurs nombres
    code: |
      $sum[10;20;30;40]
  - title: Avec des variables
    code: |
      $sum[$getVar[a];$getVar[b];$getVar[c]]
  - title: Avec des décimales
    code: |
      $sum[1.5;2.3;3.7]
---

# $sum[]

La fonction `$sum[]` additionne toutes les valeurs numériques qui lui sont passées. Elle est variadique, ce qui signifie qu'elle accepte un nombre illimité d'arguments.

## Syntaxe

```
$sum[valeur1;valeur2;...]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                                              |
|-----------|--------|-------------|----------------------------------------------------------|
| `valeurs` | number | Oui         | Liste de valeurs numériques séparées par `;`. Variadique. |

## Comportement

- Additionne toutes les valeurs dans l'ordre où elles sont fournies.
- Si aucune valeur n'est passée, retourne `0`.
- Les valeurs non numériques sont ignorées ou converties en `0` selon le contexte.
- Supporte les nombres décimaux.

## Exemples

**Somme simple :**
```
$sum[5;10;15]
→ 30
```

**Avec une seule valeur :**
```
$sum[42]
→ 42
```

**Sans argument :**
```
$sum[]
→ 0
```

**Dans un contexte pratique (total d'un panier) :**
```
$sum[$getVar[item1];$getVar[item2];$getVar[item3]]
```

## Notes

- Le résultat est toujours une chaîne de caractères représentant un nombre.
- Pour des opérations plus complexes, utilisez `$calculate[]`.
- Les points-virgules `;` sont obligatoires comme séparateurs.
