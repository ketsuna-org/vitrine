---
layout: doc
title: $channelID
translation_key: docs
category: "Entity Info"
function_name: channelID
syntax: $channelID[(channelName)]
description: Without argument, returns the ID of the channel in which the command is executed (`none` in a DM). With a channel name, looks the channel up by name.
---

# $channelID

The `$channelID` function returns the **unique identifier** (snowflake) of the Discord channel in which the command is currently executed. With an optional channel name, it instead looks up a channel of the server by name.

## Syntax

```
$channelID[(channelName)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelName` | Optional. The exact name of a channel of the current server (case-sensitive, surrounding spaces removed, without `#`). Active threads are searched as well as channels. An empty name raises `Channel name is required.` |

## Return value

| Type | Description |
|---|---|
| `snowflake` | Without argument: the ID of the current channel, in the form of a numeric string (e.g., `123456789012345678`), or `none` in a direct message. With a name: the ID of the first channel with that exact name, or an empty string if there is none. |

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
- In direct messages (DMs) (channel type `dm`/`group_dm`, or no server in the context), `$channelID` without argument returns the text `none`, not the DM channel ID.
- With a name argument, only the channels of the current server are searched. `$channelIDFromName[name]` does the same lookup.
- Useful to combine with `$findChannel` or `$channelSendMessage` for multi-channel operations.
