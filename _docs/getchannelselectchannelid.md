---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Components & Interactions"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[index]
description: Gets the ID of the channel selected by the user via a channel select menu. Allows getting the result of an interaction.
---

# $getChannelSelectChannelID

The `$getChannelSelectChannelID[]` function allows you to **retrieve the ID of the channel** chosen by the user in a channel select menu.

## Syntax

```
$getChannelSelectChannelID[index]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Required (exactly one argument) - The index of the channel in the selection (1 = first). Must be a positive integer, otherwise "Selection index must be a positive integer.". A bare `$getChannelSelectChannelID` is refused ("Invalid argument count"). |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected channel.
- An empty string if `index` is greater than the number of selected channels.

## Behavior

- Only usable in a component callback (interaction type 3), otherwise the error "Select values require a component callback." is raised.
- Raises "This callback has no channelSelect selection." if the callback carries no channel selection.
- Used in the callback of a channel select menu created with `$addChannelSelect[]`; identify the menu with `$customID`.
- If the user selects multiple channels, use `$getChannelSelectChannelIDs[]` to retrieve all of them.

## Examples

### Simple retrieval

```bdfd
$addChannelSelect[channel_select;Select a channel to monitor]
$sendMessage[Please choose a channel:]
```

In the callback script of the menu:

```bdfd
$var[channelID;$getChannelSelectChannelID[1]]
$title[Selected Channel]
$description[
**ID:** $var[channelID]
**Name:** $channelName[$var[channelID]]
]
```

### Handling multiple selections

```bdfd
$if[$customID==channel_select]
  $sendMessage[You have selected **$getChannelSelectChannelCount** channel(s): $getChannelSelectChannelIDs[, ]]
$endif
```

## Notes

- The index is required and starts at 1 (not 0).
- Only works in interaction callbacks.
- For multiple selections, use `$getChannelSelectChannelIDs[]` instead.
- The returned channel can be of any type (text, voice, category, etc.).
