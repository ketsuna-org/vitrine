---
layout: doc
title: $argsCheck[]
translation_key: docs
category: "Variables"
function_name: argsCheck
syntax: $argsCheck[operator;count;errorMessage]
description: Validates the number of arguments passed to the command and stops execution with an error message if the condition is not met. Acts as a guard that blocks the rest of the command from running on invalid input.
---

$argsCheck is a guard function that enforces argument count constraints at the beginning of a command. It is the recommended way to validate user input before processing — cleaner and more concise than manual `$if`/`$stop` combinations.

## How It Works

1. The current argument count (`$argCount`) is compared to the specified `count` using the given `operator`.
2. If the condition is **true**, execution continues to the next line.
3. If the condition is **false**, the `errorMessage` is sent to the user and the command **stops executing immediately** — no further code in the command runs.

## Operators

| Operator | Meaning | Condition passes when.. |
|----------|---------|--------------------------|
| `>=` | Greater or equal | `$argCount >= count` |
| `>` | Strictly greater | `$argCount > count` |
| `<=` | Less or equal | `$argCount <= count` |
| `<` | Strictly less | `$argCount < count` |

## Best Practices

- Place `$argsCheck` at the very top of your command, before any other logic.
- Write clear, actionable error messages that tell the user what they did wrong and how to fix it.
- Use `$argsCheck[>=;N;...]` for minimum argument requirements — the most common use case.
- Use `$argsCheck[<=;N;...]` to enforce maximums.
- Combine two checks for exact count requirements (as shown in the examples).

## Comparison with Manual Validation

Without `$argsCheck`:
```
$if[$argCount<2]
Error: at least 2 arguments required.
$stop
$endif
```

With `$argsCheck` (equivalent, cleaner):
```
$argsCheck[>=;2;Error: at least 2 arguments required.]
```
