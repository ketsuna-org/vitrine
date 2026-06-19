---
layout: doc
title: $sendEmbedMessage[]
translation_key: docs
category: "Embed & Message"
function_name: sendEmbedMessage
syntax: $sendEmbedMessage[(channelId);(messageId)]
description: Sends a constructed embed (via $title, $description, $addField, etc.) to a specific channel. Optionally edits an existing message if a messageId is provided.
---

# $sendEmbedMessage[] — Send an Embed

`$sendEmbedMessage[]` sends the previously constructed embed to a Discord channel. This is the primary method for sending rich messages (embeds) to a target channel, distinct from `$sendMessage[]`.

## Syntax

```
$sendEmbedMessage[(channelId);(messageId)]
```

## Parameters

| Parameter | Required | Default | Description |
|-----------|-------------|--------|-------------|
| `channelId` | No | Current channel | ID of the destination channel. |
| `messageId` | No | New message | ID of a message to edit. |

## Return Value

- **Type**: `string`
- Returns the identifier of the message created or edited. Can be used for subsequent operations.

## Usage

### Simple embed in the current channel

```bdfd
$title[Server Status]
$description[All systems functioning normally]
$color[#2ECC71]
$addField[Uptime;$uptime;yes]
$addField[Players;$var[players];yes]
$sendEmbedMessage
```

### Embed in a specific channel

```bdfd
$title[New Member]
$description[$username has joined the server!]
$addField[ID;$authorID;yes]
$thumbnail[$authorAvatar]
$color[#5865F2]
$sendEmbedMessage[$channelID[welcome]]
```

### Editing an existing embed

```bdfd
$title[Leaderboard - Updated]
$description[Updated leaderboard]
$addField[1st;$var[top1];yes]
$addField[2nd;$var[top2];yes]
$addField[3rd;$var[top3];yes]
$color[#F1C40F]
$footer[Updated at $time]
$sendEmbedMessage[$channelID[leaderboard];$var[leaderboard_msg_id]]
```

### Capturing the ID for later use

```bdfd
$title[Editable Message]
$description[This message will be updated]
$var[msgId;$sendEmbedMessage]
$editEmbedIn[10s]
$title[Editable Message - Updated]
$description[The update was successful]
$color[#27AE60]
```

## Notes

- The embed must be constructed **before** calling `$sendEmbedMessage[]` (using `$title[]`, `$description[]`, `$addField[]`, etc.).
- If no embed is defined, the message will be empty (which should be avoided).
- The return value (message ID) is useful for subsequent edits or deletions.
- To send both text and an embed, use `$sendMessage[]` which can combine both.
