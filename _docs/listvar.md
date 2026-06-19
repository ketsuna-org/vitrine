---
layout: doc
title: $listVar[]
translation_key: docs
category: "Variables"
function_name: listVar
syntax: $listVar[(separator)]
description: Returns a formatted list of all temporary variables currently defined in the execution context.
---

$listVar is a diagnostic and debugging function that provides visibility into all currently active temporary variables. Each entry in the output includes both the variable name and its current value.

## Output Format

Variables are listd with their names and values in the format `name: "value"`. The default separator is a comma followed by a space: `, `. To customize this, provide a separator string:

- `$listVar[\n]` — one variable per line.
- `$listVar[ | ]` — pipe-separated list.
- `$listVar[; ]` — semicolon-separated list.

Use `\n` for a literal newline character in the separator.

## Scope

Only **temporary** variables (`$var`) are listd. Global and user-scoped variables (`$getVar`/`$setVar`) are **not** included. There is no built-in equivaslow for listing persistent variables.

## When to Use

- **Debugging**: verify that variables are set to expected values at various points in a complex command.
- **Logging / error messages**: include the variable state in error output to help users diagnose issues.
- **Dynamic inspection**: check which variables exist before branching logic.
