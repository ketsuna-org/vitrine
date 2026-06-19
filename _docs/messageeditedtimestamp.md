---
layout: doc
title: $messageEditedTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageEditedTimestamp
syntax: $messageEditedTimestamp
description: Returns the timestamp of the last edit of the triggering message, or an empty string if it has not been edited.
---

# $messageEditedTimestamp

The function `$messageEditedTimestamp` returns the **timestamp of the last edit** of the triggering message. If the message has never been edited, it returns an empty string.

## Syntax

```
$messageEditedTimestamp
```

## Parameters

None.

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Timestamp in milliseconds, or an empty string if the message has not been edited. |

## Examples

### Display the edit date

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Message edited on $formatDate[$messageEditedTimestamp;MM/DD/YYYY at HH:mm]]
$else
  $sendMessage[Original message (not edited).]
$endif
```

### Display in relative format

```bdfd
$if[$messageEditedTimestamp!=]
  $sendMessage[Edited <t:$truncate[$messageEditedTimestamp/1000]:R>]
$endif
```

### Log edits

```bdfd
$if[$messageEditedTimestamp!=]
  $channelSendMessage[$channelIDFromName[logs];$username edited their message (ID: $messageID) on $formatDate[$messageEditedTimestamp;MM/DD/YYYY HH:mm]]
$endif
```

## Notes

- Returns an **empty** string (`""`) if never edited, not `0`.
- Use `$isMessageEdited` for a simpler boolean test.
- The timestamp is in milliseconds; divide by `1000` for seconds.

