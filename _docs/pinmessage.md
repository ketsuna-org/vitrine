---
layout: doc
title: $pinMessage
translation_key: docs
category: "Moderation"
function_name: pinMessage
syntax: $pinMessage
description: Pins the message sent by the current script's response. The message will appear in the channel's pinned messages list.
---

# $pinMessage

The `$pinMessage` function **pins the message sent by the script** (the response of the command) in its channel. Pinned messages appear in the dedicated section of the channel.

## Syntax

```
$pinMessage
```

## Parameters

None. `$pinMessage` takes no arguments (`$pinMessage[messageID]` is refused).

## Return Value

This function does not return a value.

## Behavior

- The pin is deferred: it is applied to the main response of the script (not to messages sent separately with `$sendMessage`), once that response has been sent.
- The script output must support deferred pinning, otherwise an error is raised; an error is also raised if the sent message has no usable channel/message ID.
- The bot needs the `Pin Messages` permission in the channel.
- To pin or unpin an arbitrary message by ID, use the functions that take `channelID` and `messageID` (for example `$unpinMessage[channelID;messageID]`).

## Examples

### Pin an announcement

```bdfd
$title[📢 Important announcement]
$description[$noMentionMessage]
$color[#FEE75C]
$pinMessage
```

### Pin a text response

```bdfd
This message will be pinned.
$pinMessage
```

### Conditional pinning

```bdfd
$if[$checkUserPerms[$authorID;Administrator]==true]
  $description[$noMentionMessage]
  $pinMessage
  $addCmdReactions[📌]
$else
  $sendMessage[Only administrators can pin.]
$endif
```

## Notes

- To unpin, use `$unpinMessage[]`.
- Pinned messages remain visible even after years.
