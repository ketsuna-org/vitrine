---
layout: doc
title: $changeUsernameWithID
translation_key: docs
category: "Moderation"
function_name: changeUsernameWithID
syntax: $changeUsernameWithID[userID;newName]
description: Changes the server nickname of the user whose ID is given.
---

# $changeUsernameWithID

In this engine, `$changeUsernameWithID` **sets the server nickname** of the user whose ID is given. It does not change the global username of any account.

## Syntax

```
$changeUsernameWithID[userID;newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required. The ID of the target user. Must be a positive number, otherwise the error `Missing or invalid user ID.` is raised. |
| `newName` | Required. The new nickname. After substitution it must contain 1 to 32 characters, otherwise the error `Nickname must contain 1 to 32 characters.` is raised. The text `%username%` is replaced by the username of the target user. |

## Return value

None (empty string).

## Behavior

- `%username%` in `newName` is replaced by the target's username (error `User not found: <id>.` if the user cannot be found).
- The change is applied like `$setNickname` (the bot needs `Manage Nicknames`; if Discord refuses the change, an error is raised).

## Examples

### Change for a mentioned user

```bdfd
$changeUsernameWithID[$mentioned[1];Corrected Name]
$sendMessage[Nickname of <@$mentioned[1]> changed to "Corrected Name".]
```

### Administrative command

```bdfd
$if[$isAdmin[$authorID]==true]
  $changeUsernameWithID[$findUser[$message[1]];$message[2]]
  $sendMessage[Nickname of user $message[1] changed.]
$else
  $sendMessage[Permission denied.]
$endif
```

### Change for the author

```bdfd
$changeUsernameWithID[$authorID;$message[1]]
$sendMessage[$userName, your nickname has been changed.]
```

## Notes

- Only the nickname on the current server is changed.
- Unlike `$setNickname`, an empty nickname is rejected.
- To target the mentioned user (or the author) without passing an ID, use `$changeUsername`.
