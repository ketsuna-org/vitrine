---
layout: doc
title: $unpinMessage
translation_key: docs
category: "Moderation"
function_name: unpinMessage
syntax: $unpinMessage[channelID;messageID]
description: Removes a pinned message from the pinned messages list of the channel.
---

# $unpinMessage

The function `$unpinMessage[]` allows **removing a message from the pinned messages list** of a channel.

## Syntax

```
$unpinMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the message to unpin. |

## Return Value

None (empty string). An error is raised if an ID is invalid or if the bot lacks permissions.

## Behavior

- The bot must have the `VIEW_CHANNEL` and `PIN_MESSAGES` permissions in the channel.
- The message is not deleted, only unpinned.

## Examples

### Unpin After Action

```bdfd
$unpinMessage[$channelID;$noMentionMessage]
$sendMessage[Message unpinned.]
```

### Automatic Cleanup

```bdfd
$unpinMessage[$channelID;$messageID]
$editMessage[$channelID;$messageID;This message is no longer relevant.]
```

### Announcement Rotation

```bdfd
$unpinMessage[$channelID;$oldAnnouncementID]
$title[New Announcement]
$description[$noMentionMessage]
$sendMessage[New announcement posted]
$pinMessage[$messageID]
```

## Notes

- A message can be re-pinned after having been unpinned.
- Combine with `$pinMessage[]` to manage rotating announcements.
