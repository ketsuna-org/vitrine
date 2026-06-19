---
layout: doc
title: $ceil[]
translation_key: docs
category: "Math & Text"
function_name: ceil
syntax: $ceil[value]
description: Arrondit un nombre à l'entier supérieur (troncature vers le haut).
parameters:
  - name: value
    type: number
    required: true
    description: Le nombre à arrondir (peut être décimal).
returns:
  type: string (number)
  description: Le plus petit entier supérieur ou égal à la valeur.
related:
  - floor
  - round
  - calculate
examples:
  - title: Arrondi supérieur simple
    code: |
      $ceil[3.1]
  - title: Avec un entier
    code: |
      $ceil[5]
  - title: Nombre négatif
    code: |
      $ceil[-3.1]
---

# $ceil[]

La fonction `$ceil[]` retourne le plus petit entier supérieur ou égal à la valeur donnée. Elle « monte » toujours vers l'entier supérieur.

## Syntaxe

```
$ceil[valeur]
```

## Paramètres

| Paramètre | Type   | Obligatoire | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `valeur`  | number | Oui         | Le nombre à arrondir vers le haut.     |

## Comportement

- Pour un nombre positif : monte à l'entier supérieur dès qu'il y a une partie décimale. `$ceil[3.1]` → `4`.
- Pour un nombre négatif : monte vers l'entier supérieur (moins négatif). `$ceil[-3.9]` → `-3`.
- Pour un entier : retourne l'entier lui-même.

## Exemples

**Nombre positif :**
```
$ceil[3.1]
→ 4

$ceil[3.9]
→ 4
```

**Nombre négatif :**
```
$ceil[-3.9]
→ -3

$ceil[-3.1]
→ -3
```

**Entier :**
```
$ceil[5]
→ 5
```

## Comparaison floor / ceil / round

| Valeur | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*Le comportement exact de `$round[]` pour les valeurs à `.5` peut dépendre de l'implémentation.

## Notes

- Le résultat est toujours un entier (sous forme de chaîne).
- Utile quand vous avez besoin de « l'entier d'après », par exemple pour calculer un nombre de pages nécessaires.
