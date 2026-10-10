---
layout: doc
title: $threadUserCount
translation_key: docs
category: "Moderation"
function_name: threadUserCount
syntax: $threadUserCount
description: Returns the number of members in a thread. Useful for tracking participation in discussions.
---

# $threadUserCount

The function `$threadUserCount` returns the **number of members** present in a thread.

## Syntax

```
$threadUserCount
```

## Parameters

This function takes no argument: it applies to the current channel, which must be a thread.

## Return Value

- **Type**: Integer
- The approximate member count Discord reports for the thread.
- Raises an error (`Channel is not a thread.`) if the current channel is not a thread.

## Behavior

- The thread is the current channel (`channel.id`); the value is read from Discord at call time and is approximate.

## Examples

### Thread Summary

```bdfd
$title[Thread Activity]
$description[
**Members:** $threadUserCount participants
**Messages:** $threadMessageCount messages
]
$color[#57F287]
$sendMessage[Statistics of this thread]
```

### Popularity Alert

```bdfd
$var[userCount;$threadUserCount]
$if[$var[userCount]>=10]
  $sendMessage[This thread has attracted $var[userCount] participants! 🔥]
$endif
```

### Participation Monitoring

```bdfd
$var[members;$threadUserCount]
$var[messages;$threadMessageCount]
$var[ratio;$round[$divide[$var[messages];$var[members]]]]
$sendMessage[Average of $var[ratio] messages per participant.]
```

## Notes

- Useful alongside `$threadMessageCount[]` to evaluate engagement.

