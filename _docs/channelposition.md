---
layout: doc
title: $channelPosition
translation_key: docs
category: "Entity Info"
function_name: channelPosition
syntax: $channelPosition[(channelID)]
description: Returns the position of a channel in the Discord channel list.
---

# $channelPosition

The `$channelPosition` function returns the **position** value that Discord reports for a server channel.

## Syntax

```
$channelPosition[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. An ID that is not a positive number raises `Invalid channel ID.`, an unknown channel raises `Channel not found.` |

## Return value

| Type | Description |
|---|---|
| `integer` | The `position` of the channel as given by Discord. An empty string for a channel that has no position (for example a direct message). |

## Examples

### Display the position

```bdfd
$sendMessage[This channel is at position $channelPosition]
```

### Compare positions

```bdfd
$if[$channelPosition==0]
  $sendMessage[This channel has position 0.]
$else
  $sendMessage[This channel is at position #$channelPosition]
$endif
```

## Notes

- The value is the raw Discord `position` of the channel; the engine does not renumber it.
- The position can change if an administrator reorganizes the channels.
