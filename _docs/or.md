---
layout: doc
title: $or
translation_key: docs
category: "Control Flow"
function_name: or
syntax: $or[condition1;(condition2;...)]
description: Logical OR — returns "true" if at least one of the provided conditions evaluates to true (1 to 100 conditions).
---
# $or — Logical OR

`$or` performs a logical OR operation across a variable number of conditions. It returns the string `"true"` if **at least one** provided condition evaluates to `"true"`. Only when all conditions evaluate to `"false"` does it return `"false"`.

## Syntax

```text
$or[condition1;(condition2);(...)]
```

`$or` accepts **1 to 100 arguments**; with more than 100 arguments the call is refused. Each argument is a condition: either `"true"` or `"false"`, or a comparison such as `a==b`, `a!=b`, `a>b`, `a>=b`, `a<b`, `a<=b`. If both sides are numbers the comparison is numeric, otherwise it is a text comparison (code-unit order, so uppercase letters sort before lowercase ones).

## Evaluation

Conditions are evaluated from left to right and `$or` **stops at the first condition that is true**: the following arguments are not evaluated. Do not rely on functions with side effects placed after a condition that may be true.

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
$or[$getUserVar[role]==admin;$getUserVar[role]==mod]
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

- **Short-circuit**: evaluation stops at the first true condition, so later arguments (and their side effects) are skipped in that case.
- **Invalid conditions**: each condition must be `"true"`, `"false"` or a comparison; anything else raises an "Invalid condition" error.
- **Single condition**: `$or[condition]` is accepted but is equivalent to the condition itself.
- **In `$if`**: `$if[$or[...]]` and `$if[$or[...]==true]` both work.
- **Confusing AND/OR logic**: `$or` returns `"true"` when ANY condition is true. For "ALL must be true", use `$and`.

## Examples

### Combining Alternative Permissions

```bdfd
$if[$or[$hasRole[$authorID;123456789012345678];$authorID==111222333444555666]==true]
  $title[Admin Access Granted]
  $description[Welcome to the control panel, <@$authorID>!]
  $color[#57F287]
$else
  $title[Access Denied]
  $description[You lack administrative credentials.]
  $color[#ED4245]
$endif
```
