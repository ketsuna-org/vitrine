---
layout: doc
title: $threadRemoveMember
translation_key: docs
category: "Moderation"
function_name: threadRemoveMember
syntax: $threadRemoveMember[threadID;userID]
description: Removes a member from a thread. The user will no longer be able to view or participate in the private thread.
---

# $threadRemoveMember

The function `$threadRemoveMember[]` allows you to **remove a user from a thread**. The user will no longer be able to access the private thread.

## Syntax

```
$threadRemoveMember[threadID;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the target thread (a Discord ID of a thread; otherwise an error is raised). |
| `userID` | The ID of the user to remove (a Discord ID, otherwise `Invalid Discord ID.`). |

## Return Value

This function does not return any value.

## Behavior

- The thread must not be archived (`Thread is archived.`).
- The bot needs `View Channel` and `Manage Threads` in the thread, unless it is a private thread created by the bot (then only `View Channel`); otherwise `Missing permissions for the thread operation.` is raised.

## Examples

### Closing a Ticket

```bdfd
$threadRemoveMember[123456789012345678;$authorID]
$editThread[123456789012345678;[Closed] Ticket;yes]
$sendMessage[Ticket closed and user removed.]
```

### Removal After Resolution

```bdfd
$threadRemoveMember[123456789012345678;$mentioned[1]]
$channelSendMessage[123456789012345678;<@$mentioned[1]> has been removed from the thread.]
```

## Notes

- To add a member, use `$threadAddMember[]`.

