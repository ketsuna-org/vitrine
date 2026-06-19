---
layout: doc
title: $mentionedChannels
translation_key: docs
category: "Entity Info"
function_name: mentionedChannels
syntax: $mentionedChannels
description: Returns the list of channel IDs mentioned in the message (via #channel), separated by commas.
---

# $mentionedChannels

The function `$mentionedChannels` returns the **list of channel IDs mentioned** in the message, via the `#channel` syntax.

## Syntax

```
$mentionedChannels
```

## Return Value

- **Type** : List of snowflakes separated by commas
- Example: `123456789,987654321`
- Empty string if no channels are mentioned

## Behavior

- `$mentionedChannels` takes **no arguments**.
- Detects channel mentions formatted as `#channel-name`.
- Returns the IDs of the mentioned channels.

## Examples

### Check mentioned channels

```bdfd
$if[$mentionedChannels!=]
  $let[channels;$splitText[$mentionedChannels;,]]
  $let[count;$arrayCount[$channels]]
  $sendMessage[$count channel(s) mentioned.]
$else
  $sendMessage[No channels mentioned in this message.]
$endif
```

### Act on the first mentioned channel

```bdfd
$if[$mentionedChannels!=]
  $let[firstChannel;$splitText[$mentionedChannels;,;1]]
  $sendMessage[First channel mentioned: <#$firstChannel>]
$endif
```

### Move a message

```bdfd
$if[$mentionedChannels!=]
  $let[target;$splitText[$mentionedChannels;,;1]]
  $sendMessage[Message to <#$target>]
$endif
```

## Notes

- Channel mentions use the `#channel-name` format in Discord.
- The returned IDs are numeric snowflakes.
- To get the name of a channel from its ID, use `$channelName[ID]`.

