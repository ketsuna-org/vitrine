---
layout: doc
title: $useChannel
translation_key: docs
category: "Variables"
function_name: useChannel
syntax: $useChannel[channelID]
description: Changes the destination channel of the messages sent by the rest of the command ($sendMessage and the final response). It does not change $channelID.
---
# $useChannel

The function `$useChannel[]` **changes the destination channel** of the messages produced by the rest of the command: `$sendMessage` and the final response of the command (text, embeds, components) are sent to the specified channel.

## Syntax

```
$useChannel[channelID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the target channel (surrounding spaces are ignored). An empty value raises the error `Channel is required.` The value is not validated by `$useChannel` itself. |

## Return Value

None (empty string).

## Behavior

- Before changing the channel, the response built so far (text, embeds) is sent to the previous destination. Only what comes after goes to the new channel.
- Affects `$sendMessage` and the final response (`$title`, `$description`, etc.) from this point to the end of the command.
- Does not change `$channelID`, which still returns the channel of the command.
- The change is local to the current command execution.

## Examples

### Redirect Logs

```bdfd
$var[logChannel;123456789012345678]
$useChannel[$var[logChannel]]
$title[📋 Command Log]
$description[
**User:** $username
**Command:** $message
**Channel:** <#$channelID>
**Date:** $day/$month/$year
]
$color[#5865F2]
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
- Calling `$useChannel` again replaces the destination.
