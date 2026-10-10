---
layout: doc
title: $checkCondition
translation_key: docs
category: "Control Flow"
function_name: checkCondition
syntax: $checkCondition[condition]
description: Evaluates a condition (a comparison written as a single expression) and returns "true" or "false".
---
# $checkCondition — Inline Condition Evaluation

`$checkCondition[condition]` takes a single argument, a condition, evaluates it and returns the string `"true"` or `"false"`. Unlike the `$if` structural token, `$checkCondition` is a standard function call that can be used anywhere a string value is expected — inside `$if` conditions, combined with `$and`/`$or`, or assigned to variables.

## Syntax

```text
$checkCondition[condition]
```

The condition is one expression: either the literal `true` / `false`, or `left<operator>right` (for example `$getUserVar[coins]>100`). The call requires exactly one argument.

## Operators

All six standard comparison operators are supported:

| Operator | Meaning              |
|----------|----------------------|
| `==`     | Equal to             |
| `!=`     | Not equal to         |
| `>`      | Greater than         |
| `<`      | Less than            |
| `>=`     | Greater or equal     |
| `<=`     | Less or equal        |

Both sides are trimmed. If both sides are numbers, they are compared numerically; otherwise they are compared as text, character code by character code (so `B<a` is true: uppercase letters sort before lowercase ones). The operator is the first one found in the text, scanning from the left. A condition that is neither `true`, `false` nor a comparison (including a single `=`, or an empty condition) raises the error `Invalid condition: <condition>.`

## Return Value

`$checkCondition` always returns the literal strings `"true"` or `"false"` (lowercase). These are **string values**, not boolean primitives. In an `$if`, both forms work, since `true` and `false` are accepted as conditions:

```
$if[$checkCondition[$getUserVar[gold]>0]]
$if[$checkCondition[$getUserVar[gold]>0]==true]
```

## Comparison with Direct Conditions in $if

You can write conditions inside `$if` directly (e.g., `$if[$getUserVar[gold]>0]`) without using `$checkCondition`. The main reasons to use `$checkCondition` are:

1. **Composability** — pass the result to `$and` / `$or` or store it in a variable.
2. **Clarity** — makes the comparison intent explicit, especially with complex expressions.
3. **Reuse** — evaluate once and reuse the result in multiple places.

## Common Pitfalls

- Using a single `=` instead of `==` — BDFD requires double equals for equality.
- Expecting boolean-like truthiness — `$checkCondition` returns a **string** (`true` or `false`); an empty or otherwise non-comparison argument is an error, not `false`.
- Passing the operator as a separate argument (`$checkCondition[>;a;b]`): the function takes exactly one argument.

## Examples

### Evaluating a Numerical Threshold

```bdfd
$title[Condition Evaluation]
$description[Is user balance greater than 100? **$checkCondition[$getUserVar[coins]>100]**]
$color[#5865F2]
```
