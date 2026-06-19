---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;(autoArchiveDuration);(messageID)]
description: Creates a discussion thread from the current message or a specified message. Threads allow organized conversations in sub-channels.
---

# $startThread

The function `$startThread[]` allows **creating a discussion thread** in a channel. Threads are organized sub-conversations.

## Syntax

```
$startThread[name;(autoArchiveDuration);(messageID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the thread (1 to 100 characters). |
| `autoArchiveDuration` | Optional - Duration of inactivity before archiving: 60, 1440 (24h), 4320 (3d), 10080 (7d). Default: 1440. |
| `messageID` | Optional - ID of the source message. By default, the triggering message. |

## Return Value

- **Type**: Snowflake (string)
- The ID of the newly created thread.
- An empty string in case of failure (insufficient permissions or incompatible channel).

## Behavior

- Threads can only be created in text channels (not in voice or announcement channels).
- The bot must have the `CREATE_PUBLIC_THREADS` or `CREATE_PRIVATE_THREADS` permission.
- The thread is created as a public thread by default (visible to all).

## Examples

### Support thread

```bdfd
$let[thread;$startThread[Support - $username;10080]]
$if[$thread!=]
  $channelSendMessage[$thread;Welcome to your support thread, $username! A moderator will answer you soon.]
  $sendMessage[Support thread created: <#$thread>]
$else
  $sendMessage[Impossible to create the thread. Missing permissions.]
$endif
```

### Automatic thread

```bdfd
$if[$checkContains[$message;!discussion]==true]
  $let[topic;$message[1]]
  $let[thread;$startThread[$topic;4320]]
  $if[$thread!=]
    $threadAddMember[$thread;$authorID]
    $sendMessage[Discussion created: <#$thread>]
  $endif
$endif
```

## Notes

- Archived threads can be unarchived with `$editThread[]`.
- Private threads require `CREATE_PRIVATE_THREADS` permission.
- The name of the thread can be modified later with `$editThread[]`.
