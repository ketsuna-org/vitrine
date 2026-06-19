---
layout: doc
title: $channelID
translation_key: docs
category: "Entity Info"
function_name: channelID
syntax: $channelID
description: Returns the ID of the Discord channel in which the command is executed.
---

# $channelID

The `$channelID` function returns the **unique identifier** (snowflake) of the Discord channel in which the command is currently executed.

## Syntax

```
$channelID
```

## Parameters

No parameters.

## Return value

| Type | Description |
|---|---|
| `snowflake` | The ID of the current channel, in the form of a numeric string (e.g., `123456789012345678`). |

## Examples

### Display the ID of the channel

```bdfd
$sendMessage[ID of this channel: $channelID]
```

### Link direct vers the channel

```bdfd
$sendMessage[Link to the channel: https://discord.com/channels/$guildID/$channelID]
```

### Compareason with a channel specific

```bdfd
$if[$channelID==123456789012345678]
  $sendMessage[This is the channel principal !]
$else
  $sendMessage[You are in the channel $channelID]
$endif
```

## Notes

- The returned ID is that of the channel where the command was **triggered**, even if the bot subsequently interacts with other channels.
- In direct messages (DMs), `$channelID` returns the ID of the DM channel.
- Useful to combine with `$findChannel` or `$channelSendMessage` for multi-channel operations.
