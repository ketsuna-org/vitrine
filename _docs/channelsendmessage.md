---
layout: doc
title: $channelSendMessage
translation_key: docs
category: "Moderation"
function_name: channelSendMessage
syntax: $channelSendMessage[channelID;content]
description: Sends a message in a specific channel. Unlike $sendMessage which responds in the current channel, this function targets any channel.
---

# $channelSendMessage

The `$channelSendMessage[]` function **sends a message to a specific channel**, which can be different from the channel where the command was executed.

## Syntax

```
$channelSendMessage[channelID;content]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. |
| `content` | The content of the message (markdown, mentions, and emojis are supported). Max 2000 characters. |

## Return value

- **Type**: Snowflake (string)
- The ID of the sent message.
- Empty string on failure (inaccessible channel, missing permissions).

## Behavior

- The bot must have access to the target channel and the `SEND_MESSAGES` permission.
- The message is sent like a normal message from the bot.
- Embed functions (`$title`, `$description`, etc.) placed before `$channelSendMessage[]` will be applied.

## Examples

### Moderation logs

```bdfd
$let[logChannel;123456789012345678]
$title[⚠️ Moderation Action]
$description[
**Moderator:** $username
**Action:** Ban
**User:** $userName[$mentioned[1]]
**Reason:** $noMentionMessage
]
$color[#ED4245]
$channelSendMessage[$logChannel;]
$sendMessage[User banned.]
```

### Welcome notification

```bdfd
$let[welcomeChannel;123456789]
$title[👋 Welcome!]
$description[Welcome to **$serverName**, $username! You are member #$membersCount!]
$thumbnail[$authorAvatar]
$color[#57F287]
$channelSendMessage[$welcomeChannel;]
```

### Send to a mentioned channel

```bdfd
$if[$mentionedChannels[1]!=]
  $channelSendMessage[$mentionedChannels[1];Message forwarded by $username:
>>> $noMentionMessage]
  $sendMessage[Message sent to <#$mentionedChannels[1]>]
$else
  $sendMessage[No channel mentioned.]
$endif
```

## Notes

- `$channelSendMessage[]` does not respond to the user — combine it with `$sendMessage[]` to provide feedback.
- Maximum of 2000 characters per message.
- To retrieve a message, use `$getMessage[]`.
