---
layout: doc
title: $argsCheck[]
translation_key: docs
category: "Variables"
function_name: argsCheck
syntax: $argsCheck[operator;count;errorMessage] / $argsCheck[operatorAndCount;errorMessage]
description: Validates the number of arguments passed to the command and stops execution with an error message if the condition is not met. Acts as a guard that blocks the rest of the command from running on invalid input.
---

$argsCheck is a guard function that enforces argument count constraints at the beginning of a command. It is the recommended way to validate user input before processing — cleaner and more concise than manual `$if`/`$stop` combinations.

## Syntax

```
$argsCheck[operator;count;errorMessage]
$argsCheck[operatorAndCount;errorMessage]
```

The function takes 2 or 3 arguments. With 3 arguments, the first two are concatenated to form the condition (`>=` and `2` give `>=2`). With 2 arguments, the first one is the whole condition (e.g. `>=2`). The condition must match `[operator]number` (`>=`, `<=`, `>`, `<`, `=` or no operator); anything else raises "Invalid argument count condition."

## How It Works

1. The current argument count (the value of `$argCount`) is compared to the number using the operator.
2. If the condition is **true**, execution continues to the next line.
3. If the condition is **false**, the script stops immediately: the last argument is used as the error message (it replaces the output) and no further code in the command runs.

## Operators

| Operator | Condition passes when |
|----------|--------------------------|
| `>=` | `$argCount >= count` |
| `>` | `$argCount >= count` (the engine treats `>` like `>=`) |
| `<=` | `$argCount <= count` |
| `<` | `$argCount < count` |
| `=` or none | `$argCount == count` |

## Best Practices

- Place `$argsCheck` at the very top of your command, before any other logic.
- Write clear, actionable error messages that tell the user what they did wrong and how to fix it.
- Use `$argsCheck[>=;N;...]` for minimum argument requirements — the most common use case.
- Use `$argsCheck[<=;N;...]` to enforce maximums.
- Combine two checks for exact count requirements, or use `$argsCheck[=;N;...]`.

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

## Examples

### Enforcing Required Arguments

```bdfd
$argsCheck[>=;2;❌ You must provide at least 2 arguments! Syntax: `!poll <question> <options...>`]
$title[Poll Created]
$description[Question: **$message**]
$color[#5865F2]
```
