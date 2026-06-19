---
layout: doc
title: $publishMessage
translation_key: docs
category: "Moderation"
function_name: publishMessage
syntax: $publishMessage[messageID]
description: Publishes a message to subscribed servers (announcement channel feature). Allows broadcasting a message beyond the original server.
---

# $publishMessage

The `$publishMessage[]` function allows **publishing a message** from an announcement channel to all subscribed servers.

## Syntax

```
$publishMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message to publish (must be in an announcement channel). |

## Return Value

This function does not return a value.

## Behavior

- Requires a channel of type **announcement** (type 5).
- The bot must have the `MANAGE_MESSAGES` or `SEND_MESSAGES` permission in the announcement channel.
- The message is broadcast to all servers that follow this announcement channel.
- Publishing may take a few seconds.

## Examples

### Publish an announcement

```bdfd
$title[📢 Bot update]
$description[
**New version:** 2.0.0
**Changes:**
- New !help command
- Bug fixes
- Improved performance
]
$color[#5865F2]
$channelSendMessage[$announcementChannel;]
$publishMessage[$messageID]
$sendMessage[Announcement published!]
```

### Conditional publication

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $title[Announcement from $username]
  $description[$noMentionMessage]
  $footer[Published by $username]
  $channelSendMessage[$announcementChannel;]
  $publishMessage[$messageID]
  $sendMessage[✅ Announcement published successfully.]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

## Notes

- Only messages in announcement channels can be published.
- Subscribed servers see the message in their dedicated announcement channel.
- Publishing is irreversible: the message cannot be "unpublished".
- Ideal for bot updates, changelogs, and community announcements.
