---
layout: doc
title: $unpinMessage
translation_key: docs
category: "Moderation"
function_name: unpinMessage
syntax: $unpinMessage[messageID]
description: Removes a pinned message from the pinned messages list of the channel.
---

# $unpinMessage

The function `$unpinMessage[]` allows **removing a message from the pinned messages list** of a channel.

## Syntax

```
$unpinMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message to unpin. |

## Return Value

This function does not return a value.

## Behavior

- The bot must have the `MANAGE_MESSAGES` permission.
- The message is not deleted, only unpinned.
- If the message is not pinned, nothing happens.

## Examples

### Unpin After Action

```bdfd
$unpinMessage[$noMentionMessage]
$sendMessage[Message unpinned.]
```

### Automatic Cleanup

```bdfd
$unpinMessage[$messageID]
$editMessage[This message is no longer relevant.]
```

### Announcement Rotation

```bdfd
$unpinMessage[$oldAnnouncementID]
$title[New Announcement]
$description[$noMentionMessage]
$sendMessage[]
$pinMessage[$messageID]
```

## Notes

- Users are not notified when a message is unpinned.
- A message can be re-pinned after having been unpinned.
- Combine with `$pinMessage[]` to manage rotating announcements.
