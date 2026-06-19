---
layout: doc
title: $floor[]
translation_key: docs
category: "Math & Text"
function_name: floor
syntax: $floor[value]
description: Rounds a number down to the nearest integer.
---

# $floor[]

The `$floor[]` function returns the greatest integer less than or equal to the given value. It always rounds down to the lower integer.

## Syntax

```
$floor[value]
```

## Parameters

| Parameter | Type   | Required | Description                            |
|-----------|--------|-------------|----------------------------------------|
| `value`  | number | Yes         | The number to round down.      |

## Behavior

- For a positive number: removes the decimal part. `$floor[3.9]` → `3`.
- For a negative number: rounds down to the next lower integer (more negative). `$floor[-3.1]` → `-4`.
- For an integer: returns the integer itself.

## Examples

**Positive number:**
```
$floor[3.9]
→ 3

$floor[3.1]
→ 3
```

**Negative number:**
```
$floor[-3.1]
→ -4

$floor[-3.9]
→ -4
```

**Integer:**
```
$floor[5]
→ 5
```

## Comparison floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*The exact behavior of `$round[]` for values ending in `.5` may depend on the implementation.

## Notes

- The result is always an integer (as a string).
- Useful for calculations of pagination, levels, or any situation requiring an integer.
