---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Components & Interactions"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[(index)]
description: Gets the ID of the channel selected by the user via a channel select menu. Allows getting the result of an interaction.
---

# $getChannelSelectChannelID

`$getChannelSelectChannelID[]` returns one selected channel ID of the channel select menu that triggered the current interaction.

## Syntax

```text
$getChannelSelectChannelID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Position of the selected channel ID, starting at 1. Required: a positive integer, otherwise `Selection index must be a positive integer.` |

## Return Value

- **Type**: String
- The selected channel ID at that position.
- An empty string when `index` is greater than the number of selected items.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no channelSelect selection.` when the interaction that triggered the script is not a channel select menu.
- The IDs are those of the channels picked in the menu; `$addCategorySelect` and `$addVoiceSelect` menus are channel menus too and use these functions.
- The number of selected items is returned by `$getChannelSelectChannelCount`.
- Without brackets (`$getChannelSelectChannelID`) the engine refuses the call (`Invalid argument count`).

## Examples

### First selection

```bdfd
Selected channel: <#$getChannelSelectChannelID[1]>
```

### Second selection (empty if there is only one)

```bdfd
Second channel: <#$getChannelSelectChannelID[2]>
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Selected channel: <#$getChannelSelectChannelID[1]>
$endif
```

## Notes

- The index starts at 1 (0 is an error).
- For all the selections at once, use `$getChannelSelectChannelIDs[separator;(limit)]`.
- The menu is created with `$addChannelSelect`.
