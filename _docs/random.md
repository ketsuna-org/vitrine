---
layout: doc
title: $random[]
translation_key: docs
category: "Math & Text"
function_name: random
syntax: $random[min;max]
description: Generates a random integer between min and max (inclusive). The value is evaluated at compile-time only.
---

# $random[]

The `$random[]` function generates a random integer between `min` and `max`, with both values being **inclusive**.

**Important:** This function is evaluated at **compile-time**, meaning the value is determined once when the code is compiled. It will not change if the code is executed multiple times without recompilation.

## Syntax

```
$random[min;max]
```

## Parameters

| Parameter | Description |
|-----------|-------------|
| `min` | The lower bound of the random range (inclusive). |
| `max` | The upper bound of the random range (inclusive). |

## Return Value

A random integer as a string, between `min` and `max` (inclusive bounds).

## Behavior

- Values are evaluated only once at the time of command compilation.
- Both `min` and `max` bounds are inclusive in the possible range.
- If `max` is less than `min`, the behavior may be unpredictable.

## Examples

### Random number between 1 and 100

```bdfd
$random[1;100]
```

### Dice roll

```bdfd
🎲 You rolled a **$random[1;6]**!
```

### Random selection in an embed

```bdfd
$title[Prize draw]
$description[The winning number is: **$random[1000;9999]**]
$footer[🎉 Congratulations to the winner!]
```

## Notes

- Use `$randomString[]` to generate random alphanumeric strings.
- Use `$randomText[]` to randomly choose from a list of text options.
