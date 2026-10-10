---
layout: doc
title: $channelName
translation_key: docs
category: "Entity Info"
function_name: channelName
syntax: $channelName[channelID]
description: Returns the name of a Discord channel from its ID.
---

# $channelName

The `$channelName` function returns the **name** of a Discord channel. The channel ID is required; use `$channelID` to target the channel where the command is executed.

## Syntax

```
$channelName[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the target channel. An invalid ID raises `Invalid channel ID.` and an unknown channel raises `Channel not found.` |

## Return value

| Type | Description |
|---|---|
| `string` | The name of the channel (e.g., `general`, `announcements`). |

## Examples

### Name of the current channel

```bdfd
$sendMessage[Welcome to #$channelName[$channelID]!]
```

### Name of a specific channel

```bdfd
$sendMessage[The channel is: $channelName[123456789012345678]]
```

### Check the name of a channel

```bdfd
$if[$channelName[$channelID]==general]
  $sendMessage[You are in the general channel.]
$endif
```

## Notes

- For text channels, the name is returned without the `#` prefix. Add it manually if needed.
- The name of voice channels and categories is returned in the same way (e.g., `Voice 1`).
- To list all channels, use `$channelNames[separator]`.
