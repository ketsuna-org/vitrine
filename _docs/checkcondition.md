---
layout: doc
title: $checkCondition
translation_key: docs
category: "Control Flow"
function_name: checkCondition
syntax: $checkCondition[operator;value1;value2]
description: Evaluates a comparison between two values and returns "true" or "false".
---
# $checkCondition — Inline Condition Evaluation

`$checkCondition` is a compile-time-optimized function that evaluates a comparison between two values and returns the string `"true"` or `"false"`. Unlike the `$if` structural token, `$checkCondition` is a standard function call that can be used anywhere a string value is expected — inside `$if` conditions, combined with `$and`/`$or`, or assigned to variables.

## Operators

All six standard comparison operators are supported:

| Operator | Meaning              | Numeric/String |
|----------|----------------------|-----------------|
| `==`     | Equal to             | Both            |
| `!=`     | Not equal to         | Both            |
| `>`      | Greater than         | Numeric only    |
| `<`      | Less than            | Numeric only    |
| `>=`     | Greater or equal     | Numeric only    |
| `<=`     | Less or equal        | Numeric only    |

For equality (`==`, `!=`), both string and numeric comparisons work. For ordering operators (`>`, `<`, `>=`, `<=`), values are coerced to numbers. If coercion fails, the result is `"false"`.

## Compile-Time Evaluation

When both `value1` and `value2` are literal constants (not referencing variables or functions), `$checkCondition` is evaluated **at compile time**. The result is baked directly into the compiled script, avoiding any runtime overhead.

When values contain placeholders or function calls, evaluation falls back to runtime.

## Return Value

`$checkCondition` always returns the literal strings `"true"` or `"false"` (lowercase). These are **string values**, not boolean primitives. When using the result in an `$if` condition, compare it explicitly with `==true`:

```
$if[$checkCondition[>;$getUserVar[gold];0]==true]
```

This explicit comparison is the BDFD convention for evaluating conditions.

## Comparison with Direct Conditions in $if

You can write conditions inside `$if` directly (e.g., `$if[$getUserVar[gold]>0]`) without using `$checkCondition`. The main reasons to use `$checkCondition` are:

1. **Composability** — pass the result to `$and` / `$or` or store it in a variable.
2. **Clarity** — makes the comparison intent explicit, especially with complex expressions.
3. **Reuse** — evaluate once and reuse the result in multiple places.

## Common Pitfalls

- Using a single `=` instead of `==` — BDFD requires double equals for equality.
- Comparing the result with `== "true"` (with quotes) — BDFD expressions usually interpret bare `true`, not quoted `"true"`.
- Expecting boolean-like truthiness — `$checkCondition` returns a **string**. Empty string checks will not work; always compare with `==true` or `==false`.
