---
layout: doc
title: $variablesCount[]
translation_key: docs
category: "Variables"
function_name: variablesCount
syntax: $variablesCount[type]
description: Counts the number of variables declared for a given type (user, globaluser, server or channel).
---

$variablesCount returns how many variables are declared for the given type.

## Syntax

```
$variablesCount[type]
```

## Parameters

| Parameter | Description |
|---|---|
| `type` | **Required.** The kind of variable to count: `user`, `globaluser`, `server` or `channel` (surrounding spaces are ignored; the value is case-sensitive, so `User` is refused). Any other value, such as `message`, raises the error `Unknown variable type.` |

`$variablesCount` without brackets, or with more than one argument, is refused ("Invalid argument count").

## Return Value

The count of declared variables of that type (variables of the bot's variable catalogue for this scope, whether declared in the Variables UI or automatically by their first `$set...Var` write), as a string representation of an integer (e.g., `"3"`, `"0"`, `"15"`). Names that only differ by letter case count once.

## Type Filtering

- `user`: user variables (per-member variables in a server; user variables in legacy mode).
- `globaluser`: global user variables.
- `server`: server variables.
- `channel`: channel variables.

## Examples

### Display Variable Count

```bdfd
$title[Variables Stats]
$description[This bot defines **$variablesCount[server]** server variables.]
$color[#5865F2]
```
