---
layout: doc
title: $sendEmbedMessage[]
translation_key: docs
category: "Embed & Message"
function_name: sendEmbedMessage
syntax: $sendEmbedMessage[channelID;content;(title;titleURL;description;color;author;authorIcon;footer;footerIcon;thumbnail;image;addTimestamp;returnID)]
description: Sends a message with an embed built from its own arguments to a specific channel. Every field after the content is optional and can be left empty.
---

# $sendEmbedMessage[] — Send an Embed

`$sendEmbedMessage[]` sends a message containing one embed to a Discord channel. The embed is built from the arguments of the function itself, not from `$title[]`, `$description[]` or `$addField[]`. Before sending, the pending response is flushed.

## Syntax

```
$sendEmbedMessage[channelID;content;(title;titleURL;description;color;author;authorIcon;footer;footerIcon;thumbnail;image;addTimestamp;returnID)]
```

The function accepts from 2 to 14 arguments.

## Parameters

| Parameter | Required | Default | Description |
|-----------|----------|---------|-------------|
| `channelID` | Yes | — | ID of the destination channel (digits only, otherwise the error "Invalid Discord ID." is raised). |
| `content` | Yes | — | Text of the message (the argument must be present but can be empty). |
| `title` | No | empty | Embed title (256 characters maximum). |
| `titleURL` | No | empty | URL of the title; only used when a title is set. |
| `description` | No | empty | Embed description (4096 characters maximum). |
| `color` | No | empty | Embed color; a 6-digit hex value is accepted with or without `#` (stored as `#RRGGBB`). Other values are passed on as is, without validation. |
| `author` | No | empty | Author name (256 characters maximum). |
| `authorIcon` | No | empty | Author icon URL; only used when an author is set. |
| `footer` | No | empty | Footer text (2048 characters maximum). |
| `footerIcon` | No | empty | Footer icon URL; only used when a footer is set. |
| `thumbnail` | No | empty | Thumbnail URL. |
| `image` | No | empty | Image URL. |
| `addTimestamp` | No | `no` | `yes`/`true` adds the current time as embed timestamp. Any value other than `yes`, `no`, `true`, `false` or empty raises an error. |
| `returnID` | No | `no` | `yes`/`true` returns the ID of the sent message. Same accepted values as `addTimestamp`. |

## Return Value

- **Type**: `string`
- Returns the ID of the sent message when `returnID` is `yes`/`true`, otherwise an empty string.

## Examples

### Simple embed in a specific channel

```bdfd
$sendEmbedMessage[$channelID;;Server Status;;All systems functioning normally;#2ECC71]
```

### Embed with text, footer and timestamp

```bdfd
$sendEmbedMessage[$channelID;New member!;Welcome;;$username has joined the server!;5865F2;;;Member joined;;;;yes]
```

### Capturing the ID for later use

```bdfd
$var[msgId;$sendEmbedMessage[$channelID;;Editable Message;;This message was sent by the bot;27AE60;;;;;;;no;yes]]
```

## Notes

- If every embed field is empty, the message is sent with its content only (no embed).
- Mention settings made with `$allowUserMentions`, `$allowRoleMentions` or `$noMention` do **not** apply to this message: the pending response is sent first (with those settings), then the embed message is sent without any mention restriction.
- A too long title, description, author or footer raises `Embed text cannot exceed N characters.`
- A color that is not a 6-digit hex value is passed on unchanged and is not validated by the function.
- To send a plain text message to the current channel, use `$sendMessage[text]` (the text is required).
