---
layout: doc
title: $getRoleSelectRoleCount
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleCount
syntax: $getRoleSelectRoleCount
description: Returns how many values were selected in a role select menu.
---

# $getRoleSelectRoleCount

`$getRoleSelectRoleCount` returns the number of values selected by the user in a role select menu, as a number.

## Syntax

```text
$getRoleSelectRoleCount
```

It takes no argument.

## Behavior

- Only usable in the callback of a component interaction (a select menu choice). Elsewhere it raises "Select values require a component callback.".
- If the callback carries no roleSelect selection it raises "This callback has no roleSelect selection.".
- To read the selected values themselves, use [$getRoleSelectRoleIDs](/docs/getroleselectroleids/).

## Example

```bdfd
$sendMessage[You selected $getRoleSelectRoleCount value(s).]
```
