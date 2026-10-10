---
layout: doc
title: $repliedMessageID
translation_key: docs
category: "Entity Info"
function_name: repliedMessageID
syntax: $repliedMessageID
description: Returns the ID of the message the user replied to. Allows referencing the source message in a command triggered by a reply.
---

# $repliedMessageID

The `$repliedMessageID` function allows **retrieving the source message ID** when a user replies to a message with a command.

## Syntax

```
$repliedMessageID
```

## Parameters

No parameters.

## Return Value

- **Type**: String (Snowflake ID)
- The ID of the message the triggering message replies to.
- Empty string if the triggering message is not a reply.
- The triggering message is fetched from Discord using the `channel.id` and `message.id` context variables; if they are not valid IDs the error `Invalid Discord ID.` is raised.

## Behavior

- Only a message whose Discord type is "reply" gives a value: it is the ID referenced by the reply.
- Returns the ID of the original message, not the command message.

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
