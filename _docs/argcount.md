---
layout: doc
title: $argCount[]
translation_key: docs
category: "Variables"
function_name: argCount
syntax: $argCount
description: Returns the number of arguments passed to the current command.
---

$argCount tells you exactly how many arguments were supplied by the user. It is a simple but essential function for input validation — almost every command that accepts arguments should check `$argCount` before proceeding.

## Return Value

Always a string representation of a non-negative integer. Even if no arguments are provided, the return value is `"0"`, never an empty string.

## Use in Conditionals

Since the return value is a string, numeric comparisons work naturally:

```
$if[$argCount>=2]
$if[$argCount<1]
$if[$argCount!=0]
```

## Relationship with $args

- `$argCount` tells you _how many_ arguments exist.
- `$args` / `$args[index]` lets you _retrieve_ them.
- Valid indices for `$args[index]` range from `0` to `$argCount - 1`.

## Common Pattern

Pair `$argCount` with `$argsCheck` for comprehensive validation:

```
$argsCheck[>=;1;Error: at least 1 argument required]
$if[$argCount>3]
Too many arguments (max 3).
$stop
$endif
```
