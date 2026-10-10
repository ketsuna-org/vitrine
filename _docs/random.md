---
layout: doc
title: $random[]
translation_key: docs
category: "Math & Text"
function_name: random
syntax: $random[(min;max)]
description: Generates a random number between min (inclusive) and max (exclusive); without arguments, a random digit from 0 to 9.
---

# $random[]

The `$random[]` function generates a random number between `min` (**inclusive**) and `max` (**exclusive**). It is evaluated each time it runs.

## Syntax

```
$random
$random[min;max]
```

The function accepts either **0 or 2 arguments**; one argument is refused.

## Parameters

| Parameter | Description |
|-----------|-------------|
| `min` | Optional (together with `max`). The lower bound of the random range (inclusive). |
| `max` | Optional (together with `min`). The upper bound of the random range (exclusive). It must be strictly greater than `min`. |

## Return Value

A random number as a string. Without arguments: an integer from 0 to 9. With `min` and `max`: an integer from `min` up to `max - 1` (or, if decimals are enabled with `$enableDecimals`, a decimal number in `[min, max)`).

## Behavior

- A new value is drawn each time the function is evaluated.
- `min` is inclusive and `max` is exclusive: `$random[1;7]` returns 1 to 6.
- Both bounds must be finite numbers with `max` greater than `min`; otherwise the error "Random requires increasing finite bounds." is raised.
- Without arguments, `$random` returns an integer from 0 to 9, or a decimal in `[0, 10)` when decimals are enabled with `$enableDecimals`.
- While decimals are disabled (default), bounds with a fractional part are rounded up and the range must still contain an integer.

## Examples

### Random number between 1 and 100

```bdfd
$random[1;101]
```

### Dice roll

```bdfd
🎲 You rolled a **$random[1;7]**!
```

### Random selection in an embed

```bdfd
$title[Prize draw]
$description[The winning number is: **$random[1000;10000]**]
$footer[🎉 Congratulations to the winner!]
```

## Notes

- Use `$randomString[]` to generate random alphanumeric strings.
- Use `$randomText[]` to randomly choose from a list of text options.
