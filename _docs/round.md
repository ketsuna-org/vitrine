---
layout: doc
title: $round[]
translation_key: docs
category: "Math & Text"
function_name: round
syntax: $round[value]
description: Arrondit un number à l'integer le plus proche. The values à .5 sont arrondies vers le haut or selon l'arrondi bancaire selon l'implémentation.
---

# $round[]

The function `$round[]` arrondit un number à l'integer le plus proche selon les règles d'arrondi standard.

## Syntax

```
$round[value]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `value`  | number | Yes         | The namebre à arrondir.            |

## Behavior

- Si la partie decimale est **strictement inférieure à .5** : arrondi vers le bas.
- Si la partie decimale est **supérieure or égale à .5** : arrondi vers le haut.
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

*Le comportement exact for the values à `.5` peut dépendre de l'implémentation Java sous-jacente (`Math.round`).

## Notes

- The result est toudays un integer (sous forme de string).
- Utilisez `$floor[]` pour toudays arrondir vers le bas, `$ceil[]` pour toudays arrondir vers le haut.
- Pour un controle plus fin (number de decimales), utilisez `$calculate[]`.
