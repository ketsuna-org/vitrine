---
layout: doc
title: $increment[]
translation_key: docs
category: "Variables"
function_name: increment
syntax: $increment[variable;(amount);(scope);(target);(guildID)]
description: "Adds to a number variable and returns the new value. An empty variable counts as 0."
---
# $increment — Adds to a number variable and returns the new value

## Syntax

```
$increment[variable;(amount);(scope);(target);(guildID)]
```

## Parameters

- **variable** *(text, required)* — The variable name.
- **amount** *(number, optional)* — Default: 1. A decimal is allowed.
- **scope** *(text, optional)* — `user` (default, per member of the server), `member`, `server`, `channel`, `message` or `global`.
- **target** *(ID, optional)* — The user, server, channel or message. Default: the current one.
- **guildID** *(ID, optional)* — For `user`/`member`: another server.

## Return Value

- number: the new value.

## Usage

```
$increment[xp;5] → "5" then "10"
$increment[count;1;server]
```

## Important Notes

- The variable is read then written: two commands at the very same moment can overlap.
- A variable that is not a number raises "Variable x is not a number".

## Example

```bdfd
$sendMessage[$increment[xp;5]]
```
