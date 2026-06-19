---
layout: doc
title: $ceil[]
translation_key: docs
category: "Math & Text"
function_name: ceil
syntax: $ceil[value]
description: Rounds a number up to the next integer.
---

# $ceil[]

The `$ceil[]` function returns the smallest integer greater than or equal to the given value. It always rounds up to the next integer.

## Syntax

```
$ceil[value]
```

## Parameters

| Parameter | Type   | Required | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `value`  | number | Yes         | The number to round up.     |

## Behavior

- For a positive number: rounds up to the next integer if there is any decimal part. `$ceil[3.1]` → `4`.
- For a negative number: rounds up toward zero (less negative). `$ceil[-3.9]` → `-3`.
- For an integer: returns the integer itself.

## Examples

**Positive number:**
```
$ceil[3.1]
→ 4

$ceil[3.9]
→ 4
```

**Negative number:**
```
$ceil[-3.9]
→ -3

$ceil[-3.1]
→ -3
```

**Integer:**
```
$ceil[5]
→ 5
```

## Comparison of floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*The exact behavior of `$round[]` for values ending in `.5` may depend on the implementation.

## Notes

- The result is always an integer (in the form of a string).
- Useful when you need the "next integer," for example, to calculate the number of pages needed.
