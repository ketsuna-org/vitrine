---
layout: doc
title: $noMentionMessage
translation_key: docs
category: "Variables"
function_name: noMentionMessage
syntax: $noMentionMessage
description: Gets the content of the message with user, role and channel mentions removed.
---
# $noMentionMessage

The function `$noMentionMessage` returns the **message content** with all user, role and channel mentions removed.

## Syntax

```
$noMentionMessage
```

## Parameters

None.

## Return Value

- **Type** : String
- The message content (`message.cleanContent`, or `message.content` if it is not set) with the mentions removed. For a prefix command this content is the text after the command name.

## Behavior

- `<@userID>`, `<@!userID>` and `<@&roleID>` (user and role mentions) are deleted from the text.
- `<#channelID>` (channel mentions) are deleted from the text.
- Nothing is replaced by a name: the mention is simply removed, and the spaces around it are kept.
- Other text is left untouched (including `@everyone`, `@here` and custom emojis).
- Takes no argument.

## Examples

### Logging a message without its mentions

```bdfd
$channelSendMessage[123456789;Message from $username: $noMentionMessage]
```

### Say command without mentions

```bdfd
$sendMessage[$noMentionMessage]
```

### Relaying a message

```bdfd
$useChannel[123456789]
$title[Relayed message from $username]
$description[$noMentionMessage]
$footer[From channel $channelID]
```

## Notes

- Unlike `$message`, the mentions are removed from the text.
- If nothing is left after removing the mentions, the result is empty (for example `$sendMessage[$noMentionMessage]` then fails because a message text is required).
