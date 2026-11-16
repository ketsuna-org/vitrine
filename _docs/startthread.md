---
layout: doc
title: $startThread
translation_key: docs
category: "Moderation"
function_name: startThread
syntax: $startThread[name;channelID;messageID;(autoArchiveDuration);(returnID);(reason)]
description: Creates a discussion thread from the current message or a specified message. Threads allow organized conversations in sub-channels.
---

# $startThread

The function `$startThread[]` allows **creating a discussion thread** in a channel. Threads are organized sub-conversations.

## Syntax

```
$startThread[name;channelID;messageID;(autoArchiveDuration);(returnID);(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | Name of the thread (1 to 100 characters, not all blank; otherwise `Thread name must contain 1 to 100 characters.`). |
| `channelID` | ID of the parent channel (text or announcement channel; any other type raises `Threads require a text or announcement parent.`). |
| `messageID` | ID of the source message. Can be left empty to create a thread without a source message (required for an announcement channel). |
| `autoArchiveDuration` | Optional - Duration of inactivity before archiving, in minutes: 60, 1440 (24h), 4320 (3d), 10080 (7d). Default: 60. Empty means 60. Any other value raises `Invalid thread archive duration.` (or `Expected an integer.`). |
| `returnID` | Optional - `yes` to return the ID of the created thread, `no` otherwise. Default: `no`. Any other value raises an error. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: Snowflake (string)
- The ID of the newly created thread if `returnID` is `yes`, otherwise an empty string.
- On failure (invalid ID or name, missing permission, incompatible parent channel), the function raises an error; it does not return an empty string.

## Behavior

- The parent channel must be a text channel or an announcement channel. An announcement channel requires a source message.
- The bot must have `View Channel` and `Create Public Threads` in the parent channel; otherwise the error `Missing permissions for the thread operation.` is raised.
- The third argument must be present, but may be empty. When it holds a message ID, the thread is created from that message.
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

- The name of the thread can be modified later with `$editThread[]`.
- Adding members to the new thread is done with `$threadAddMember[]`.

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
