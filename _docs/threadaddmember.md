---
layout: doc
title: $threadAddMember
translation_key: docs
category: "Moderation"
function_name: threadAddMember
syntax: $threadAddMember[threadID;userID]
description: Adds a member to a thread. Useful for private threads where members must be added manually.
---

# $threadAddMember

The function `$threadAddMember[]` allows you to **add a user to a thread**. It is particularly useful for private threads.

## Syntax

```
$threadAddMember[threadID;userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `threadID` | The ID of the target thread. |
| `userID` | The ID of the user to add. |

## Return Value

This function does not return any value.

## Behavior

- For public threads, users can join freely; this function is rarely needed.
- For private threads, only added members can view and participate in the thread.
- The bot must have the `MANAGE_THREADS` permission or be the creator of the private thread.

## Examples

### Adding the Creator

```bdfd
$let[thread;$startThread[Support - $username;1440]]
$threadAddMember[$thread;$authorID]
$channelSendMessage[$thread;Your support thread is ready, $username!]
```

### Adding Moderators

```bdfd
$threadAddMember[$threadID;$mentioned[1]]
$sendMessage[<@$mentioned[1]> has been added to the thread.]
```

### Automatic Staff Addition

```bdfd
$let[thread;$startThread[Ticket #$random[1000;9999];1440]]
$threadAddMember[$thread;$authorID]
$threadAddMember[$thread;MODERATOR_ROLE_ID_1]
$threadAddMember[$thread;MODERATOR_ROLE_ID_2]
$channelSendMessage[$thread;Welcome! A member of the staff will assist you.]
```

## Notes

- In public threads, members can join without an invitation.
- `$threadAddMember[]` does not send a notification to the added user.
- To remove a member, use `$threadRemoveMember[]`.

