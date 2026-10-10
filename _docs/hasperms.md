---
layout: doc
title: $hasPerms
translation_key: docs
category: "Moderation"
function_name: hasPerms
syntax: $hasPerms[userID;permission1;permission2;...]
description: Checks if a user has all specified permissions. Returns "true" or "false". Inline check, does not interrupt the command.
---

# $hasPerms

The function `$hasPerms` is an **inline permission check**. Unlike guards (`$onlyPerms`, `$onlyBotPerms`), it does not interrupt the command but returns `"true"` or `"false"`, allowing fine-grained conditional management.

## Syntax

```
$hasPerms[userID;permission1;permission2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | The ID of the user whose permissions to check. |
| `permission1;permission2;...` | String[] | List of permissions to verify (at least one is required). **All** permissions must be present. |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: the user has **all** listed permissions
- `"false"`: at least one permission is missing
- An error is raised if the user ID is invalid, if a permission name is empty or unknown, or if the member cannot be read.

## Behavior

- Checks the permissions of the user on the server (from their roles; channel overwrites are not applied).
- The check is of type **AND**: all listed permissions are required.
- The `Administrator` permission (and server ownership) implicitly satisfies all others.
- A member currently timed out only keeps the view-channel and read-history permissions.
- Permission names are case-insensitive and ignore spaces and symbols; aliases such as `Admin`, `Ban` and `Kick` are accepted.
- **Does not interrupt** the command (unlike `$onlyPerms`).

## Examples

### Simple Conditional Check

```bdfd
$if[$hasPerms[$authorID;BanMembers]==true]
  $banID[$noMentionMessage;$mentioned[1]]
  $sendMessage[Member banned.]
$else
  $sendMessage[❌ You do not have permission to ban.]
$endif
```

### Multi-Permission Check

```bdfd
$if[$hasPerms[$authorID;ManageMessages;ManageChannels]==true]
  $clear[$message[1]]
  $sendMessage[$message[1] messages deleted.]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

### Check Bot Permissions

```bdfd
$if[$hasPerms[$botID;KickMembers]==false]
  $sendMessage[⚠️ I do not have permission to kick. Please check my permissions.]
  $stop
$endif
$kick[$mentioned[1]]
```

### Conditional Log

```bdfd
$if[$hasPerms[$authorID;Administrator]==true]
  $log[Admin action: $userName used the command.]
$endif
```

## Notes

- `$hasPerms` is an **inline** function: it does not block the command. Use it with `$if` to create conditional behaviors.
- For the bot, use `$botID` as the `userID`.
- Permission names are usually written in PascalCase (`BanMembers`, `KickMembers`, `ManageMessages`, etc.); case does not matter.
- For a check with automatic interruption, use `$onlyPerms` (user) or `$onlyBotPerms` (bot).
- `$checkUserPerms` is an alias of `$hasPerms`.
