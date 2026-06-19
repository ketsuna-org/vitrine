---
layout: doc
title: $pinMessage
translation_key: docs
category: "Moderation"
function_name: pinMessage
syntax: $pinMessage[messageID]
description: Pins a message in the current channel. The message will appear in the channel's pinned messages list.
---

# $pinMessage

The `$pinMessage[]` function allows **pinning a message** in its channel. Pinned messages appear in the dedicated section of the channel.

## Syntax

```
$pinMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the message to pin. |

## Return Value

This function does not return a value.

## Behavior

- The bot must have the `MANAGE_MESSAGES` permission.
- Maximum 50 pinned messages per channel.
- Pinning works in the channel where the message is located.

## Examples

### Pin an announcement

```bdfd
$title[📢 Important announcement]
$description[$noMentionMessage]
$color[#FEE75C]
$sendMessage[]
$pinMessage[$messageID]
```

### Pin a specific message

```bdfd
$pinMessage[$mentionedMessage]
$sendMessage[Message pinned!]
```

### Conditional pinning

```bdfd
$if[$checkContains[$userPerms;Administrator]==true]
  $pinMessage[$noMentionMessage]
  $addCmdReactions[📌]
$else
  $sendMessage[Only administrators can pin.]
$endif
```

## Notes

- Discord notifies the concerned users when a message is pinned.
- To unpin, use `$unpinMessage[]`.
- Pinned messages remain visible even after years.
