---
layout: doc
title: $pinMessage
translation_key: docs
category: "Moderation"
function_name: pinMessage
syntax: $pinMessage[Channel ID;Message ID]
description: Pins a message from its channel and message ID. Without argument, pins the message sent by the current script's response.
---

# $pinMessage

The `$pinMessage[Channel ID;Message ID]` function **pins the given message right away**. Without argument, `$pinMessage` pins **the message sent by the script** (the response of the command). Pinned messages appear in the dedicated section of the channel.

## Syntax

```
$pinMessage[Channel ID;Message ID]
```

## Parameters

| Parameter | Description |
|---|---|
| `Channel ID` | The channel of the message. |
| `Message ID` | The message to pin. |

The two arguments go together: giving a single one raises the error "Pin message expects zero or two arguments.". Both IDs must be decimal numbers greater than zero, otherwise "Invalid Discord ID." is raised.

## Return Value

This function does not return a value (empty string).

## Behavior

- **With `Channel ID;Message ID`**: the message is pinned immediately; it can be any message of the channel, not only the bot's own. The channel must hold messages ("Channel does not support messages." otherwise). In a server channel, the bot needs the `View Channel` and `Pin Messages` permissions, otherwise "Missing permissions for the message operation." is raised.
- **Without argument** (`$pinMessage`): the pin is deferred. It is applied to the main response of the script (not to messages sent separately with `$sendMessage`), once that response has been sent. The script output must support deferred pinning, otherwise an error is raised; an error is also raised if the sent message has no usable channel/message ID. The bot needs the `Pin Messages` permission in the channel.
- A response left empty (no text, embed or component) sends nothing, but the deferred pin is kept for the main response that follows.

## Examples

### Pin a given message

```bdfd
$pinMessage[$channelID;$message[1]]
Message pinned.
```

### Pin an announcement (the response itself)

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

- To unpin, use `$unpinMessage[Channel ID;Message ID]`.
