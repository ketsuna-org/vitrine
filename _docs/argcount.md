---
layout: doc
title: $argCount[]
translation_key: docs
category: "Variables"
function_name: argCount
syntax: $argCount[(Text)]
description: Returns the number of arguments passed to the current command, or the number of words of a given text.
---

$argCount returns the number of arguments of the current command: the runtime variable `args.count` when it is set (prefix commands set it to the number of words after the command name), otherwise the number of whitespace-separated words of `message.content`. With a text (`$argCount[Text]`), it instead counts the whitespace-separated words of that text; a blank text (`$argCount[]`) counts the command arguments. It is a simple but essential function for input validation — almost every command that accepts arguments should check `$argCount` before proceeding.

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
- `$args` / `$args[index]` lets you _retrieve_ them (see the page of `$args` for a quirk: it skips the first word of `message.content`). `$message[index]` returns the word at that position directly.
- `$args[index]` is 1-indexed: valid indices range from `1` to `$argCount`; `0` returns an empty string.

## Common Pattern

Pair `$argCount` with `$argsCheck` for comprehensive validation:

```
$argsCheck[>=;1;Error: at least 1 argument required]
$if[$argCount>3]
Too many arguments (max 3).
$stop
$endif
```

## Examples

### Counting the words of a text

```bdfd
$sendMessage[$argCount[one two  three]]
```

Returns `3`.

### Validating Command Arguments

```bdfd
$title[Command Arguments Check]
$description[You provided **$argCount[]** arguments in your command.]
$addField[Expected;At least 2 arguments;yes]
$addField[Received;$argCount[];yes]
$color[#5865F2]
```
