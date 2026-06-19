---
layout: doc
title: $channelName
translation_key: docs
category: "Entity Info"
function_name: channelName
syntax: $channelName[(channelID)]
description: Returns the name of the current Discord channel or of a specific channel via its ID.
---

# $channelName

The `$channelName` function returns the **name** of a Discord channel. By default, it returns the name of the channel where the command is executed, but it can also return the name of a specific channel if an ID is provided.

## Syntax

```
$channelName[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return value

| Type | Description |
|---|---|
| `string` | The name of the channel (e.g., `general`, `announcements`). |

## Examples

### Name of the current channel

```bdfd
$sendMessage[Welcome to #$channelName!]
```

### Name of a specific channel

```bdfd
$sendMessage[The channel is: $channelName[123456789012345678]]
```

### Check the name of a channel

```bdfd
$if[$channelName==general]
  $sendMessage[You are in the general channel.]
$endif
```

## Notes

- For text channels, the name is returned without the `#` prefix. Add it manually if needed.
- The name of voice channels is displayed in the same way (e.g., `Voice 1`).
- To list all channels, use `$channelNames`.
