---
layout: doc
title: $editThread
translation_key: docs
category: "Moderation"
function_name: editThread
syntax: $editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
description: "Modifies the properties of an existing thread: name, archive status, lock, and auto-archive duration."
---

# $editThread

The `$editThread[]` function **modifies the properties of an existing thread**: name, archiving, locking, and archive duration.

## Syntax

```
$editThread[threadID;name;(archived);(locked);(autoArchiveDuration)]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the thread to modify. |
| `name` | New name of the thread (1 to 100 characters). |
| `archived` | Optional - `true` to archive, `false` to unarchive. |
| `locked` | Optional - `true` to lock, `false` to unlock. |
| `autoArchiveDuration` | Optional - New duration: 60, 1440, 4320 or 10080 minutes. |

## Return value

This function does not return a value.

## Behavior

- The bot must have the `MANAGE_THREADS` permission.
- Archiving hides the thread from the active thread list.
- Locking prevents new messages in the thread.

## Examples

### Close a support thread

```bdfd
$editThread[$threadID;[$resolved] Support;true;true]
$channelSendMessage[$threadID;This thread has been marked as resolved and locked.]
$sendMessage[Thread closed.]
```

### Unarchive a thread

```bdfd
$editThread[$threadID;Active support;false;false;10080]
$channelSendMessage[$threadID;Thread reopened for discussion.]
```

### Rename based on subject

```bdfd
$let[newName;[FAQ] $noMentionMessage]
$editThread[$threadID;$newName]
$sendMessage[Thread renamed to: $newName]
```

## Notes

- An archived thread cannot receive new messages until it is unarchived.
- Locked threads can be unlocked with `locked=false`.
- The archive duration is ignored if the thread is already manually archived.
