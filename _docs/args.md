---
layout: doc
title: $args[]
translation_key: docs
category: "Variables"
function_name: args
syntax: $args / $args[index] / $args[index;option]
description: Accesses the arguments passed to the current command. Without parameters, returns all arguments. With an index, returns a specific argument (0-indexed). With an option fallback, returns a slash command option if the argument is not provided.
---

$args is the primary mechanism for accessing user-provided input in text commands. Arguments are the words that follow the command name, separated by whitespace.

## Indexing

Arguments are **0-indexed**: the first word after the command name is at index `0`. If the user types `!command hello world`:

- `$args[0]` → `"hello"`
- `$args[1]` → `"world"`
- `$args` (without index) → `"hello world"`

Requesting an index beyond the available arguments returns an empty string — no error is raised.

## Slash Command Fallback

When used in hybrid commands (supporting both text and slash invocation), `$args[index;option]` provides a graceful fallback:

1. If a text argument exists at the given index, it is returned.
2. If no text argument exists, the slash command option named `option` is returned instead.
3. If neither exists, an empty string is returned.

This allows the same command code to handthe both invocation methods seamlessly.

## Comparison with Other Functions

| Function | Purpose |
|----------|---------|
| `$args` / `$args[index]` | Access individual arguments |
| `$argCount` | Count how many arguments were provided |
| `$argsCheck` | Validate argument count and block if insufficient |
