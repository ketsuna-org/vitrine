---
layout: doc
title: $floor[]
translation_key: docs
category: "Math & Text"
function_name: floor
syntax: $floor[value]
description: Arrondit un number à l'integer inférieur (troncature vers le bas).
---

# $floor[]

The function `$floor[]` retourne le plus grand integer inférieur or égal à the value data. Elle « descend » toudays vers l'integer inférieur.

## Syntax

```
$floor[value]
```

## Parameters

| Parameter | Type   | Required | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `value`  | number | Yes         | The namebre à arrondir vers le bas.      |

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

*Le comportement exact de `$round[]` for the values à `.5` peut dépendre de l'implémentation.

## Notes

- The result est toudays un integer (sous forme de string).
- Utile for the calculs de pagination, de levelx, or toute situation nécessitant un integer.
