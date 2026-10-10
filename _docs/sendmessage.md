---
layout: doc
title: $sendMessage
category: "Embed & Message"
function_name: sendMessage
syntax: $sendMessage[content;(returnMessageID)]
api_type: bdfd
description: Explicit message send of a separate channel message; ordinary slash replies can use text or embed mutations without this function.
---

# $sendMessage

`$sendMessage[content;(returnMessageID)]` explicitly sends the supplied content as a distinct channel message. It does not consume the pending response draft (embeds, components) and does not update an already acknowledged interaction response.

## Parameters

| Parameter | Required | Default | Description |
|---|---|---|---|
| `content` | Yes | — | Text of the message. An empty content raises the error "Message text is required." |
| `returnMessageID` | No | `no` | `yes`/`true` makes the function return the ID of the sent message; `no`/`false` returns an empty string. Any other value raises an error. |

The message is sent to the channel selected with `$useChannel` if any, otherwise to the current channel. A bare `$sendMessage` or `$sendMessage[]` is refused: at least one argument is required, and an empty content is an error.

## Slash commands do not require an explicit send

This is a complete BDFD slash response:

```bdfd
Hello $username!
```

This is a complete embed-only response:

```bdfd
$title[Announcement]
$description[This is an important announcement.]
$color[#FF0000]
```

The compiler emits the pending response automatically. Do not append an empty send to every example. Keep the mutations belonging to one response together; action boundaries can flush a pending response.

## Examples: Explicit Send

```bdfd
$sendMessage[Hello world!]
```

For another channel, read [$channelSendMessage](/docs/channelsendmessage/). The second `$sendMessage` argument is the `returnMessageID` flag (`yes`/`no`), not a channel ID.

Use [Message Blocks](/docs/blocks-messages/) when editing visual actions: `respondWithMessage` handles interaction replies and `sendMessage` sends channel messages. See [Execution model](/docs/execution-model/) for the distinction between authoring modes.
