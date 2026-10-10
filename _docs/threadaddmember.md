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
| `threadID` | The ID of the target thread (a Discord ID of a thread; otherwise an error is raised). |
| `userID` | The ID of the user to add (a Discord ID, otherwise `Invalid Discord ID.`). |

## Return Value

This function does not return any value.

## Behavior

- The thread must not be archived (`Thread is archived.`).
- The bot must have `View Channel` and `Send Messages in Threads` in the thread; otherwise `Missing permissions for the thread operation.` is raised.
- Role IDs are not accepted: only users can be added.

## Examples

### Adding the Creator

```bdfd
$var[thread;$startThread[Support - $username;$channelID;;1440;yes]]
$threadAddMember[$var[thread];$authorID]
$channelSendMessage[$var[thread];Your support thread is ready, $username!]
```

### Adding Moderators

```bdfd
$threadAddMember[$channelID;$mentioned[1]]
$sendMessage[<@$mentioned[1]> has been added to the thread.]
```

### Adding the author and a mentioned moderator

```bdfd
$var[thread;$startThread[Ticket #$random[1000;9999];$channelID;;1440;yes]]
$threadAddMember[$var[thread];$authorID]
$threadAddMember[$var[thread];$mentioned[1]]
$channelSendMessage[$var[thread];Welcome! A member of the staff will assist you.]
```

## Notes

- To remove a member, use `$threadRemoveMember[]`.

