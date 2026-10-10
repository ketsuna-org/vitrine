---
layout: doc
title: $getMentionableSelectUserIDs
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserIDs
syntax: $getMentionableSelectUserIDs[(separator)]
description: Gets all the IDs selected in a mentionable select menu, joined by a separator. When users are selected, only user IDs are returned.
---

# $getMentionableSelectUserIDs

`$getMentionableSelectUserIDs[]` returns all the user IDs selected in the mentionable select menu that triggered the current interaction, joined by a separator.

## Syntax

```text
$getMentionableSelectUserIDs[separator;(limit)]
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

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no mentionableSelect selection.` when the interaction that triggered the script is not a mentionable select menu.
- The selection is read from the users resolved by Discord: **when at least one user is selected, only the user IDs are returned** (selected roles are not included); when only roles are selected, the IDs of those roles are returned.
- The number of selected items is returned by `$getMentionableSelectUserCount`.
- Without brackets (`$getMentionableSelectUserIDs`) the engine refuses the call (`Invalid argument count`).

## Examples

### All selections

```bdfd
IDs: $getMentionableSelectUserIDs[, ]
```

### Limit the number of items

```bdfd
First two IDs: $getMentionableSelectUserIDs[, ;2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  IDs: $getMentionableSelectUserIDs[, ]
$endif
```

## Notes

- For a single value, use `$getMentionableSelectUserID[index]`.
- With a menu that allows one selection only, the list contains at most one item.
- The menu is created with `$addMentionableSelect`.
