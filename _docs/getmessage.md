---
layout: doc
title: $getMessage
translation_key: docs
category: "Moderation"
function_name: getMessage
syntax: $getMessage[channelID;messageID;(property)]
description: Gets the content, author ID, author username or author avatar URL of a message specified by its channel and message ID.
---

# $getMessage

The function `$getMessage[]` retrieves a property of a message (by default its **text content**) from its channel and message ID.

## Syntax

```
$getMessage[channelID;messageID;(property)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the message to retrieve. |
| `property` | Optional. One of `content` (default), `authorID`, `username` (the author's username) or `avatar` (the author's avatar URL). Case-sensitive; any other value raises `Unknown message property.` |

## Return Value

- **Type**: String
- The requested property of the message: its text content by default (not embeds or attachments), the author ID, the author username, or the author avatar URL (empty if the author has no avatar).
- Both IDs must be positive numbers, otherwise the error `Invalid Discord ID.` is raised; a channel that does not support messages raises `Channel does not support messages.`
- There is no empty-string fallback: if the message cannot be fetched from Discord (it does not exist or is not accessible), the call fails with an error.

## Behavior

- The message is fetched from Discord when the function runs; no age limit is applied by the engine.
- Use `$getEmbedData` to read the embeds of a message.

## Examples

### Quoting a message

```bdfd
$var[msgContent;$getMessage[$channelID;$noMentionMessage]]
$if[$var[msgContent]!=]
  $title[Quoted Message]
  $description[>>> $var[msgContent]]
  $footer[Message ID: $noMentionMessage]
  $color[#5865F2]
$else
  $sendMessage[Message not found.]
$endif
```

### Author of a message

```bdfd
$sendMessage[Message $message[1] was written by <@$getMessage[$channelID;$message[1];authorID]> ($getMessage[$channelID;$message[1];username]).]
```

### Content verification

```bdfd
$var[target;$getMessage[$channelID;$message[1]]]
$if[$checkContains[$var[target];http]==true]
  $sendMessage[⚠️ This message contains a link.]
$else
  $sendMessage[✅ No links detected.]
$endif
```

## Notes

- With the default property, only the raw text is returned (no embeds).
- Useful for citation systems, logs, and moderation.
