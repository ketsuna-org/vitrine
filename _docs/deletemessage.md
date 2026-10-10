---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Deletes a specific message. The bot must have permission to manage messages in the channel.

## Syntax

```bdfd
$deleteMessage[channelId;messageId]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `channelId` | ID of the channel containing the message | Yes |
| `messageId` | ID of the message to delete | Yes |

## Description

`$deleteMessage` permanently deletes a Discord message. The bot must have the `MANAGE_MESSAGES` permission to delete other users' messages. It can always delete its own messages.

## Examples

### Deletion of the triggering message

```bdfd
$deleteMessage[$channelID;$messageID]
Command executed discreetly.
```

### Deletion after action

```bdfd
$var[sentID;$sendMessage[Processing...;yes]]
$wait[3s]
$deleteMessage[$channelID;$var[sentID]]
$sendMessage[Processing complete!]
```

### Deletion in an interaction

```bdfd
$if[$customID==btn_delete]
  $deleteMessage[$channelID;$messageID]
  $sendMessage[Message deleted][ephemeral]
$endif
```

### Deletion of a specific message

```bdfd
$deleteMessage[$channelID;123456789012345678]
```

## Notes

- The `channelId` and `messageId` parameters are required.
- The bot must have `MANAGE_MESSAGES` to delete other users' messages.
- Deleted messages cannot be recovered.
- To delete the user's message that triggered the command, use `$deleteMessage[$channelID;$messageID]`.
- After deletion, it is common to send an ephemeral confirmation.
