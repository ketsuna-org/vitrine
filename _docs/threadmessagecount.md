---
layout: doc
title: $threadMessageCount
translation_key: docs
category: "Moderation"
function_name: threadMessageCount
syntax: $threadMessageCount[threadID]
description: Returns the total number of messages in a thread. Includes messages within the thread only, not those in the parent channel.
---

# $threadMessageCount

The function `$threadMessageCount[]` returns the **total number of messages** in a thread.

## Syntax

```
$threadMessageCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to analyze. |

## Return Value

- **Type**: Integer
- The total number of messages in the thread.
- `0` if the thread is empty or inaccessible.

## Behavior

- Counts only messages within the thread, not those in the parent channel.
- Includes system messages (thread creation, added members, etc.).
- The bot must have access to the thread to count these messages.

## Examples

### Thread Statistics

```bdfd
$title[Thread Statistics]
$description[
**Messages:** $threadMessageCount[$threadID]
**Members:** $threadUserCount[$threadID]
]
$color[#5865F2]
$sendMessage[]
```

### Activity Check

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount<=1]
  $channelSendMessage[$threadID;This thread seems inactive. Feel free to ask your questions!]
$endif
```

### Auto Archiving

```bdfd
$let[msgCount;$threadMessageCount[$threadID]]
$if[$msgCount>=100]
  $editThread[$threadID;[$threadName];true;true]
  $sendMessage[Thread archived automatically (100 messages reached).]
$endif
```

## Notes

- Useful for statistics and automatic thread management.
- Deleted messages are not counted.
- To get the number of members, use `$threadUserCount[]`.

