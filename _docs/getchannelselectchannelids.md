---
layout: doc
title: $getChannelSelectChannelIDs
translation_key: docs
category: "Components & Interactions"
function_name: getChannelSelectChannelIDs
syntax: $getChannelSelectChannelIDs[(separator)]
description: Gets all channel IDs selected by the user via a channel select menu. Returns a list separated by the specified delimiter.
---

# $getChannelSelectChannelIDs

The `$getChannelSelectChannelIDs[]` function allows you to **retrieve all the channel IDs** chosen by the user in a multi-choice channel select menu.

## Syntax

```
$getChannelSelectChannelIDs[(separator)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Optional - The character or string that separates each ID. Default: `, ` (comma + space). |

## Return Value

- **Type**: String
- The list of all selected channel IDs, separated by the delimiter.
- An empty string if no channel was selected.

## Behavior

- Used when the channel select menu allows multiple choices (`maxValues > 1`).
- Returns all IDs in a single string with the specified separator.
- Compatible with `$textSplit[]` to iterate over each channel.

## Examples

### List of selected channels

```bdfd
$onInteraction[channel_select]
$let[channels;$getChannelSelectChannelIDs[, ]]
$title[📋 Selected Channels]
$description[
**IDs:** $channels

**List:**
$textSplit[$channels;, ]
> <#[$splitText[$index]]>
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

### Loop through each channel

```bdfd
$onInteraction[channel_select]
$let[list;$getChannelSelectChannelIDs[,]]
$let[count;$length[$splitText[$list;,]]]
I have registered **$count** channel(s).
$textSplit[$list;,]
  Channel $index: $channelName[$splitText[$index]]
$endTextSplit
```

## Notes

- If the menu only accepts a single choice, use `$getChannelSelectChannelID[]`.
- The custom separator allows easy integration with other functions.
- Ideal for multi-channel configurations (logs, allowed channels, etc.).
