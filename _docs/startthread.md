---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;channelID;messageID;(autoArchiveDuration);(returnID)]
description: Creates a discussion thread from the current message or a specified message. Threads allow organized conversations in sub-channels.
---

# $startThread

The function `$startThread[]` allows **creating a discussion thread** in a channel. Threads are organized sub-conversations.

## Syntax

```
$startThread[name;channelID;messageID;(autoArchiveDuration);(returnID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the thread (1 to 100 characters). |
| `channelID` | ID of the parent channel (text or announcement channel). |
| `messageID` | ID of the source message. Can be left empty to create a thread without a source message (required for an announcement channel). |
| `autoArchiveDuration` | Optional - Duration of inactivity before archiving, in minutes: 60, 1440 (24h), 4320 (3d), 10080 (7d). Default: 60. Any other value raises an error. |
| `returnID` | Optional - `yes` to return the ID of the created thread, `no` otherwise. Default: `no`. Any other value raises an error. |

## Return Value

- **Type**: Snowflake (string)
- The ID of the newly created thread if `returnID` is `yes`, otherwise an empty string.
- On failure (invalid ID or name, missing permission, incompatible parent channel), the function raises an error; it does not return an empty string.

## Behavior

- The parent channel must be a text channel or an announcement channel. An announcement channel requires a source message.
- The bot must have the `CREATE_PUBLIC_THREADS` permission in the channel.
- The thread is always created as a public thread.

## Examples

### Support thread

```bdfd
$var[thread;$startThread[Support - $username;$channelID;;10080;yes]]
$channelSendMessage[$var[thread];Welcome to your support thread, $username! A moderator will answer you soon.]
$sendMessage[Support thread created: <#$var[thread]>]
```

### Automatic thread

```bdfd
$if[$checkContains[$message;!discussion]==true]
  $var[topic;$message[1]]
  $var[thread;$startThread[$var[topic];$channelID;;4320;yes]]
  $threadAddMember[$var[thread];$authorID]
  $sendMessage[Discussion created: <#$var[thread]>]
$endif
```

## Notes

- Archived threads can be unarchived with `$editThread[]`.
- The name of the thread can be modified later with `$editThread[]`.
