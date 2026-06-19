---
layout: doc
title: $changeUsernameWithID
translation_key: docs
category: "Moderation"
function_name: changeUsernameWithID
syntax: $changeUsernameWithID[userID;newName]
description: Changes the username of a specific user (requires elevated permissions).
---

# $changeUsernameWithID

The `$changeUsernameWithID` function **modifies the global username** of a specific Discord user. This function requires elevated permissions (generally reserved for bots with a user token or special permissions).

## Syntax

```
$changeUsernameWithID[userID;newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required. |
| `newName` | The new username. Required. |

## Return value

None. The username is updated globally.

## Examples

### Change for a mentioned user

```bdfd
$changeUsernameWithID[$mentioned[1];Corrected Name]
$sendMessage[✅ Username of <@$mentioned[1]> changed to "Corrected Name".]
```

### Administrative command

```bdfd
$if[$isAdmin==true]
  $changeUsernameWithID[$findUser[$message[1]];$message[2]]
  $sendMessage[Username of user $message[1] changed.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Change for the author

```bdfd
$changeUsernameWithID[$authorID;$message[1]]
$sendMessage[$userName, your username has been changed.]
```

## Notes

- **Special permissions required**: This function may not work with a standard bot token.
- **Discord rate limit**: Maximum of 2 name changes per hour per account.
- To change the name of the bot itself, use `$changeUsername`.
- To change the nickname on the server only, use `$setNickname` instead.
- The change is global and visible across all Discord servers.
