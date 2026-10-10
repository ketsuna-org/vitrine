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
| `value`  | number | Yes         | The number to round up. Exactly one argument; surrounding spaces are ignored. Text that is not a finite number (or an empty value) raises `Expected a finite number in argument 1.` |

## Behavior

- For a positive number: rounds up to the next integer if there is any decimal part. `$ceil[3.1]` → `4`.
- For a negative number: rounds up toward zero (less negative). `$ceil[-3.9]` → `-3`.
- For an integer: returns the integer itself.

## Examples

### Rounding Decimals Up

```bdfd
$title[Math: Ceiling Function]
$description[Original value: `3.1`
Rounded up: **$ceil[3.1]**]
$addField[Negative Value;$ceil[-3.9];yes]
$addField[Integer;$ceil[5];yes]
$color[#5865F2]
```
## Comparison of floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*`$round[]` rounds halves up (toward positive infinity): `2.5` gives `3`, `-2.5` gives `-2`, `-3.5` gives `-3`. All the values of the table were run against the engine.

## Notes

- The result is an integer written as text (`$ceil[-0.5]` gives `0`).
- Useful for the number of pages needed, but the division must keep its decimals: without `$enableDecimals[yes]`, `$divide[]` and `$calculate[]` have already rounded their result to an integer, so `$ceil[$divide[12;5]]` gives `2`, and `3` once `$enableDecimals[yes]` is set before it.
