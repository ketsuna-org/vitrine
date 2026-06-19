---
layout: doc
title: $calculate[]
translation_key: docs
category: "Math & Text"
function_name: calculate
syntax: $calculate[expression]
description: Evaluates a complete mathematical expression (operators, functions, comparisons).
---

# $calculate[]

The `$calculate[]` function is the most powerful mathematical function in BDFD. It allows you to evaluate complex mathematical expressions using an integrated math parser.

## Syntax

```
$calculate[expression]
```

## Parameters

| Parameter   | Type   | Required | Description                                                    |
|-------------|--------|-------------|----------------------------------------------------------------|
| `expression`| string | Yes         | The mathematical expression to evaluate.                       |

## Supported Operators

| Operator | Description       | Example           |
|-----------|-------------------|--------------------|
| `+`       | Addition          | `5 + 3` → `8`     |
| `-`       | Subtraction       | `10 - 4` → `6`    |
| `*`       | Multiplication    | `6 * 7` → `42`    |
| `/`       | Division          | `15 / 3` → `5`    |
| `%`       | Modulo            | `17 % 5` → `2`    |
| `^`       | Exponentiation    | `2 ^ 8` → `256`   |

## Supported Functions

`sin`, `cos`, `tan`, `asin`, `acos`, `atan`, `abs`, `sqrt`, `log`, `log10`, `floor`, `ceil`, `round`, `min`, `max`, `exp`

## Comparisons

Comparisons return `"true"` or `"false"`:

- `>` strictly greater than
- `<` strictly less than
- `>=` greater than or equal to
- `<=` less than or equal to
- `==` equal to
- `!=` not equal to

## Notes

- The expression is evaluated with a server-side math parser.
- The result is always returned as a character string (even for numbers).
- The function supports the use of BDFD variables like `$getVar[]` in the expression.
- In case of an invalid expression, the behavior depends on the parser (usually a silent error or an empty result).
