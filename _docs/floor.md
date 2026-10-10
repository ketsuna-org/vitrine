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
- Exactly one argument is required. A value that is not a finite number (text, empty) raises the error "Expected a finite number in argument 1.".

## Examples

### Rounding Decimals Down

```bdfd
$title[Math: Floor Function]
$description[Original value: `3.9`
Rounded down: **$floor[3.9]**]
$addField[Negative Value;$floor[-3.1];yes]
$addField[Integer;$floor[5];yes]
$color[#5865F2]
```
## Comparison floor / ceil / round

| Value | $floor[] | $ceil[] | $round[] |
|--------|----------|---------|----------|
| `3.2`  | `3`      | `4`     | `3`      |
| `3.5`  | `3`      | `4`     | `4`      |
| `3.9`  | `3`      | `4`     | `4`      |
| `-3.2` | `-4`     | `-3`    | `-3`     |
| `-3.5` | `-4`     | `-3`    | `-3`*    |

*`$round[]` rounds a value ending in `.5` toward positive infinity: `$round[3.5]` → `4`, `$round[-3.5]` → `-3`.

## Notes

- The result is an integer, returned as text (it is not affected by `$enableDecimals`).
- Useful for calculations of pagination, levels, or any situation requiring an integer.
