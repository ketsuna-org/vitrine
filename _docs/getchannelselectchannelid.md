---
layout: doc
title: $getChannelSelectChannelID
translation_key: docs
category: "Entity Info"
function_name: getChannelSelectChannelID
syntax: $getChannelSelectChannelID[(index)]
description: Gets the ID of the channel selected by the user via a channel select menu. Allows getting the result of an interaction.
---

# $getChannelSelectChannelID

The `$getChannelSelectChannelID[]` function allows you to **retrieve the ID of the channel** chosen by the user in a channel select menu.

## Syntax

```
$getChannelSelectChannelID[(index)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Optional - The index of the channel in the selection (1 = first). Default: 1. |

## Return Value

- **Type**: String (Snowflake ID)
- The Discord ID of the selected channel.
- An empty string if no channel was selected.

## Behavior

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
$let[channelID;$getChannelSelectChannelID]
$title[Selected Channel]
$description[
**ID:** $channelID
**Name:** $channelName[$channelID]
]
$sendMessage[]
```

### Handling multiple selections

```bdfd
$onInteraction[channel_select]
$let[count;$length[$splitText[$getChannelSelectChannelIDs[,];,]]]
You have selected **$count** channel(s):
$textSplit[$getChannelSelectChannelIDs[,];,]
> <#[$splitText[$index]]> (ID: $splitText[$index])
$endTextSplit
```

## Notes

- The index starts at 1 (not 0).
- Only works in interaction callbacks.
- For multiple selections, use `$getChannelSelectChannelIDs[]` instead.
- The returned channel can be of any type (text, voice, category, etc.).
