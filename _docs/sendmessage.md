---
layout: doc
title: $sendMessage
category: "Embed & Message"
function_name: sendMessage
api_type: bdfd
description: Explicit message send; ordinary slash replies can use text or embed mutations without this function.
---

# $sendMessage

`$sendMessage[content]` explicitly sends the supplied content together with the pending response's embeds and components. Content can be empty when an embed or components provide the message body.

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

## Explicit send

```bdfd
$sendMessage[Hello world!]
```

For another channel, read [$channelSendMessage](/docs/channelsendmessage/). The current compiler reads the first `$sendMessage` argument as content; do not use a second argument as a channel ID.

Use [Message Blocks](/docs/blocks-messages/) when editing visual actions: `respondWithMessage` handles interaction replies and `sendMessage` sends channel messages. See [Execution model](/docs/execution-model/) for the distinction between authoring modes.
