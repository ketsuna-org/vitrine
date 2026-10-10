---
layout: doc
title: $getUserSelectUserID
translation_key: docs
category: "Components & Interactions"
function_name: getUserSelectUserID
syntax: $getUserSelectUserID[index]
description: Gets the ID of the user selected via a user select menu.
---

# $getUserSelectUserID

`$getUserSelectUserID[]` returns one selected user ID of the user select menu that triggered the current interaction.

## Syntax

```text
$getUserSelectUserID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Position of the selected user ID, starting at 1. Required: a positive integer, otherwise `Selection index must be a positive integer.` |

## Return Value

- **Type**: String
- The selected user ID at that position.
- An empty string when `index` is greater than the number of selected items.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no userSelect selection.` when the interaction that triggered the script is not a user select menu.
- The IDs are those of the users picked in the menu.
- The number of selected items is returned by `$getUserSelectUserCount`.
- Without brackets (`$getUserSelectUserID`) the engine refuses the call (`Invalid argument count`).

## Examples

### First selection

```bdfd
Selected user: <@$getUserSelectUserID[1]>
```

### Second selection (empty if there is only one)

```bdfd
Second user: <@$getUserSelectUserID[2]>
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Selected user: <@$getUserSelectUserID[1]>
$endif
```

## Notes

- The index starts at 1 (0 is an error).
- For all the selections at once, use `$getUserSelectUserIDs[separator;(limit)]`.
- The menu is created with `$addUserSelect`.
