---
layout: doc
title: $ceil[]
translation_key: docs
category: "Math & Text"
function_name: ceil
syntax: $ceil[value]
description: Arrondit a namebre to l'integer supérieur (troncature vers le haut).
---

# $ceil[]

The `$ceil[]` function retourne the most petit integer supérieur or égal to the value data. Elle « monte » toudays vers l'integer supérieur.

## Syntax

```
$ceil[value]
```

## Parameters

| Parameter | Type   | Required | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `value`  | number | Yes         | The namebre to round vers le haut.     |

## Behavior

- Pour a namebre positif : monte to l'integer supérieur dès qu'there are une partie decimale. `$ceil[3.1]` → `4`.
- Pour a namebre négatif : monte vers l'integer supérieur (moins négatif). `$ceil[-3.9]` → `-3`.
- Pour an integer : returns the integer lui-même.

## Examples

**Number positif :**
```
$ceil[3.1]
→ 4

$ceil[3.9]
→ 4
```

**Number négatif :**
```
$ceil[-3.9]
→ -3

$ceil[-3.1]
→ -3
```

**Integer :**
```
$ceil[5]
→ 5
```

## Compareason floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*Le behavior exact of `$round[]` for values to `.5` peut dépendre of l'implémentation.

## Notes

- The result est toudays an integer (sous forme of string).
- Utile when vous avez besoin of « l'integer of after », par example to calculate a namebre of pages nécessaires.
