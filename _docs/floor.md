---
layout: doc
title: $floor[]
translation_key: docs
category: "Math & Text"
function_name: floor
syntax: $floor[value]
description: Arrondit un number to l'integer inférieur (troncature vers le bas).
---

# $floor[]

The function `$floor[]` retourne le plus grand integer inférieur or égal to the value data. Elle « descend » toudays vers l'integer inférieur.

## Syntax

```
$floor[value]
```

## Parameters

| Parameter | Type   | Required | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `value`  | number | Yes         | The namebre to round vers le bas.      |

## Behavior

- Pour un number positif : deletes the partie decimale. `$floor[3.9]` → `3`.
- Pour un number négatif : descend vers l'integer inférieur (plus négatif). `$floor[-3.1]` → `-4`.
- Pour un integer : retourne l'integer lui-même.

## Examples

**Number positif :**
```
$floor[3.9]
→ 3

$floor[3.1]
→ 3
```

**Number négatif :**
```
$floor[-3.1]
→ -4

$floor[-3.9]
→ -4
```

**Integer :**
```
$floor[5]
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

*Le comportement exact of `$round[]` for the values to `.5` peut dépendre of l'implémentation.

## Notes

- The result est toudays un integer (sous forme of string).
- Utile for the calculs of pagination, of levelx, or toute situation nécessitant un integer.
