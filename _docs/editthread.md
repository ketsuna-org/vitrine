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
| `threadID` | The ID of the thread to modify. Required; must be a Discord ID (`Invalid Discord ID.`) of a thread (`Channel is not a thread.`). |
| `name` | Optional - New name of the thread (1 to 100 characters). |
| `archived` | Optional - `yes` to archive, `no` to unarchive (only `yes`/`no` are accepted). |
| `autoArchiveDuration` | Optional - New duration: 60, 1440, 4320 or 10080 minutes. |
| `locked` | Optional - `yes` to lock, `no` to unlock. |
| `slowmode` | Optional - Slowmode in seconds (0 to 21600). |

From `name` onwards, any argument can be set to `!unchanged` to leave that property as is. An empty value is not treated as unchanged and is rejected for `name` and for the numeric parameters.

## Return value

An empty string.

## Behavior

- The bot must have `View Channel` and `Manage Threads` in the thread (effective permissions of the parent channel). Exception: a call that only unarchives (`archived` = `no`, nothing else changed) on a thread that is not locked only needs `Send Messages`. Otherwise the error `Missing permissions for the thread operation.` is raised.
- An archived thread can only be edited if the same call unarchives it (`archived` = `no`); otherwise the error `An archived thread must be unarchived to edit it.` is raised.
- A thread cannot be locked while it is (or is being) archived: `locked` = `yes` together with `archived` = `yes`, or on an archived thread, raises `Archived threads cannot be locked.`
- Invalid values raise errors: "Thread name must contain 1 to 100 characters.", "Invalid thread archive duration.", "Invalid thread slowmode.", "Expected yes or no.", "Expected an integer.".

## Examples

### Mark a support thread as resolved and lock it

```bdfd
$channelSendMessage[$channelID;This thread has been marked as resolved and locked.]
$editThread[$channelID;[resolved] Support;!unchanged;!unchanged;yes]
$sendMessage[Thread locked.]
```

### Unarchive a thread

```bdfd
$editThread[$channelID;Active support;no;10080;no]
$channelSendMessage[$channelID;Thread reopened for discussion.]
```

### Rename based on subject

```bdfd
$var[newName;[FAQ] $noMentionMessage]
$editThread[$channelID;$var[newName]]
$sendMessage[Thread renamed to: $var[newName]]
```

## Notes

- Locked threads can be unlocked with `locked` set to `no`.
- Inside a thread, `$channelID` is the ID of that thread.
- `archived` and `locked` accept only `yes` or `no` (`true`/`false` raise `Expected yes or no.`).
