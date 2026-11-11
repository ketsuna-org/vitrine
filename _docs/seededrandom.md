---
layout: doc
title: $seededRandom
translation_key: docs
category: "Math & Text"
function_name: seededRandom
syntax: $seededRandom[seed;min;max]
description: "Random integer that is the same for the same seed (procedural generation)."
---

# $seededRandom

Random integer that is the same for the same seed (procedural generation).

## Syntax

```
$seededRandom[seed;min;max]
```

## Parameters

| Parameter | Description |
|---|---|
| `seed` | Any text. |
| `min` | Lower bound (integer, inclusive). |
| `max` | Upper bound (integer, inclusive, not below the minimum). |

## Return Value

- string.

## Usage

```
$seededRandom[x;5;5] → "5"
$seededRandom[world:3:-2;0;99] → always the same number
```

## Example

```bdfd
$seededRandom[chunk:$getVar[cx]:$getVar[cy];0;4]
```

## Notes

JavaScript: `bc.math.seededRandom(seed, min, max)`. Built on SHA-256, so it is stable across runners.
