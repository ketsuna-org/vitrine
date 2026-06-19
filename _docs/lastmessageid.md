---
layout: doc
title: $lastMessageID
translation_key: docs
category: "Entity Info"
function_name: lastMessageID
syntax: $lastMessageID[(channelID)]
description: Returns the ID of the last message sent in the current channel or in a specified channel.
---

# $lastMessageID

The function `$lastMessageID` returns the **ID of the last message** sent in a Discord channel. By default, it targets the current channel.

## Syntax

```
$lastMessageID[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the last message in the channel. |

## Examples

### Last message of the current channel

```bdfd
$sendMessage[Last message in this channel: $lastMessageID]
```

### Last message of a specific channel

```bdfd
$sendMessage[Activity in #announcements: last message $lastMessageID[123456789012345678]]
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

- If the channel is empty (no messages), the behavior may vary.
- Useful for monitoring activity or linking to the last message.
- The bot must have access to the channel to retrieve this information.

