---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $reply

Marks the message as a reply to an existing message. Used before `$sendMessage`.

## Syntax

### Reply to the user's message (0 arguments)

```
$reply
```

### Reply to a specific message

```
$reply[channelId;messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:--------:|
| `channelId` | ID of the channel containing the target message | No* |
| `messageId` | ID of the message to reply to | No* |

*\* Required only to reply to a specific message in a specific channel.*

## Description

`$reply` is a **flag** used before `$sendMessage`. It indicates that the message should be sent as a reply (Discord replies), which displays the original message above the reply.

Without arguments, `$reply` replies to the message that triggered the command or interaction.

## Examples

### Simple reply

```
$reply
$sendMessage[Here is your reply!]
```

### Reply to a specific message

```
$reply[$channelID;123456789012345678]
$sendMessage[Reply to a specific message]
```

### Reply in $onInteraction

```
$onInteraction
$if[$customID==btn_help]
  $reply
  $sendMessage[Here is the requested help]
$endif
```

### Reply with embeds

```
$reply
$newEmbed[title=Reply;description=Reply details;color=#3498DB]
$sendMessage[]
```

## Notes

- Without arguments, `$reply` automatically uses the triggering message.
- `$reply` must be placed before `$sendMessage`.
- The reply pings the user by default. Use `$noMention` before to disable the ping.
- Also works in `$onInteraction`.
