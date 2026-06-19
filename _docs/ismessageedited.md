---
layout: doc
title: $isMessageEdited
translation_key: docs
category: "Entity Info"
function_name: isMessageEdited
syntax: $isMessageEdited
description: "Checks if the triggering message was edited. Returns \"true\" or \"false\"."
---

# $isMessageEdited

The function `$isMessageEdited` checks if the triggering message was **edited** by its author. It returns `"true"` or `"false"`.

## Syntax

```
$isMessageEdited
```

## Parameters

No parameters.

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` if the message was edited, `"false"` otherwise. |

## Examples

### Simple check

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[⚠️ This message was modified.]
$else
  $sendMessage[Original message.]
$endif
```

### Edit log

```bdfd
$if[$isMessageEdited==true]
  $channelSendMessage[$channelIDFromName[logs];$username edited their message $messageURL]
$endif
$sendMessage[Command executed.]
```

### User warning

```bdfd
$if[$isMessageEdited==true]
  $sendMessage[Warning: your command comes from an edited message.]
  $stop
$endif
```

## Notes

- Returns a string `"true"` or `"false"`, not a boolean.
- To get the edit date, use `$messageEditedTimestamp`.
- Useful for detecting if a command was modified after sending.
