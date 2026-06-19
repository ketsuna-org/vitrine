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

The `$channelPosition` function returns the **position** of a channel in the server's channel list. Position `0` corresponds to the topmost channel, and the numbers increase as you go down.

## Syntax

```
$channelPosition[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `integer` | The position of the channel in the list (0 = at the top). |

## Examples

### Display the position

```bdfd
$sendMessage[This channel is at position $channelPosition]
```

### Comparer les positions

```bdfd
$if[$channelPosition==0]
  $sendMessage[This channel is at the very top of the server!]
$else
  $sendMessage[This channel is at position #$channelPosition]
$endif
```

### Top channel in a category

```bdfd
$sendMessage[Position in the category: $channelPosition]
```

## Notes

- The position is relative to the display order in Discord.
- Categories have their own positioning system.
- The position can change if an administrator reorganizes the channels.
- Channels are sorted by position within their parent category.
