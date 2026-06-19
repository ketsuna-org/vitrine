---
layout: doc
title: $divide[]
translation_key: docs
category: "Math & Text"
function_name: divide
syntax: $divide[a;b]
description: Divise la first value par la second (a / b). If the diviseur est 0, retourne 0 instead of produire an error.
---

# $divide[]

The `$divide[]` function effectue une division : `a / b`. It is protégée contre la division par zéro : instead of produire an error, elle retourne simply `0`.

## Syntax

```
$divide[a;b]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `a`       | number | Yes         | Le dividende (numérateur).       |
| `b`       | number | Yes         | Le diviseur (dénominateur).      |

## Behavior

- Returns the quotient `a / b`.
- The result can be a namebre decimal.
- **Si `b = 0`, retourne `0`** without générer error. This is une protection intégrée.

## Examples

**Division simple :**
```
$divide[10;2]
→ 5
```

**Result decimal :**
```
$divide[10;3]
→ 3.333333...
```

**Division par zéro (protégée) :**
```
$divide[42;0]
→ 0
```

**Calcul of moyenne :**
```
$divide[$sum[12;15;18];3]
→ 15
```

## Notes

- La protection contre la division par zéro évite les crashs accidentels, mais warning: `0` can be un result légitime or a indicateur error according to the context.
- Pour un contrôthe most fin, use `$calculate[a / b]` (qui peut se comporter différemment).
