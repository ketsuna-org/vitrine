---
layout: doc
title: $repliedMessageID
translation_key: docs
category: "Entity Info"
function_name: repliedMessageID
syntax: $repliedMessageID[Channel ID;Message ID]
description: Returns the ID of the message that a given message replies to. Without argument, uses the message that triggered the command.
---

# $repliedMessageID

The `$repliedMessageID[Channel ID;Message ID]` function **retrieves the source message ID** of a message that is a reply. Without argument, it reads the message that triggered the command.

## Syntax

```
$repliedMessageID[Channel ID;Message ID]
```

## Parameters

| Parameter | Description |
|---|---|
| `Channel ID` | The channel of the message to read. |
| `Message ID` | The message whose replied message is wanted. |

The two arguments go together (or none at all): giving a single one raises the error "Replied message ID expects zero or two arguments.". Both IDs must be decimal numbers greater than zero, otherwise "Invalid Discord ID." is raised.

## Return Value

- **Type**: String (Snowflake ID)
- The ID of the message that the read message replies to.
- Empty string if the read message is not a reply.

## Behavior

- Without argument, the triggering message is fetched from Discord using the `channel.id` and `message.id` context variables; if they are not valid IDs the error `Invalid Discord ID.` is raised.
- With `Channel ID;Message ID`, that message is fetched instead (its channel must hold messages, else "Channel does not support messages.").
- Only a message whose Discord type is "reply" gives a value: it is the ID referenced by the reply.
- Returns the ID of the original message, not the one that was read.

## Examples

### Quote the replied message

```bdfd
$if[$repliedMessageID!=]
  $var[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[📝 Reply to a message]
  $description[
  **Original author:** $userName[$authorOfMessage[$channelID;$repliedMessageID]]
  **Message:** $var[msg]
  ]
$else
  $sendMessage[Please reply to a message to use this command.]
$endif
```

### Moderation by reply

```bdfd
$if[$repliedMessageID!=]
  $var[author;$authorOfMessage[$channelID;$repliedMessageID]]
  $title[⚠️ Report]
  $description[
  **Reported message:** ||$getMessage[$channelID;$repliedMessageID]||
  **Author:** $userName[$var[author]]
  **Reported by:** $userName[$authorID]
  ]
  $color[#ED4245]
  $sendMessage[Message reported.]
$else
  $sendMessage[Reply to a message to report it.]
$endif
```

### Replied message of a given message

```bdfd
$repliedMessageID[$channelID;$message[1]]
```

Returns the ID of the message that `$message[1]` answers, or nothing if it is not a reply.

### Quote and delete

```bdfd
$if[$repliedMessageID!=]
  $var[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[🗑️ Message deleted]
  $description[Message from **$userName[$authorOfMessage[$channelID;$repliedMessageID]]** deleted.\nContent: ||$var[msg]||]
  $deleteMessage[$channelID;$repliedMessageID]
$endif
```

## Notes

- Returns an empty string for a normal message that is not a reply.
- Without a triggering message (for example a slash command, where no `message.id` is supplied by the host) the lookup fails with an error instead of returning an empty string.
