---
layout: doc
title: $channelSendMessage
translation_key: docs
category: "Moderation"
function_name: channelSendMessage
syntax: $channelSendMessage[channelID;content;(replyMessageID)]
description: Sends a text message in a specific channel. Unlike $sendMessage which responds in the current channel, this function targets any channel.
---

# $channelSendMessage

The `$channelSendMessage[]` function **sends a text message to a specific channel**, which can be different from the channel where the command was executed.

## Syntax

```
$channelSendMessage[channelID;content;(replyMessageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. Required (trimmed); an empty value raises an error. |
| `content` | The text of the message. Required: an empty or whitespace-only value raises the error `Channel and content are required.` |
| `replyMessageID` | Optional. If not empty, the message is sent as a reply to the message with this ID. |

## Return value

None (empty string). The ID of the sent message is **not** returned.

## Behavior

- Before sending, the response being built so far (text outside functions, embeds, buttons...) is **sent first to the current channel** and cleared. Embed functions (`$title`, `$description`, ...) placed before `$channelSendMessage[]` are therefore not attached to the message sent to `channelID`; the message sent by `$channelSendMessage[]` only carries `content`.
- To send an embed to another channel, use `$useChannel[channelID]` before building the response, or `$sendEmbedMessage[]`.
- If Discord rejects the message (inaccessible channel, missing permissions), an error is raised.

## Examples

### Moderation logs

```bdfd
$var[logChannel;123456789012345678]
$channelSendMessage[$var[logChannel];Moderator: $username | Action: Ban | User: $userName[$mentioned[1]] | Reason: $noMentionMessage]
$sendMessage[User banned.]
```

### Welcome notification

```bdfd
$var[welcomeChannel;123456789012345678]
$channelSendMessage[$var[welcomeChannel];👋 Welcome to **$serverName**, $username! You are member #$membersCount!]
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

- `$channelSendMessage[]` does not respond to the user: combine it with `$sendMessage[]` to provide feedback.
- To retrieve a message, use `$getMessage[]`.
