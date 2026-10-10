---
layout: doc
title: $getChannelSelectChannelIDs
translation_key: docs
category: "Components & Interactions"
function_name: getChannelSelectChannelIDs
syntax: $getChannelSelectChannelIDs[separator;(limit)]
description: Gets all channel IDs selected by the user via a channel select menu. Returns a list separated by the specified delimiter.
---

# $getChannelSelectChannelIDs

`$getChannelSelectChannelIDs[]` returns all the channel IDs selected in the channel select menu that triggered the current interaction, joined by a separator.

## Syntax

```text
$getChannelSelectChannelIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Text inserted between the items. Required, not trimmed; an empty separator concatenates the items without anything between them. |
| `limit` | Optional. Maximum number of items returned, taken from the first selected. A positive integer, otherwise `Selection limit must be a positive integer.`; empty or omitted means no limit. |

## Return Value

- **Type**: String
- The selected channel IDs, in selection order, joined by `separator`.
- An empty string when nothing was selected.

## Behavior

- It raises `Select values require a component callback.` outside of a component interaction (interaction type 3), and `This callback has no channelSelect selection.` when the interaction that triggered the script is not a channel select menu.
- The IDs are those of the channels picked in the menu; `$addCategorySelect` and `$addVoiceSelect` menus are channel menus too and use these functions.
- The number of selected items is returned by `$getChannelSelectChannelCount`.
- Without brackets (`$getChannelSelectChannelIDs`) the engine refuses the call (`Invalid argument count`).

## Examples

### All selections

```bdfd
Channels: $getChannelSelectChannelIDs[, ]
```

### Limit the number of items

```bdfd
First two IDs: $getChannelSelectChannelIDs[, ;2]
```

### In an interaction handler

```bdfd
$if[$customID==my_menu]
  Channels: $getChannelSelectChannelIDs[, ]
$endif
```

## Notes

- For a single value, use `$getChannelSelectChannelID[index]`.
- With a menu that allows one selection only, the list contains at most one item.
- The menu is created with `$addChannelSelect`.
