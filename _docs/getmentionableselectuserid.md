---
layout: doc
title: $getMentionableSelectUserID
translation_key: docs
category: "Components & Interactions"
function_name: getMentionableSelectUserID
syntax: $getMentionableSelectUserID[index]
description: Gets one selected ID of the mentionable select menu that triggered the interaction. When users are selected, only user IDs are returned.
---

# $getMentionableSelectUserID

`$getMentionableSelectUserID[]` returns one selected ID of the mentionable select menu that triggered the current interaction.

## Syntax

```text
$getMentionableSelectUserID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Position of the selected ID, starting at 1. Required: a positive integer, otherwise `Selection index must be a positive integer.` |

## Return Value

- **Type**: String
- The selected ID at that position.
- An empty string when `index` is greater than the number of selected items.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no mentionableSelect selection.` when the interaction that triggered the script is not a mentionable select menu.
- The selection is read from the users resolved by Discord: **when at least one user is selected, only the user IDs are returned** (selected roles are not included); when only roles are selected, the IDs of those roles are returned.
- The number of selected items is returned by `$getMentionableSelectUserCount`.
- Without brackets (`$getMentionableSelectUserID`) the engine refuses the call (`Invalid argument count`).

## Examples

### First selection

```bdfd
Selected ID: $getMentionableSelectUserID[1]
```

### Second selection (empty if there is only one)

```bdfd
Second ID: $getMentionableSelectUserID[2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Selected ID: $getMentionableSelectUserID[1]
$endif
```

## Notes

- The index starts at 1 (0 is an error).
- For all the selections at once, use `$getMentionableSelectUserIDs[separator;(limit)]`.
- The menu is created with `$addMentionableSelect`.
