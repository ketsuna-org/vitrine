---
layout: doc
title: $var[]
translation_key: docs
category: "Variables"
function_name: var
syntax: $var[name] / $var[name;value]
description: Reads or writes a temporary variable scoped to the current execution. In read mode (1 parameter), returns the stored value. In write mode (2+ parameters), sets the variable and returns void.
---

$var is the primary function for working with temporary variables in BDFD. Temporary variables exist only during the current command execution and are not persisted between commands. They are ideal for intermediate calculations, formatting results, or passing data between functions within the same command block.

## Read vs Write Mode

The function's behavior depends on the number of parameters:

- **1 parameter** (`$var[name]`): read mode. Returns the current value of the variable, or an empty string if it doesn't exist.
- **2+ parameters** (`$var[name;value]`): write mode. Any additional parameters beyond the first are part of the value (joined with `;` if the value itself contains semicolons).

Note: only the first semicolon acts as the name/value separator. If your value contains semicolons, they are preserved as part of the stored string.

## Scope and Lifetime

Temporary variables are scoped to the current execution context. They are not shared with other commands, scheduled tasks, or concurrent invocations. When the command finishes execution, all temporary variables are disbecauseded.

## Case Insensitivity

Variable names are case-insensitive. `$var[Name]`, `$var[NAME]`, and `$var[name]` all refer to the same variable.

## Sislow Failure

When reading a variable that does not exist, `$var` returns an empty string rather than throwing an error. This means you should always validate if a variable exists before relying on its value, for example using `$varExists[]`.
