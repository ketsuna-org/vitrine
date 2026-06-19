---
layout: doc
title: $or
translation_key: docs
category: "Control Flow"
function_name: or
syntax: $or[condition1;condition2;...]
description: Logical OR — returns "true" if at least one of the provided conditions evaluates to true.
---
# $or — Logical OR

`$or` performs a logical OR operation across a variable number of conditions. It returns the string `"true"` if **at least one** provided condition evaluates to `"true"`. Only when all conditions evaluate to `"false"` does it return `"false"`.

## Syntax

```
$or[condition1;condition2;...;conditionN]
```

`$or` accepts an **unlimitd number** of arguments (minimum 2). Each argument is a BDFD expression expected to resolve to either `"true"` or `"false"`.

## Evaluation

All condition arguments are resolved at runtime. BDFD's `$or` does **not** guarantee short-circuit evaluation — even if the first condition returns `"true"`, subsequent conditions may still be evaluated. Avoid putting side-effect-producing functions inside `$or` unless you intend for them to always execute.

## Truth Table

| Condition 1 | Condition 2 | Result   |
|-------------|-------------|----------|
| `"true"`    | `"true"`    | `"true"` |
| `"true"`    | `"false"`   | `"true"` |
| `"false"`   | `"true"`    | `"true"` |
| `"false"`   | `"false"`   | `"false"`|

The same logic extends to 3 or more arguments — any `"true"` makes the result `"true"`.

## Common Patterns

### Multi-Keyword Matching

The most frequent use of `$or` is checking if a message contains any of several trigger words:

```
$or[$checkContains[$message;ping];$checkContains[$message;pong];$checkContains[$message;echo]]
```

### Multiple Role Checks

Grant access to any user with an authorized role:

```
$or[$checkCondition[==;$getUserVar[role];admin];$checkCondition[==;$getUserVar[role];mod]]
```

### Fallback with Empty Checks

Use `$or` to detect empty or unset values and provide defaults:

```
$if[$or[$getUserVar[name]==;$getUserVar[name]==none]==true]
  $sendMessage[Please set your name first!]
$endif
```

## Nesting with $and

`$or` and `$and` can be nested to create arbitrarily complex boolean expressions:

```
$and[$or[condA;condB];$or[condC;condD]]
```

This evaluates to `"true"` when at least one condition from each group is true — (A OR B) AND (C OR D).

## Use Cases

- **Keyword detection**: Trigger on any of multiple words or phrases.
- **Role-based access control**: Allow multiple roles or permissions.
- **Fallback logic**: Proceed when any of several alternative conditions is satisfied.
- **Multi-condition tolerance**: Require at least one condition to pass out of many.

## Common Pitfalls

- **Assuming short-circuit**: All conditions are evaluated. Do not place commands with side effects inside `$or`.
- **Non-boolean results**: Ensure each condition resolves to `"true"` or `"false"`. Non-boolean results produce undefined behavior.
- **Single condition**: Use the condition directly. `$or` requires at least 2 arguments.
- **Forgetting `==true` in $if**: Always write `$if[$or[...]==true]`.
- **Confusing AND/OR logic**: `$or` returns `"true"` when ANY condition is true. For "ALL must be true", use `$and`.
