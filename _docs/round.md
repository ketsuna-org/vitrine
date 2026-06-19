---
layout: doc
title: $round[]
translation_key: docs
category: "Math & Text"
function_name: round
syntax: $round[value]
description: Arrondit un number to l'integer le plus proche. The values to.5 sont arrondies vers le haut or according to l'arrondi bancaire according to l'implémentation.
---

# $round[]

The function `$round[]` arrondit un number to l'integer le plus proche according to les règles of arrondi standard.

## Syntax

```
$round[value]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `value`  | number | Yes         | The namebre to arrondir.            |

## Behavior

- Si la partie decimale est **strictement inférieure to.5** : arrondi vers le bas.
- Si la partie decimale est **supérieure or égale to.5** : arrondi vers le haut.
- Pour un integer : retourne l'integer lui-même.

## Examples

**Arrondi vers le haut :**
```
$round[3.5]
→ 4

$round[3.6]
→ 4

$round[3.9]
→ 4
```

**Arrondi vers le bas :**
```
$round[3.4]
→ 3

$round[3.1]
→ 3
```

**Number négatif :**
```
$round[-3.4]
→ -3

$round[-3.6]
→ -4
```

## Compareason floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*Le comportement exact for the values to `.5` peut dépendre of l'implémentation Java sous-jacente (`Math.round`).

## Notes

- The result est toudays un integer (sous forme of string).
- Utilisez `$floor[]` pour toudays round vers le bas, `$ceil[]` pour toudays round vers le haut.
- Pour un controle plus fin (number of decimales), utilisez `$calculate[]`.
