---
layout: doc
title: $getUserSelectUserIDs
translation_key: docs
category: "Components & Interactions"
function_name: getUserSelectUserIDs
syntax: $getUserSelectUserIDs[separator;(limit)]
description: Gets all user IDs selected via a multi-select user select menu.
---

# $getUserSelectUserIDs

`$getUserSelectUserIDs[]` returns all the user IDs selected in the user select menu that triggered the current interaction, joined by a separator.

## Syntax

```text
$getUserSelectUserIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Text inserted between the items. Required, not trimmed; an empty separator concatenates the items without anything between them. |
| `limit` | Optional. Maximum number of items returned, taken from the first selected. A positive integer, otherwise `Selection limit must be a positive integer.`; empty or omitted means no limit. |

## Return Value

- **Type**: String
- The selected user IDs, in selection order, joined by `separator`.
- An empty string when nothing was selected.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no userSelect selection.` when the interaction that triggered the script is not a user select menu.
- The IDs are those of the users picked in the menu.
- The number of selected items is returned by `$getUserSelectUserCount`.
- Without brackets (`$getUserSelectUserIDs`) the engine refuses the call (`Invalid argument count`).

## Examples

### All selections

```bdfd
Users: $getUserSelectUserIDs[, ]
```

### Limit the number of items

```bdfd
First two IDs: $getUserSelectUserIDs[, ;2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Users: $getUserSelectUserIDs[, ]
$endif
```

## Notes

- For a single value, use `$getUserSelectUserID[index]`.
- With a menu that allows one selection only, the list contains at most one item.
- The menu is created with `$addUserSelect`.
