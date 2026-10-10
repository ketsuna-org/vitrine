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

The function's behavior depends on the number of parameters (one or two; any other count is refused with "Invalid argument count"):

- **1 parameter** (`$var[name]`): read mode. Returns the current value of the variable, or an empty string if it doesn't exist.
- **2 parameters** (`$var[name;value]`): write mode. Stores `value` under `name` and returns an empty string. A third argument is **not** accepted: a `;` inside the value is read as an argument separator, so a value that contains semicolons cannot be written this way.

## Scope and Lifetime

Temporary variables are scoped to the current execution context. They are not shared with other commands, scheduled tasks, or concurrent invocations. When the command finishes execution, all temporary variables are discarded.

## Names Are Exact

Variable names are **case-sensitive** and are used exactly as written, spaces included: `$var[Name;x]` and `$var[name]` are two different variables, and `$var[ a ;x]` is not read back by `$var[a]`.

## Silent Failure

When reading a variable that does not exist, `$var` returns an empty string rather than throwing an error. There is no function to test whether a temporary variable exists: `$varExists` checks the variables declared in your bot settings, not the ones created with `$var`. Test the value itself instead, for example `$if[$var[name]==]`.

## Examples

### Temporary Variable Usage

```bdfd
$var[greeting;Welcome to the community]
$title[Local Variable Example]
$description[$var[greeting], <@$authorID>! 🎉]
$color[#5865F2]
```
