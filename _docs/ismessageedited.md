---
layout: doc
title: $isMessageEdited
translation_key: docs
category: "Entity Info"
function_name: isMessageEdited
syntax: $isMessageEdited[channelID;messageID]
description: "Checks if a message was edited. Returns \"true\" or \"false\"."
---

# $isMessageEdited

The function `$isMessageEdited` checks if the given message was **edited**. It returns `"true"` or `"false"`.

## Syntax

```
$isMessageEdited[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. The ID of the channel containing the message. |
| `messageID` | Required. The ID of the message. |

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` if the message was edited, `"false"` otherwise. |

## Examples

### Simple check

```bdfd
$if[$isMessageEdited[$channelID;$messageID]==true]
  $sendMessage[⚠️ This message was modified.]
$else
  $sendMessage[Original message.]
$endif
```

### Edit log

```bdfd
$if[$isMessageEdited[$channelID;$messageID]==true]
  $channelSendMessage[$channelIDFromName[logs];$username edited their message $messageURL]
$endif
$sendMessage[Command executed.]
```

### User warning

```bdfd
$if[$isMessageEdited[$channelID;$messageID]==true]
  $sendMessage[Warning: your command comes from an edited message.]
  $stop
$endif
```

## Notes

- Returns a string `"true"` or `"false"`, not a boolean.
- To get the edit date, use `$messageEditedTimestamp[channelID;messageID]`.
- A bare `$isMessageEdited` is invalid: both arguments are required.
- An ID that is empty or not a positive integer raises `Invalid Discord ID.`; a channel that cannot hold messages raises `Channel does not support messages.`
- The result is `"true"` when Discord reports an edit date for the message.
