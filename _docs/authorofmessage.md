---
layout: doc
title: $authorOfMessage
translation_key: docs
category: "Embed & Message"
function_name: authorOfMessage
syntax: $authorOfMessage[messageID]
description: Returns the ID of the author of a specific message, identified by its ID.
---
# $authorOfMessage

The `$authorOfMessage[]` function returns the **author ID** of a given message.

## Syntax

```
$authorOfMessage[messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `messageID` | The ID of the target message. |

## Return value

- **Type**: Snowflake (string)
- The user ID of the author of the message.
- Empty string if the message is not found.

## Examples

### Retrieving the author

```bdfd
$let[author;$authorOfMessage[$message[1]]]
$sendMessage[This message was sent by <@$author>]
```

### Verify the owner of a message

```bdfd
$if[$authorOfMessage[$messageID]==$authorID]
  $sendMessage[This message belongs to you.]
$else
  $sendMessage[This message does not belong to you.]
$endif
```

### Log of deletion

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$channelSendMessage[123456789;Message $msgID deleted — Author: <@$author>]
```

### Message info command

```bdfd
$let[msgID;$message[1]]
$let[author;$authorOfMessage[$msgID]]
$title[📋 Message Info]
$description[
**ID**: $msgID
**Author**: <@$author> ($author)
**Content**: $getMessage[$msgID]
]
$sendMessage[]
```

## Notes

- The bot must have access to the channel containing the message.
- DM messages can be accessed if the bot has access.
- For the current message, `$authorID` is more direct.
