---
layout: doc
title: $createChannel
translation_key: docs
category: "Moderation"
function_name: createChannel
syntax: $createChannel[name;type;(categoryID)]
description: Creates a new channel on the server. Supports text, voice, category, stage and forum channels.
---

# $createChannel

The `$createChannel[]` function **creates a new channel** on the Discord server.

## Syntax

```
$createChannel[name;type;(categoryID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Required. Name of the channel (1 to 100 characters). |
| `type` | Required. One of `text`, `voice`, `category`, `stage`, `forum` (case-insensitive). Any other value raises `Invalid BDFD channel type.` |
| `categoryID` | Optional. ID of the parent category. It must be a category of the current server; a category cannot itself have a parent. |

## Return value

- **Type**: String
- An empty string. The function does not return the ID of the created channel.
- If the bot lacks the permission or the arguments are invalid, the function raises an error.

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission.
- The channel is created in the current server.
- The ID of the new channel is not returned; to find it afterwards, use `$channelID[name]` or `$findChannel[name]`.

## Examples

### Log channel

```bdfd
$createChannel[logs-bot;text;123456789]
$sendMessage[Log channel created.]
```

### Dynamic ticket channel

```bdfd
$createChannel[ticket-$username;text;123456789]
$sendMessage[Ticket channel created.]
```

### Category + channels

```bdfd
$createChannel[New Project;category]
$createChannel[discussion;text;$categoryID[New Project]]
$createChannel[Voice;voice;$categoryID[New Project]]
$sendMessage[Category and channels created!]
```

## Notes

- To delete, use `$deleteChannels[]`.
