---
layout: doc
title: $args[]
translation_key: docs
category: "Variables"
function_name: args
syntax: $args / $args[(index)]
description: Accesses the words that follow the command name in the message content. Without parameters, returns all of them joined by spaces. With an index (1-indexed), returns one of them.
---

$args is the primary mechanism for accessing user-provided input in text commands. Arguments are the words that follow the command name, separated by whitespace.

## Syntax

```
$args
$args[(index)]
```

The function accepts 0 or 1 argument. `$args` (no brackets) returns all arguments; `$args[]` (empty brackets) counts as one empty argument and behaves like `$args[1]`.

## Indexing

The engine takes `message.content`, splits it on whitespace and drops the first word (the trigger). Arguments are then **1-indexed**: the first word after the command name is at index `1`. If the user types `!command hello world`:

- `$args[1]` → `"hello"`
- `$args[2]` → `"world"`
- `$args` (without index) → `"hello world"`

Requesting an index that is 0, negative or beyond the available arguments returns an empty string — no error is raised. An index that is empty or not an integer is treated as `1`.

## Comparison with Other Functions

| Function | Purpose |
|----------|---------|
| `$args` / `$args[index]` | Access individual arguments |
| `$argCount` | Count how many arguments were provided |
| `$argsCheck` | Validate argument count and block if insufficient |

## Examples

### Read Command Arguments with Embed

```bdfd
$title[Command Arguments Inspector]
$description[Total args: **$argCount**\nFirst arg: `$args[1]`\nAll args: `$args`]
$color[#5865F2]
```
