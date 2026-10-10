---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $reply

Sends the command's main response as a reply to an existing message.

## Syntax

### Reply to the triggering message (0 arguments)

```bdfd
$reply
```

### Reply to a specific message

```bdfd
$reply[channelId;messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `channelId` | ID of the channel containing the target message (the reply is sent there) | No* |
| `messageId` | ID of the message to reply to | No* |

*\* Either both arguments or none. Giving a single argument is an error (`Reply expects zero or two arguments.`), and so is an empty channel or message ID (`Reply channel and message are required.`).*

## Description

`$reply` is a **flag** on the command's **main response** (the text, embeds and components built by the command itself). That response is sent as a Discord reply, which displays the original message above it.

- Without arguments, the response replies to the message that triggered the command. If there is no triggering message, sending fails with `No message available to reply to.`
- With `channelId` and `messageId`, the response is sent in that channel as a reply to that message.

`$reply` does **not** affect messages sent with `$sendMessage[]`: those are separate messages, sent as plain channel messages.

## Examples

### Simple reply

```bdfd
$reply
Here is your reply!
```

### Reply to a specific message

```bdfd
$reply[$channelID;123456789012345678]
Reply to a specific message
```

### Reply with embeds

```bdfd
$reply
$title[Reply]
$description[Reply details]
$color[#3498DB]
```

### Reply without notification

```bdfd
$reply
$noMention
Here is your reply, without a ping.
```

## Notes

- The flag applies to the main response, wherever `$reply` is placed in the code.
- Use `$noMention` to restrict the mentions of the response (it sets the allowed mentions to none).
