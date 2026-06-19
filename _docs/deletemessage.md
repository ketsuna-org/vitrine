---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Deletes a specific message. The bot must have permission to manage messages in the channel.

## Syntax

```
$deleteMessage[messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `messageId` | ID of the message to delete | Yes |

## Description

`$deleteMessage` permanently deletes a Discord message. The bot must have the `MANAGE_MESSAGES` permission to delete other users' messages. It can always delete its own messages.

## Examples

### Deletion of the triggering message

```
$deleteMessage[$messageID]
Command executed discreetly.
```

### Deletion after action

```
$sendMessage[Processing...]
$wait[3s]
$deleteMessage[$sentMessageId]
$sendMessage[Processing complete!]
```

### Deletion in an interaction

```
$onInteraction
$if[$customID==btn_delete]
  $deleteMessage[$messageID]
  $sendMessage[Message deleted][ephemeral]
$endif
```

### Deletion of a specific message

```
$deleteMessage[123456789012345678]
```

## Notes

- The `messageId` parameter is required.
- The bot must have `MANAGE_MESSAGES` to delete other users' messages.
- Deleted messages cannot be recovered.
- To delete the user's message that triggered the command, use `$messageID`.
- After deletion, it is common to send an ephemeral confirmation.
