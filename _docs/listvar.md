---
layout: doc
title: $listVar[]
translation_key: docs
category: "Variables"
function_name: listVar
syntax: $listVar[(separator)]
description: Returns the names of all the variables declared by the bot (all scopes and global variables), joined by a separator.
---

$listVar returns the **names** of the variables declared by the bot, joined by a separator. It does not return their values.

## Syntax

```
$listVar[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - Text inserted between two names. Default: `, ` (a comma followed by a space). The text is used as is: `\n` is **not** converted to a line break. Since `;` separates arguments, a separator cannot contain an unescaped `;`. |

## Output Format

The names are listed in the order of the variable catalogue (the declared variables of every scope, then the bot's global variables), for example `coins, level, prefix`. Names that only differ by letter case appear once (the first spelling is kept). A name starting with `bc_` is listed without that prefix. If nothing is declared, the result is an empty string.

## What is listed

- The variables declared in the bot's variable catalogue (user, member, server, channel and message scopes). A variable is declared in the Variables UI, or automatically the first time a `$set...Var` function writes it.
- The bot's global variables (the ones used with `$getVar` / `$setVar` without a user ID).
- Temporary variables created with `$var` are **not** listed.

## Examples

### List the declared variables

```bdfd
$title[Declared variables]
$description[$listVar[, ]]
$color[#5865F2]
```

### Pipe-separated list

```bdfd
$sendMessage[Variables: $listVar[ | ]]
```
