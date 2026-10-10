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
- Used in interactions of type `$onInteraction[]` or `$selectMenuInteractionID[]`.
- Works with channel select menus (type `channel` in `$addChannelSelectMenu[]`).
- If the user selects multiple channels, use `$getChannelSelectChannelIDs[]` to retrieve all of them.

## Examples

### Simple retrieval

```bdfd
$nomentionMessage
$addChannelSelectMenu[channel_select;1;Select a channel to monitor]
$sendMessage[Please choose a channel:]

$onInteraction[channel_select]
$var[channelID;$getChannelSelectChannelID[1]]
$title[Selected Channel]
$description[
**ID:** $var[channelID]
**Name:** $channelName[$var[channelID]]
]
$sendMessage[]
```

### Handling multiple selections

```bdfd
$onInteraction[channel_select]
$var[count;$length[$splitText[$getChannelSelectChannelIDs[,];,]]]
You have selected **$var[count]** channel(s):
$textSplit[$getChannelSelectChannelIDs[,];,]
> <#[$splitText[$index]]> (ID: $splitText[$index])
$endTextSplit
```

## Notes

- The index is required and starts at 1 (not 0).
- Only works in interaction callbacks.
- For multiple selections, use `$getChannelSelectChannelIDs[]` instead.
- The returned channel can be of any type (text, voice, category, etc.).
