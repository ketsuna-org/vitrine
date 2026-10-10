---
layout: doc
title: $getRoleSelectRoleID
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleID
syntax: $getRoleSelectRoleID[index]
description: Gets the ID of the role selected by the user via a role select menu.
---

# $getRoleSelectRoleID

`$getRoleSelectRoleID[]` returns one selected role ID of the role select menu that triggered the current interaction.

## Syntax

```text
$getRoleSelectRoleID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Position of the selected role ID, starting at 1. Required: a positive integer, otherwise `Selection index must be a positive integer.` |

## Return Value

- **Type**: String
- The selected role ID at that position.
- An empty string when `index` is greater than the number of selected items.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no roleSelect selection.` when the interaction that triggered the script is not a role select menu.
- The IDs are those of the roles picked in the menu.
- The number of selected items is returned by `$getRoleSelectRoleCount`.
- Without brackets (`$getRoleSelectRoleID`) the engine refuses the call (`Invalid argument count`).

## Examples

### First selection

```bdfd
Selected role: <@&$getRoleSelectRoleID[1]>
```

### Second selection (empty if there is only one)

```bdfd
Second role: <@&$getRoleSelectRoleID[2]>
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Selected role: <@&$getRoleSelectRoleID[1]>
$endif
```

## Notes

- The index starts at 1 (0 is an error).
- For all the selections at once, use `$getRoleSelectRoleIDs[separator;(limit)]`.
- The menu is created with `$addRoleSelect`.
