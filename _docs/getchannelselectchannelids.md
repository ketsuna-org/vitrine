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

The `$getChannelSelectChannelIDs[]` function allows you to **retrieve all the channel IDs** chosen by the user in a multi-choice channel select menu.

## Syntax

```
$getChannelSelectChannelIDs[separator;(limit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `separator` | Required - The string that separates each ID (no default; an empty separator concatenates the IDs). A bare `$getChannelSelectChannelIDs` is refused ("Invalid argument count"). |
| `limit` | Optional - Maximum number of IDs returned (positive integer, else "Selection limit must be a positive integer."). Empty means no limit. |

## Return Value

- **Type**: String
- The list of all selected channel IDs, separated by the delimiter.
- An empty string if the selection is empty.

## Behavior

- Only usable in a component callback (interaction type 3), otherwise "Select values require a component callback." is raised; "This callback has no channelSelect selection." if the callback carries no channel selection.
- Used when the channel select menu allows multiple choices (`maxValues > 1`).
- Returns all IDs in a single string with the specified separator.
- Compatible with `$textSplit[]` to iterate over each channel.

## Examples

### List of selected channels

```bdfd
$onInteraction[channel_select]
$var[channels;$getChannelSelectChannelIDs[, ]]
$title[📋 Selected Channels]
$description[
**IDs:** $var[channels]

**List:**
$textSplit[$var[channels];, ]
> <#[$splitText[$index]]>
$endTextSplit
]
$color[#5865F2]
$sendMessage[]
```

### Loop through each channel

```bdfd
$onInteraction[channel_select]
$var[list;$getChannelSelectChannelIDs[,]]
$var[count;$length[$splitText[$var[list];,]]]
I have registered **$var[count]** channel(s).
$textSplit[$var[list];,]
  Channel $index: $channelName[$splitText[$index]]
$endTextSplit
```

## Notes

- If the menu only accepts a single choice, use `$getChannelSelectChannelID[]`.
- The separator argument is required and allows easy integration with other functions.
- Ideal for multi-channel configurations (logs, allowed channels, etc.).
