---
layout: doc
title: $voiceUserLimit
translation_key: docs
category: "Moderation"
function_name: voiceUserLimit
syntax: $voiceUserLimit[(channelID)]
description: Returns the user limit recorded for the channel of the current command (0 when there is none). The optional channel ID is only checked, not used to select the channel.
---

# $voiceUserLimit

The `$voiceUserLimit` function returns the **user limit** value of the channel in which the command runs (the `channel.userLimit` runtime variable).

## Syntax

```
$voiceUserLimit[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional - The ID of a channel. It must be a valid ID of an existing channel (`Invalid channel ID.` / `Channel not found.` otherwise), but in the current engine it **does not change the returned value**: the limit of the channel of the current command is always returned. If omitted, the current channel is checked. |

## Return Value

- **Type**: String (number)
- The value of `channel.userLimit` for the channel of the current command, as provided by Discord for that channel.
- `0` if the runtime has no user limit value for the channel (for example a channel type that has no user limit).

## Examples

### Showing the limit of the current channel

```bdfd
$if[$voiceUserLimit==0]
  No user limit value is available for this channel.
$else
  This channel is limited to **$voiceUserLimit** users.
$endif
```

### Embed

```bdfd
$title[🔊 Channel info]
$description[**Limit:** $voiceUserLimit (0 when no limit value is available)]
$color[#5865F2]
```

## Notes

- To read the limit of a voice channel, run the command from that channel (for example in the text chat of the voice channel): the returned value always comes from the channel of the command, whatever `channelID` is given.
- The function needs a channel service to check the channel; without it the call fails.
