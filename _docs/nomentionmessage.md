---
layout: doc
title: $noMentionMessage
translation_key: docs
category: "Variables"
function_name: noMentionMessage
syntax: $noMentionMessage
description: Gets the content of the message without mentions. Replaces mentions of users, roles, and channels with their textual names.
---
# $noMentionMessage

The function `$noMentionMessage` returns the **message content** by replacing all mentions with their plain text equivalents.

## Syntax

```
$noMentionMessage
```

## Parameters

None.

## Return Value

- **Type** : String
- The message with mentions converted.

## Behavior

- `<@userID>` → `@username`
- `<#channelID>` → `#channel-name`
- `<@&roleID>` → `@role-name`
- Prevents unwanted pings in logs or relayed messages.

## Examples

### Logging without pinging

```bdfd
$let[logChannel;123456789]
$title[📋 New Message]
$description[
**Author:** $username
**Content:** $noMentionMessage
]
$channelSendMessage[$logChannel;]
```

### Secure say command

```bdfd
$sendMessage[$noMentionMessage]
```

### Relaying a message

```bdfd
$title[Relayed message from $username]
$description[$noMentionMessage]
$footer[From <#$channelID>]
$channelSendMessage[123456789;]
```

## Notes

- `$noMentionMessage` prevents the bot from accidentally pinging users.
- Unlike `$message`, mentions are resolved to names.
- To completely disable mentions, combine with `$suppressMentions`.
