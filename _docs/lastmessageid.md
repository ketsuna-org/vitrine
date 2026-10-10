---
layout: doc
title: $lastMessageID
translation_key: docs
category: "Entity Info"
function_name: lastMessageID
syntax: $lastMessageID
description: Returns the ID of the last message sent in the current channel.
---

# $lastMessageID

The function `$lastMessageID` returns the **ID of the last message** sent in the current channel.

## Syntax

```
$lastMessageID
```

## Parameters

None. `$lastMessageID` takes no argument and always targets the current channel.

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the last message in the channel, or an empty string if the channel has none. |

## Examples

### Last message of the current channel

```bdfd
$sendMessage[Last message in this channel: $lastMessageID]
```

### Check recent activity

```bdfd
$if[$lastMessageID==$messageID]
  $sendMessage[Your message is the last one in this channel!]
$endif
```

### Link to the last message

```bdfd
$sendMessage[Last message: https://discord.com/channels/$guildID/$channelID/$lastMessageID]
```

## Notes

- If the channel has no message, the result is an empty string.
- The channel is fetched from Discord using the current channel ID; a channel that cannot hold messages raises `Channel does not support messages.`

