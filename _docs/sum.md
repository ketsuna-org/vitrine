---
layout: doc
title: $sum[]
translation_key: docs
category: "Math & Text"
function_name: sum
syntax: $sum[value1;value2;...]
description: Calcule la somme de toutes les valeurs fournies.
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
