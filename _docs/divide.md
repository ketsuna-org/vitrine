---
layout: doc
title: $divide[]
translation_key: docs
category: "Math & Text"
function_name: divide
syntax: $divide[a;b;(...)]
description: Divides the first value by the following ones, from left to right. A divisor equal to 0 raises an error.
---
# $divide[]

The `$divide[]` function divides the first value by each of the following values, from left to right: `$divide[a;b;c]` is `a / b / c`.

## Syntax

```
$divide[a;b;(...)]
```

## Parameters

| Parameter | Type   | Required | Description                      |
|-----------|--------|-------------|----------------------------------|
| `a`       | number | Yes         | The dividend (numerator).       |
| `b`       | number | Yes         | The divisor. Further divisors may follow, with no upper limit. |

At least two arguments are required. Every argument must be a number: an empty or non-numeric argument raises `Expected a finite number in argument N.` (for example `$divide[10;3;]`).

## Behavior

- Returns the quotient as text.
- With decimals disabled (the default) a non-integer result is rounded to the nearest integer, halves going up: `$divide[10;3]` gives `3`, `$divide[-7;2]` gives `-3`. With `$enableDecimals[yes]` the decimals are kept: `$divide[10;3]` gives `3.3333333333333335`.
- **A divisor equal to 0 raises the error `Cannot divide by zero.`** The function does not return `0` (`$divide[42;0]` is an error, and so is `$divide[0;0]`). Check the divisor with `$if` before dividing.
- Every divisor is checked, not only the first: `$divide[100;5;2;0]` fails too.

## Examples

### Division and Average Calculation

```bdfd
$enableDecimals[yes]
$title[Math: Division]
$description[Result of `10 / 2`: **$divide[10;2]**]
$addField[Decimal Result;$divide[10;3];yes]
$color[#5865F2]
```

### Guard against a zero divisor

```bdfd
$var[count;0]
$if[$var[count]==0]
  $sendMessage[Nothing to divide by.]
$else
  $sendMessage[Average: $divide[100;$var[count]]]
$endif
```

## Notes

- For an expression with several operators, use `$calculate[a / b]`. Division by zero is also an error there.
