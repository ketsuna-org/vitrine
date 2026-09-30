---
layout: doc
title: $createChannel
translation_key: docs
category: "Moderation"
function_name: createChannel
syntax: $createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
description: Creates a new channel on the server. Supports text, voice, category, announcement, and stage channels.
---

# $createChannel

The `$createChannel[]` function **creates a new channel** on the Discord server.

## Syntax

```
$createChannel[name;(type);(categoryID);(topic);(nsfw);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the channel (1 to 100 characters). |
| `type` | Optional - Type: `0`=text, `2`=voice, `4`=category, `5`=announcement, `13`=stage. Default: `0`. |
| `categoryID` | Optional - ID of the parent category. |
| `topic` | Optional - Topic/description of the channel (max 1024). |
| `nsfw` | Optional - `true`/`false` for NSFW marking. |
| `slowmode` | Optional - Delay in seconds (0-21600). |

## Return value

- **Type**: Snowflake (string)
- The ID of the created channel.
- Empty string if failed (insufficient permissions).

## Behavior

- The bot must have the `MANAGE_CHANNELS` permission.
- Announcement channels (type 5) require a community server.
- Stage channels (type 13) are special voice channels.

## Examples

### Log channel

```bdfd
$var[logChan;$createChannel[logs-bot;0;123456789;;false;0]]
$if[$var[logChan]!=]
  $channelSendMessage[$var[logChan];Log system enabled.]
  $sendMessage[Log channel created: <#$var[logChan]>]
$else
  $sendMessage[Error: MANAGE_CHANNELS permission required.]
$endif
```

### Dynamic ticket channel

```bdfd
$var[ticketChan;$createChannel[ticket-$username;0;123456789;Ticket for $username;false;0]]
$if[$var[ticketChan]!=]
  $channelSendMessage[$var[ticketChan];Welcome $username! Describe your issue.]
  $sendMessage[Ticket created: <#$var[ticketChan]>]
$endif
```

### Category + channels

```bdfd
$var[cat;$createChannel[New Project;4;0]]
$var[chat;$createChannel[discussion;0;$var[cat]]]
$var[voice;$createChannel[Voice;2;$var[cat]]]
$sendMessage[Category and channels created!]
```

## Notes

- Channel names are converted to lowercase and spaces are replaced by hyphens.
- Maximum 500 channels per server.
- To delete, use `$deleteChannels[]`.
