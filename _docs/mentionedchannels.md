---
layout: doc
title: $mentionedChannels
translation_key: docs
category: "Entity Info"
function_name: mentionedChannels
syntax: $mentionedChannels[index;(returnCurrent)]
description: Returns the ID of the channel mentioned at the given position in the message (1, < for the first, > for the last).
---

# $mentionedChannels

The function `$mentionedChannels` returns the **ID of the channel mentioned** at a given position in the message, via the `#channel` syntax.

## Syntax

```
$mentionedChannels[index;(returnCurrent)]
```

## Parameters

| Parameter | Description |
|---|---|
| `index` | Required. Position of the mention: a positive integer (1 is the first), `<` for the first, `>` for the last. Any other value raises an error. |
| `returnCurrent` | Optional (`yes`/`no`, `true`/`false`). If no channel is mentioned at this position, return the ID of the current channel instead. Defaults to `no`. Any other value raises an error. |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- ID of the channel mentioned at the requested position
- Empty string if there is no such mention (or the current channel ID when `returnCurrent` is `yes`)

## Behavior

- `$mentionedChannels` requires at least one argument: a bare `$mentionedChannels` is invalid.
- Reads the channel mentions of the message; it raises an error in a slash command (use the command options instead).
- Returns a single ID per call; call it with several indexes to read several channels.

## Examples

### Check mentioned channels

```bdfd
$if[$mentionedChannels[1]!=]
  $sendMessage[At least one channel is mentioned.]
$else
  $sendMessage[No channels mentioned in this message.]
$endif
```

### Act on the first mentioned channel

```bdfd
$if[$mentionedChannels[1]!=]
  $sendMessage[First channel mentioned: <#$mentionedChannels[1]>]
$endif
```

### Last mentioned channel

```bdfd
$if[$mentionedChannels[>]!=]
  $sendMessage[Last channel mentioned: <#$mentionedChannels[>]>]
$endif
```

## Notes

- Channel mentions use the `#channel-name` format in Discord.
- The returned ID is a numeric snowflake.
- To get the name of a channel from its ID, use `$channelName[ID]`.

