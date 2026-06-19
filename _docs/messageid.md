---
layout: doc
title: $messageID
translation_key: docs
category: "Entity Info"
function_name: messageID
syntax: $messageID
description: Returns the ID (snowflake) of the message that triggered the command.
---

# $messageID

The function `$messageID` returns the **unique identifier** (snowflake) of the message that triggered the execution of the command.

## Syntax

```
$messageID
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `snowflake` (string) | The ID of the triggering message. |

## Examples

### Display the message ID

```bdfd
$sendMessage[Message ID: $messageID]
```

### Direct link to the message

```bdfd
$sendMessage[Link to the message: https://discord.com/channels/$guildID/$channelID/$messageID]
```

### Log the ID

```bdfd
$channelSendMessage[$channelIDFromName[logs];Message $messageID processed by $username.]
```

### Delete the message after processing

```bdfd
$deleteMessage[$channelID;$messageID]
$sendMessage[Message processed and deleted.]
```

## Notes

- The ID is unique and allows you to precisely identify a message.
- Can be used with `$deleteMessage`, `$editMessage`, or `$messageURL`.
- In interactions (buttons), `$messageID` returns the ID of the original message.

