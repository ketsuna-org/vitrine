---
layout: doc
title: $threadMessageCount
translation_key: docs
category: "Moderation"
function_name: threadMessageCount
syntax: $threadMessageCount
description: Returns the total number of messages in a thread. Includes messages within the thread only, not those in the parent channel.
---

# $threadMessageCount

The function `$threadMessageCount` returns the **total number of messages** in a thread.

## Syntax

```
$threadMessageCount
```

## Parameters

This function takes no argument: it applies to the current channel, which must be a thread.

## Return Value

- **Type**: Integer
- The message count Discord reports for the thread.
- Raises an error (`Channel is not a thread.`) if the current channel is not a thread.

## Behavior

- The thread is the current channel (`channel.id`); the value is read from Discord at call time.

## Examples

### Thread Statistics

```bdfd
$title[Thread Statistics]
$description[
**Messages:** $threadMessageCount
**Members:** $threadUserCount
]
$color[#5865F2]
$sendMessage[Statistics of this thread]
```

### Activity Check

```bdfd
$var[msgCount;$threadMessageCount]
$if[$var[msgCount]<=1]
  $sendMessage[This thread seems inactive. Feel free to ask your questions!]
$endif
```

### Auto Archiving

```bdfd
$var[msgCount;$threadMessageCount]
$if[$var[msgCount]>=100]
  $editThread[$channelID;!unchanged;yes]
  $sendMessage[Thread archived automatically (100 messages reached).]
$endif
```

## Notes

- Useful for statistics and automatic thread management.
- To get the number of members, use `$threadUserCount[]`.

