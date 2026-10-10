---
layout: doc
title: $messageEditedTimestamp
translation_key: docs
category: "Entity Info"
function_name: messageEditedTimestamp
syntax: $messageEditedTimestamp[channelID;messageID]
description: Returns the Unix timestamp (in seconds) of the last edit of a message, or an empty string if it has not been edited.
---

# $messageEditedTimestamp

The function `$messageEditedTimestamp` returns the **timestamp of the last edit** of a message identified by its channel and ID. If the message has never been edited, it returns an empty string.

## Syntax

```
$messageEditedTimestamp[channelID;messageID]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Required. ID of the channel containing the message. |
| `messageID` | Required. ID of the message. |

Both arguments must be positive integers, otherwise the error `Invalid Discord ID.` is raised. A channel that cannot hold messages raises `Channel does not support messages.` A bare `$messageEditedTimestamp` is invalid.

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Unix timestamp in seconds, or an empty string if the message has not been edited. |

## Examples

### Display the edit date

```bdfd
$if[$messageEditedTimestamp[$channelID;$messageID]!=]
  $sendMessage[Message edited at Unix timestamp $messageEditedTimestamp[$channelID;$messageID]]
$else
  $sendMessage[Original message (not edited).]
$endif
```

### Display in relative format

```bdfd
$if[$messageEditedTimestamp[$channelID;$messageID]!=]
  $sendMessage[Edited <t:$messageEditedTimestamp[$channelID;$messageID]:R>]
$endif
```

### Log edits

```bdfd
$if[$messageEditedTimestamp[$channelID;$messageID]!=]
  $channelSendMessage[$channelIDFromName[logs];$username edited their message (ID: $messageID) at Unix timestamp $messageEditedTimestamp[$channelID;$messageID]]
$endif
```

## Notes

- Returns an **empty** string (`""`) if never edited, not `0`.
- Use `$isMessageEdited[channelID;messageID]` for a simpler boolean test.
- The timestamp is in seconds (Unix time), directly usable in Discord `<t:...>` tags.

