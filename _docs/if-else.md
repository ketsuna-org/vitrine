---
layout: doc
title: $if / $elseIf / $else / $endif
translation_key: docs
category: "Control Flow"
function_name: if
syntax: $if[condition] ... $elseIf[condition] ... $else ... $endif
description: Conditional branching — executes blocks of code based on runtime condition evaluation.
---
# $if / $elseIf / $else / $endif — Conditional Branching

The `$if` family of tokens provides conditional branching in BDFD scripts. These are **structural tokens** handled at the BDFD parser level, not dispatched as regular function calls. They allow you to execute different blocks of commands based on runtime conditions.

## How It Works

When the parser encounters a `$if[condition]` token, it evaluates the condition. If the condition is **true**, it executes the block immediately following `$if`, up to the next `$elseIf`, `$else`, or `$endif`. If the condition is **false**, it skips forward:

1. It checks any subsequent `$elseIf[condition]` blocks in order.
2. If no condition matches, the optional `$else` block is executed.
3. `$endif` is **always required** to close the if-block, even if only `$if` and `$else` are used.

## Condition Syntax

Conditions are BDFD expressions. They are not traditional programming language booleans — they are evaluated at runtime by the BDFD expression engine.

### Supported Comparison Operators

| Operator | Meaning              | Example                         |
|----------|----------------------|---------------------------------|
| `==`     | Equal to             | `$getUserVar[score]==100`       |
| `!=`     | Not equal to         | `$getUserVar[name]!=Guest`      |
| `>`      | Greater than         | `$getUserVar[coins]>0`          |
| `<`      | Less than            | `$getUserVar[hp]<25`            |
| `>=`     | Greater or equal     | `$getUserVar[level]>=10`        |
| `<=`     | Less or equal        | `$getUserVar[wins]<=3`          |

### Logical Operators

Combine multiple conditions with `$and` and `$or`:

```
$if[$and[$getUserVar[gold]>=100;$getUserVar[rank]>=5]==true]
$if[$or[$checkContains[$message;ping];$checkContains[$message;pong]]==true]
```

### Inline Check Functions

Use `$checkCondition` or `$checkContains` inside an `$if`:

```
$if[$checkCondition[>=;$getUserVar[age];18]==true]
$if[$checkContains[$message;admin]==true]
```

## Structural Rules

- **`$endif` is mandatory** — every `$if` must have exactly one `$endif`.
- **`$else` is optional** — at most one per `$if` block.
- **`$elseIf` is optional** — you can chain as many as you need.
- **Nesting is supported** — you can place `$if...$endif` inside another `$if` block.
- **Conditions are evaluated sequentially** — the first matching branch wins; subsequent branches are skipped.

## Common Pitfalls

- Forgetting `$endif` causes a parse error.
- Using `=` instead of `==` for equality — BDFD requires double equals.
- Comparing strings with numeric operators — make sure the value type matches the comparison intent.
