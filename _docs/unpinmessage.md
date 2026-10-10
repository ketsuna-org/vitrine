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

- The bot must have the `View Channel` and `Pin Messages` permissions in the channel (error `Missing permissions for the message operation.` otherwise).
- The message is fetched first: an ID that does not exist or a channel that does not support messages raises an error.
- The message is not deleted, only unpinned.

## Examples

### Unpin After Action

```bdfd
$unpinMessage[$channelID;$noMentionMessage]
$sendMessage[Message unpinned.]
```

### Unpin by ID

```bdfd
$unpinMessage[$channelID;$noMentionMessage]
$sendMessage[Message $noMentionMessage is no longer pinned.]
```

### Announcement Rotation

```bdfd
$unpinMessage[$channelID;123456789012345678]
$title[New Announcement]
$description[$noMentionMessage]
$sendMessage[New announcement posted]
$pinMessage
```

## Notes

- A message can be re-pinned after having been unpinned.
- Combine with `$pinMessage[]` to manage rotating announcements.
