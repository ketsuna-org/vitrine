---
layout: doc
title: $authorOfMessage
translation_key: docs
category: "Embed & Message"
function_name: authorOfMessage
syntax: $authorOfMessage[channelID;messageID]
description: Returns the ID of the author of a specific message, identified by its channel ID and its message ID.
---

# $authorOfMessage

The `$authorOfMessage[]` function returns the **author ID** of a given message.

## Syntax

```
$authorOfMessage[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. ID of the channel containing the message. |
| `messageID` | Required. ID of the target message. |

Both IDs must be positive integers, otherwise the call fails with "Invalid Discord ID.". Both arguments are required: `$authorOfMessage[messageID]` with a single argument is refused.

## Return value

- **Type**: Snowflake (string)
- The user ID of the author of the message, read from the message fetched from Discord.
- The engine has no branch returning an empty string for a missing message.

## Examples

### Retrieving the author

```bdfd
$var[author;$authorOfMessage[$channelID;$message[1]]]
$sendMessage[This message was sent by <@$var[author]>]
```

### Verify the owner of a message

```bdfd
$if[$authorOfMessage[$channelID;$messageID]==$authorID]
  $sendMessage[This message belongs to you.]
$else
  $sendMessage[This message does not belong to you.]
$endif
```

### Message info command

```bdfd
$var[msgID;$message[1]]
$var[author;$authorOfMessage[$channelID;$var[msgID]]]
$title[📋 Message Info]
$description[
**ID**: $var[msgID]
**Author**: <@$var[author]> ($var[author])
**Content**: $getMessage[$channelID;$var[msgID]]
]
```

## Notes

- The bot must have access to the channel containing the message.
- For the current message, `$authorID` is more direct.
