---
layout: doc
title: $changeUsername
translation_key: docs
category: "Moderation"
function_name: changeUsername
syntax: $changeUsername[newName]
description: Changes the server nickname of the first user mentioned in the message (the command author if nobody is mentioned).
---

# $changeUsername

In this engine, `$changeUsername` **sets the server nickname** of a member. It does not change the bot's global username and it does not rename the bot account. The target is the **first user mentioned** in the command message; if the message mentions nobody, the **command author** is targeted. To target an explicit user ID, use `$changeUsernameWithID` (or `$setNickname`).

## Syntax

```
$changeUsername[newName]
```

## Parameters

| Parameter | Description |
|---|---|
| `newName` | Required. The new nickname. After substitution it must contain 1 to 32 characters, otherwise the error `Nickname must contain 1 to 32 characters.` is raised (an empty value is therefore an error). The text `%username%` is replaced by the username of the target user. |

## Return value

None (empty string).

## Behavior

- Target: first user mention of the message, otherwise the author. If no valid user ID can be determined, the error `Missing or invalid user ID.` is raised.
- `%username%` in `newName` is replaced by the target's username (error `User not found: <id>.` if the user cannot be found).
- The change is applied like `$setNickname` (the bot needs `Manage Nicknames`; if Discord refuses the change, an error is raised).

## Examples

### Rename the mentioned member

```bdfd
$changeUsername[Gentle Member]
$sendMessage[Nickname changed.]
```

### Keep the username with a prefix

```bdfd
$changeUsername[[Member] %username%]
$sendMessage[Nickname updated.]
```

## Notes

- Only the nickname on the current server is changed; the global account name is never modified.
- Use `$changeUsernameWithID[userID;newName]` to name the target by ID, or `$setNickname[nickname;(userID)]` which also accepts an empty nickname.
