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
- The ID of the message the user replied to.
- Empty string if the command was not triggered via reply.

## Behavior

- Works when the user right-clicks → "Reply" on a message and types the command.
- Returns the ID of the original message, not the command message.
- Useful for contextual moderation commands.

## Examples

### Quote the replied message

```bdfd
$if[$repliedMessageID!=]
  $let[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[📝 Reply to a message]
  $description[
  **Original author:** $userName[$messageAuthorID[$channelID;$repliedMessageID]]
  **Message:** $msg
  ]
  $sendMessage[]
$else
  $sendMessage[Please reply to a message to use this command.]
$endif
```

### Moderation by reply

```bdfd
$if[$repliedMessageID!=]
  $let[author;$messageAuthorID[$channelID;$repliedMessageID]]
  $title[⚠️ Report]
  $description[
  **Reported message:** ||$getMessage[$channelID;$repliedMessageID]||
  **Author:** $userName[$author]
  **Reported by:** $userName[$authorID]
  ]
  $color[#ED4245]
  $sendMessage[$channelID[mod-logs]]
$else
  $sendMessage[Reply to a message to report it.]
$endif
```

### Quote and delete

```bdfd
$if[$repliedMessageID!=]
  $let[msg;$getMessage[$channelID;$repliedMessageID]]
  $title[🗑️ Message deleted]
  $description[Message from **$userName[$messageAuthorID[$channelID;$repliedMessageID]]** deleted.\nContent: ||$msg||]
  $deleteMessage[$channelID;$repliedMessageID]
  $sendMessage[]
$endif
```

## Notes

- Only works if the command is triggered via Discord reply.
- Returns an empty string in other cases (normal message, slash command, etc.).
- Convenient for contextual commands without having to manually provide an ID.
