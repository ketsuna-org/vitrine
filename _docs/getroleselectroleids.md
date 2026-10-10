---
layout: doc
title: $getRoleSelectRoleIDs
translation_key: docs
category: "Components & Interactions"
function_name: getRoleSelectRoleIDs
syntax: $getRoleSelectRoleIDs[(separator)]
description: Gets all role IDs selected by the user via a multi-select role menu.
---

# $getRoleSelectRoleIDs

`$getRoleSelectRoleIDs[]` returns all the role IDs selected in the role select menu that triggered the current interaction, joined by a separator.

## Syntax

```text
$getRoleSelectRoleIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Text inserted between the items. Required, not trimmed; an empty separator concatenates the items without anything between them. |
| `limit` | Optional. Maximum number of items returned, taken from the first selected. A positive integer, otherwise `Selection limit must be a positive integer.`; empty or omitted means no limit. |

## Return Value

- **Type**: String
- The selected role IDs, in selection order, joined by `separator`.
- An empty string when nothing was selected.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no roleSelect selection.` when the interaction that triggered the script is not a role select menu.
- The IDs are those of the roles picked in the menu.
- The number of selected items is returned by `$getRoleSelectRoleCount`.
- Without brackets (`$getRoleSelectRoleIDs`) the engine refuses the call (`Invalid argument count`).

## Examples

### All selections

```bdfd
Roles: $getRoleSelectRoleIDs[, ]
```

### Limit the number of items

```bdfd
First two IDs: $getRoleSelectRoleIDs[, ;2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Roles: $getRoleSelectRoleIDs[, ]
$endif
```

## Notes

- For a single value, use `$getRoleSelectRoleID[index]`.
- With a menu that allows one selection only, the list contains at most one item.
- The menu is created with `$addRoleSelect`.
