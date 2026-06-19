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
| `threadID` | The ID of the target thread. |
| `userID` | The ID of the user to remove. |

## Return Value

This function does not return any value.

## Behavior

- Works primarily for private threads.
- In a public thread, users cannot be removed (they can always view it).
- The bot must have the `MANAGE_THREADS` permission or be the creator of the private thread.

## Examples

### Closing a Ticket

```bdfd
$threadRemoveMember[$threadID;$authorID]
$editThread[$threadID;[Closed] Ticket;true;true]
$sendMessage[Ticket closed and user removed.]
```

### Removal After Resolution

```bdfd
$threadRemoveMember[$threadID;$mentioned[1]]
$channelSendMessage[$threadID;<@$mentioned[1]> has been removed from the thread.]
```

## Notes

- In public threads, `$threadRemoveMember[]` may not have any visible effect.
- The removed user does not receive a notification.
- For private threads, this is the appropriate method to manage access.

