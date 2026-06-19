---
layout: doc
title: $useChannel
translation_key: docs
category: "Variables"
function_name: useChannel
syntax: $useChannel[channelID]
description: Changes the channel context for the current command. Subsequent functions (like $sendMessage) will execute in this channel.
---
# $useChannel

The function `$useChannel[]` **changes the channel context** for the rest of the command execution. All functions that interact with "the current channel" (like `$sendMessage`) will then use the specified channel.

## Syntax

```
$useChannel[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. |

## Return Value

None. The context is modified.

## Behavior

- Changes the current channel for **the entire remainder** of the command.
- Affects `$sendMessage`, `$title`, `$description`, etc.
- The change is local to the current command execution.

## Examples

### Redirect Logs

```bdfd
$let[logChannel;123456789012345678]
$useChannel[$logChannel]
$title[📋 Command Log]
$description[
**User:** $username
**Command:** $message
**Channel:** <#$channelID>
**Date:** $day/$month/$year
]
$color[#5865F2]
$sendMessage[]
```

### Send a Cross Notification

```bdfd
$useChannel[$dmChannelID[$authorID]]
$sendMessage[Your ticket has been created! A staff member will contact you soon.]
```

### Response in an Announcement Channel

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $useChannel[123456789]
  $sendMessage[@everyone Important announcement: $noMentionMessage]
$else
  $sendMessage[Permission denied.]
$endif
```

## Notes

- `$channelSendMessage[]` is often safer for one-off sends without changing the entire context.
- Use `$useChannel[]` when several functions need to execute in the same target channel.
- The original channel is "forgotten" for the rest of the command.
