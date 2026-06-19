---
layout: doc
title: $onlyForUsers
translation_key: docs
category: "Moderation"
function_name: onlyForUsers
syntax: $onlyForUsers[userID1;userID2;...;(errorMessage)]
description: Guard function that stops execution if the user is not part of the list of authorized IDs.
---

# $onlyForUsers

The guard function `$onlyForUsers` restricts command execution to a specific list of users, identified by their Discord ID. If the user who triggers the command is not in the list, the command is interrupted.

## Syntax

```
$onlyForUsers[userID1;userID2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID1;userID2;...` | Snowflake[] | List of Discord IDs of authorized users. Separator `;`. |
| `errorMessage` | String (optional) | Message sent to unauthorized users. |

## Behavior

- Compares the triggering user's ID with the provided list.
- If the ID matches one of the IDs in the list, the command continues.
- If the ID matches **no** ID in the list, the command is interrupted.
- The error message, if provided, is sent before the interruption.

## Examples

### Owner-only command

```bdfd
$onlyForUsers[$botOwnerID;❌ Command reserved for the bot owner.]
$restart
```

### Multiple trusted users

```bdfd
$onlyForUsers[111111111111111111;222222222222222222;333333333333333333;❌ Access denied.]
$sendMessage[Welcome to the control panel.]
```

### Without error message

```bdfd
$onlyForUsers[123456789012345678]
$eval[$message]
```

## Notes

- Discord IDs are 17 to 19 digit numbers (snowflakes). Enable **Developer Mode** in Discord to obtain them (right-click → Copy ID).
- `$onlyForUsers` checks the user ID, not the name or tag. Use `$onlyForRoles` for a role-based check.
- `$onlyForIDs` is an alias of `$onlyForUsers` — the two functions are interchangeable.
- To blacklist users instead of whitelisting them, use `$blacklistUsers` or `$blacklistIDs`.
