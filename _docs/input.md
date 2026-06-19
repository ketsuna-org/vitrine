---
layout: doc
title: $input
translation_key: docs
category: "Variables"
function_name: input
syntax: $input
description: Gets the full text of the command input by the user, after the prefix and the command name. Equivalent to $message without the command name.
---

# $input

The function `$input` returns the **text entered after the command name**. For a command `!say Hello World`, `$input` evaluates to `Hello World`.

## Syntax

```
$input
```

## Parameters

None.

## Return Value

- **Type**: String
- The full text entered after the command name.
- An empty string if no arguments were provided.

## Difference with $message

| Function | Example with `!say hello` |
|---|---|
| `$message` | `!say hello` (complete command) |
| `$input` | `hello` (arguments only) |

## Examples

### Echo command

```bdfd
$sendMessage[$input]
```

### Say command with embed

```bdfd
$if[$input!=]
  $title[Message of $username]
  $description[$input]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Usage: !say <message>]
$endif
```

### Extracting the first word

```bdfd
$let[firstWord;$splitText[1; ;$input]]
$sendMessage[First word: $firstWord]
```

## Notes

- `$input` is affected by `$noMentionMessage` (mentions are converted).
- To avoid mention conversion, use `$messageSlice[>1]`.
- `$input` does not contain the prefix or the command name.
