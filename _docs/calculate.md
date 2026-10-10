---
layout: doc
title: $calculate[]
translation_key: docs
category: "Math & Text"
function_name: calculate
syntax: $calculate[expression]
description: "Evaluates an arithmetic expression with + - * / % ^ and parentheses. Not supported: functions (sin, sqrt...), comparisons, variables."
---
# $calculate[]

The `$calculate[]` function evaluates an **arithmetic expression** and returns the result as text.

## Syntax

```
$calculate[expression]
```

## Parameters

| Parameter   | Type   | Required | Description                                                    |
|-------------|--------|-------------|----------------------------------------------------------------|
| `expression`| string | Yes         | The arithmetic expression to evaluate (exactly one argument). Every whitespace character is removed before parsing. |

## Supported Operators

| Operator | Description       | Example           |
|-----------|-------------------|--------------------|
| `+`       | Addition          | `5 + 3` → `8`     |
| `-`       | Subtraction       | `10 - 4` → `6`    |
| `*`       | Multiplication    | `6 * 7` → `42`    |
| `/`       | Division          | `15 / 3` → `5`    |
| `%`       | Remainder (keeps the sign of the left operand) | `17 % 5` → `2`, `-7 % 3` → `-1` |
| `^` or `**` | Exponentiation (right to left: `2^3^2` = `512`) | `2 ^ 8` → `256`   |

Also supported: parentheses, a leading `+` or `-` (`-3+1`, `2*-3`) and decimal numbers (`1.5`, `.5`). Precedence: exponentiation, then `*` `/` `%`, then `+` `-`; `-2^2` is `-4`.

## Not supported

The following are **errors** (`Invalid arithmetic expression.`), tested one by one:

- Functions such as `sin`, `cos`, `sqrt`, `abs`, `log`, `floor`, `ceil`, `round`, `min`, `max`, `exp` (separate functions exist for some of them: `$sqrt[]`, `$ceil[]`, `$floor[]`, `$round[]`, `$min[]`, `$max[]`).
- Comparisons (`>`, `<`, `>=`, `<=`, `==`, `!=`): use `$if[]` conditions.
- Names, constants such as `pi`, exponent notation (`1e3`), implicit multiplication such as `2(3)`, a comma as decimal separator, and unbalanced parentheses.
- An empty expression, a division by zero (`/` or `%` by `0`) and a result that is not finite (`10^400`).

## Return Value

- The result as text. With decimals disabled (the default) a non-integer result is rounded to the nearest integer (halves round up: `2.5` gives `3`, `-2.5` gives `-2`); with `$enableDecimals[yes]` the decimals are kept (`1/3` gives `0.3333333333333333`).
- Numbers are 64-bit floating point values: integers above 2^53 lose precision (`123456789*987654321` gives `121932631112635264`).
- Invalid expressions raise an error; they do not return an empty string.

## Examples

### Math Expression Evaluator

```bdfd
$var[result;$calculate[($message[1] + 10) * 2 / 4]]
$title[Math Calculator 🧮]
$description[Formula: `($message[1] + 10) * 2 / 4`
Result: **$var[result]**]
$color[#5865F2]
```

## Notes

- Other functions are evaluated first, so `$calculate[$var[a]+1]` works as long as `$var[a]` expands to a number. If it expands to text, the call fails.
- `$c[]` is not an alias of `$calculate[]`: it is a comment.
