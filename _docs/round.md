---
layout: doc
title: $round[]
translation_key: docs
category: "Math & Text"
function_name: round
syntax: $round[value]
description: Rounds a number to the nearest integer. Values ending in .5 are rounded up or according to banker's rounding depending on the implementation.
---

# $round[]

The function `$round[]` rounds a number to the nearest integer according to standard rounding rules.

## Syntax

```
$round[value]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `value`  | number | Yes         | The number to round.            |

## Behavior

- If the decimal part is **strictly less than .5**: rounds down.
- If the decimal part is **greater than or equal to .5**: rounds up.
- For an integer: returns the integer itself.

## Examples

**Rounding up:**
```
$round[3.5]
→ 4

$round[3.6]
→ 4

$round[3.9]
→ 4
```

**Rounding down:**
```
$round[3.4]
→ 3

$round[3.1]
→ 3
```

**Negative number:**
```
$round[-3.4]
→ -3

$round[-3.6]
→ -4
```

## Comparison: floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*The exact behavior for values ending in `.5` may depend on the underlying Java implementation (`Math.round`).

## Notes

- The result is always an integer (in the form of a string).
- Use `$floor[]` to always round down, and `$ceil[]` to always round up.
- For finer control (number of decimal places), use `$calculate[]`.
