---
layout: doc
translation_key: docs
category: "Embed & Message"
---

# $deleteMessage

Deletes a specific message, identified by its channel ID and message ID.

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

`$deleteMessage` fetches the message and deletes it immediately. It returns an empty string.

- Both IDs must be positive integers, otherwise the error `Invalid Discord ID.` is raised.
- The channel must be a text channel (`Channel does not support messages.` otherwise).
- In a server channel the bot needs permission to view the channel; to delete a message written by someone else it also needs `MANAGE_MESSAGES`. Its own messages can be deleted without it. Missing permissions raise `Missing permissions for the message operation.`
- In a direct message, only the bot's own messages can be deleted (`Cannot delete another user message in a direct message.`).

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

### Deletion of a specific message

```bdfd
$deleteMessage[$channelID;123456789012345678]
```

## Notes

- `channelId` and `messageId` are both required.
- Deleted messages cannot be recovered.
- `$sendMessage[text;yes]` returns the ID of the message it sent, which can be passed to `$deleteMessage`.
- To delete the command's own response after a delay, use `$deleteIn[]`; to delete the triggering message use `$deleteCommand`.
