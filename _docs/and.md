---
layout: doc
title: $and
translation_key: docs
category: "Control Flow"
function_name: and
syntax: $and[condition1;condition2;...]
description: Logical AND — returns "true" only if ALL provided conditions evaluate to true.
---
# $and — Logical AND

`$and` performs a logical AND operation across a variable number of conditions. It returns the string `"true"` only if **every** provided condition evaluates to `"true"`. If any condition evaluates to `"false"`, the result is `"false"`.

## Syntax

```
$and[condition1;condition2;...;conditionN]
```

`$and` accepts an **unlimited number** of arguments (minimum 2). Each argument is a BDFD expression that is expected to resolve to either `"true"` or `"false"`.

## Evaluation

Each condition argument is resolved at runtime. Unlike many programming languages, BDFD's `$and` does **not** guarantee short-circuit evaluation — all conditions may be evaluated regardless of whether an earlier one already returned `"false"`.

This means you should be cautious about conditions that have side effects (like sending messages or modifying variables), as they may execute even when the overall result is already determined to be false.

## Truth Table

| Condition 1 | Condition 2 | Result   |
|-------------|-------------|----------|
| `"true"`    | `"true"`    | `"true"` |
| `"true"`    | `"false"`   | `"false"`|
| `"false"`   | `"true"`    | `"false"`|
| `"false"`   | `"false"`   | `"false"`|

The same logic extends to 3 or more arguments — all must be `"true"` for a `"true"` result.

## Using Conditions

`$and` works with any expression that evaluates to `"true"` or `"false"`:

- **Direct function results**: `$and[$checkCondition[...];$checkContains[...]]`
- **Inline comparisons**: `$and[$getUserVar[a]>0;$getUserVar[b]>0]`
- **Nested logical operators**: `$and[$or[...];$or[...]]`

Always wrap the `$and` call in an explicit boolean comparison when using inside `$if`:

```
$if[$and[cond1;cond2]==true]
```

## Use Cases

- **Multi-requirement checks**: Verify that all prerequisites are met before allowing an action.
- **Form validation**: Check that multiple fields are non-empty or valid.
- **Access control**: Combine role checks with resource availability checks.
- **State verification**: Confirm that multiple flags or state variables are all set correctly.

## Common Pitfalls

- **Assuming short-circuit**: Do not rely on conditions being evaluated left-to-right or stopping early. Avoid placing side-effect-heavy functions inside `$and`.
- **Non-boolean results**: If a condition returns something other than `"true"` or `"false"` (e.g., a number or empty string), the behavior is undefined — always ensure your conditions resolve to `"true"` or `"false"`.
- **Single condition**: `$and` requires at least 2 arguments. For a single condition, just use the condition directly without `$and`.
- **Forgetting `==true` in $if**: Write `$if[$and[...]==true]`, not `$if[$and[...]]`.
