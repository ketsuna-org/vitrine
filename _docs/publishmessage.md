---
layout: doc
title: $publishMessage
translation_key: docs
category: "Moderation"
function_name: publishMessage
syntax: $publishMessage[channelID;messageID]
description: Publishes a message of an announcement channel to the servers that follow it.
---

# $publishMessage

The `$publishMessage[]` function allows **publishing a message** (crossposting) from an announcement channel to all subscribed servers.

## Syntax

```
$publishMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the announcement channel containing the message. |
| `messageID` | Required. The ID of the message to publish. |

Both arguments must be valid IDs, otherwise an error is raised.

## Return Value

This function does not return a value.

## Behavior

- Requires a channel of type **announcement**; otherwise an error is raised ("Publishing requires an announcement channel").
- The bot must have the `View Channel` and `Send Messages` permissions in the channel, plus `Manage Messages` if the message was not sent by the bot itself.
- The message is broadcast to all servers that follow this announcement channel.

## Examples

### Publish an announcement

```bdfd
$var[announcement;$sendMessage[New version 2.0.0 is out: new !help command, bug fixes and improved performance.;yes]]
$publishMessage[$channelID;$var[announcement]]
```

### Conditional publication

```bdfd
$if[$isAdmin[$authorID]==true]
  $var[announcement;$sendMessage[Announcement from $username: $noMentionMessage;yes]]
  $publishMessage[$channelID;$var[announcement]]
  $sendMessage[✅ Announcement published successfully.]
$else
  $sendMessage[❌ Permission denied.]
$endif
```

## Notes

- Only messages in announcement channels can be published.
- Subscribed servers see the message in their dedicated announcement channel.
- Publishing is irreversible: the message cannot be "unpublished".
- Ideal for bot updates, changelogs, and community announcements.
