---
layout: doc
title: $getMessage
translation_key: docs
category: "Moderation"
function_name: getMessage
syntax: $getMessage[channelID;messageID]
description: Gets the text content of a message specified by its channel and message ID.
---

# $getMessage

The function `$getMessage[]` retrieves the **text content** of a message from its channel and message ID.

## Syntax

```
$getMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the channel containing the message. |
| `messageID` | The ID of the message to retrieve. |

## Return Value

- **Type**: String
- The text content of the message.
- An empty string if the message does not exist, was deleted, or is inaccessible.

## Behavior

- Returns only the text content (not embeds, attachments, etc.).
- The bot must have access to the channel and the `READ_MESSAGE_HISTORY` permission.
- The message must be less than 14 days old (Discord API limitation for unpinned messages).

## Examples

### Quoting a message

```bdfd
$let[msgContent;$getMessage[$channelID;$noMentionMessage]]
$if[$msgContent!=]
  $title[Quoted Message]
  $description[>>> $msgContent]
  $footer[Message ID: $noMentionMessage]
  $color[#5865F2]
  $sendMessage[]
$else
  $sendMessage[Message not found.]
$endif
```

### Log of deleted message

```bdfd
$let[msgContent;$getMessage[$channelID;$messageID]]
$if[$msgContent!=]
  $title[🗑️ Retrieved Message]
  $description[
  **Author:** $username
  **Content:**
>>> $msgContent
  ]
  $color[#ED4245]
  $channelSendMessage[$logChannel;]
$endif
```

### Content verification

```bdfd
$let[target;$getMessage[$channelID;$message[1]]]
$if[$checkContains[$target;http]==true]
  $sendMessage[⚠️ This message contains a link.]
$else
  $sendMessage[✅ No links detected.]
$endif
```

## Notes

- Limited to the last 14 days for unpinned messages (Discord API restriction).
- Does not retrieve embeds, only raw text.
- Useful for citation systems, logs, and moderation.
