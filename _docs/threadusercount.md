---
layout: doc
title: $threadUserCount
translation_key: docs
category: "Moderation"
function_name: threadUserCount
syntax: $threadUserCount[threadID]
description: Returns the number of members in a thread. Useful for tracking participation in discussions.
---

# $threadUserCount

The function `$threadUserCount[]` returns the **number of members** present in a thread.

## Syntax

```
$threadUserCount[threadID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to analyze. |

## Return Value

- **Type**: Integer
- The number of members in the thread.
- `0` if the thread is empty or inaccessible.

## Behavior

- Counts all users who have joined the thread (public) or have been added to it (private).
- Includes the bot itself if it has joined the thread.
- The bot must have access to the thread.

## Examples

### Thread Summary

```bdfd
$title[Thread Activity]
$description[
**Members:** $threadUserCount[$threadID] participants
**Messages:** $threadMessageCount[$threadID] messages
]
$color[#57F287]
$sendMessage[]
```

### Popularity Alert

```bdfd
$let[userCount;$threadUserCount[$threadID]]
$if[$userCount>=10]
  $sendMessage[This thread has attracted $userCount participants! 🔥]
$endif
```

### Participation Monitoring

```bdfd
$let[members;$threadUserCount[$threadID]]
$let[messages;$threadMessageCount[$threadID]]
$let[ratio;$round[$divide[$messages;$members]]]
$sendMessage[Average of $ratio messages per participant.]
```

## Notes

- In public threads, the count includes all users who have opened the thread.
- Useful alongside `$threadMessageCount[]` to evaluate engagement.
- Members who leave a public thread are no longer counted.

