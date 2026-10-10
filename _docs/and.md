---
layout: doc
title: $and
translation_key: docs
category: "Control Flow"
function_name: and
syntax: $and[condition1;(condition2);(...)]
description: Logical AND — returns "true" only if ALL provided conditions evaluate to true.
---
# $and — Logical AND

`$and` performs a logical AND operation across a variable number of conditions. It returns the string `"true"` only if **every** provided condition evaluates to `"true"`. If any condition evaluates to `"false"`, the result is `"false"`.

## Syntax

```text
$and[condition1;(condition2);(...)]
```

`$and` accepts **1 to 100** arguments. Each argument must resolve to `true`, `false`, or a comparison using `==`, `!=`, `>=`, `<=`, `>` or `<` (e.g. `$getUserVar[coins]>=50`). Any other value is an error (`Invalid condition: <value>.`). In a comparison, if both sides are numbers the comparison is numeric, otherwise it is a text comparison (code-unit order, so uppercase letters sort before lowercase ones). Both sides and the whole condition are trimmed.

## Evaluation

Each condition argument is resolved at runtime. Conditions are evaluated from left to right and `$and` **short-circuits**: as soon as one condition is false, it returns `"false"` and the remaining arguments are not evaluated (so their side effects, and any error they would raise, do not happen).

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

Inside `$if`, both `$if[$and[cond1;cond2]]` and `$if[$and[cond1;cond2]==true]` work, because `$and` returns the text `true` or `false`, which `$if` accepts as a condition.

## Use Cases

- **Multi-requirement checks**: Verify that all prerequiredites are met before allowing an action.
- **Form validation**: Check that multiple fields are non-empty or valid.
- **Access control**: Combine role checks with resource availability checks.
- **State verification**: Confirm that multiple flags or state variables are all set correctly.

## Common Pitfalls

- **Order matters**: conditions are evaluated left to right and evaluation stops at the first false one, so put cheap or guarding checks first.
- **Non-boolean results**: If a condition is neither `true`, `false` nor a comparison (e.g., a lone number or an empty string, as in `$and[1]` or `$and[]`), the engine raises an `Invalid condition` error.
- **No argument**: `$and` requires at least 1 argument (and at most 100); a bare `$and` is refused.

## Examples

### Checking Multiple Conditions

```bdfd
$if[$and[$message!=;$getUserVar[coins]>=50]==true]
  $title[Transaction Approved]
  $description[Both conditions met! Deducting 50 coins for: **$message**]
  $color[#57F287]
$else
  $title[Transaction Denied]
  $description[You must provide an item name and have at least 50 coins.]
  $color[#ED4245]
$endif
```
