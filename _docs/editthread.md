---
layout: doc
title: $editThread
translation_key: docs
category: "Moderation"
function_name: editThread
syntax: $editThread[threadID;(name);(archived);(autoArchiveDuration);(locked);(slowmode)]
description: "Modifies the properties of an existing thread: name, archive status, auto-archive duration, lock, and slowmode."
---

# $editThread

The `$editThread[]` function **modifies the properties of an existing thread**: name, archiving, archive duration, locking, and slowmode.

## Syntax

```
$editThread[threadID;(name);(archived);(autoArchiveDuration);(locked);(slowmode)]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to modify. |
| `name` | Optional - New name of the thread (1 to 100 characters). |
| `archived` | Optional - `yes` to archive, `no` to unarchive (only `yes`/`no` are accepted). |
| `autoArchiveDuration` | Optional - New duration: 60, 1440, 4320 or 10080 minutes. |
| `locked` | Optional - `yes` to lock, `no` to unlock. |
| `slowmode` | Optional - Slowmode in seconds (0 to 21600). |

From `name` onwards, any argument can be set to `!unchanged` to leave that property as is. An empty value is not treated as unchanged and is rejected for `name` and for the numeric parameters.

## Return value

An empty string.

## Behavior

- The bot must have the `MANAGE_THREADS` permission.
- Invalid values raise errors: "Thread name must contain 1 to 100 characters.", "Invalid thread archive duration.", "Invalid thread slowmode.", "Expected yes or no.", "Expected an integer.".
- Archiving hides the thread from the active thread list.
- Locking prevents new messages in the thread.

## Examples

### Close a support thread

```bdfd
$editThread[$threadID;[resolved] Support;yes;!unchanged;yes]
$channelSendMessage[$threadID;This thread has been marked as resolved and locked.]
$sendMessage[Thread closed.]
```

### Unarchive a thread

```bdfd
$editThread[$threadID;Active support;no;10080;no]
$channelSendMessage[$threadID;Thread reopened for discussion.]
```

### Rename based on subject

```bdfd
$var[newName;[FAQ] $noMentionMessage]
$editThread[$threadID;$var[newName]]
$sendMessage[Thread renamed to: $var[newName]]
```

## Notes

- An archived thread cannot receive new messages until it is unarchived.
- Locked threads can be unlocked with `locked` set to `no`.
- The archive duration is ignored if the thread is already manually archived.
