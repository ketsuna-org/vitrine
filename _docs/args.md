---
layout: doc
title: $args[]
translation_key: docs
category: "Variables"
function_name: args
syntax: $args / $args[(index)]
description: Reads message.content, drops its first word, and returns the remaining words joined by spaces, or one of them when an index (1-indexed) is given.
---

$args reads the words of `message.content` (separated by whitespace), drops the first one and returns the rest.

## Syntax

```
$args
$args[(index)]
```

The function accepts 0 or 1 argument. `$args` (no brackets) returns all arguments; `$args[]` (empty brackets) counts as one empty argument and behaves like `$args[1]`.

## Indexing

The engine takes `message.content`, splits it on whitespace and **always drops the first word**. The remaining words are **1-indexed**. With `message.content` equal to `hello world`:

- `$args` (without index) → `"world"`
- `$args[1]` → `"world"`
- `$args[2]` → `""` (empty)

**Warning:** for prefix commands, the runtime already removes the command name: `message.content` contains only the arguments (`args.join(' ')`). So with `!command hello world`, `message.content` is `hello world` and `$args[1]` is `world`, not `hello`: **the first argument is skipped**. Use `$message` (all arguments) or `$message[1]` (first argument) to read the arguments from the start; `$argCount` counts all arguments.

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
$description[Total args: **$argCount**\nFirst arg: `$message[1]`\nArguments after the first one: `$args`]
$color[#5865F2]
```
