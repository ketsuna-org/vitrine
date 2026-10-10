---
layout: doc
title: $blacklistUsers
translation_key: docs
category: "Moderation"
function_name: blacklistUsers
syntax: $blacklistUsers[username1;username2;...;errorMessage]
description: Guard function that blacklists users by username. The command is interrupted if the username of the triggering user is in the list.
---

# $blacklistUsers

The guard function `$blacklistUsers` blocks the execution of the command for the listed users, identified by their **username** (not their ID). To blacklist by ID, use `$blacklistIDs`.

## Syntax

```
$blacklistUsers[username1;username2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username1;username2;...` | String[] | Usernames to blacklist, separated by `;`. The comparison ignores case. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the username of the triggering user (`author.username`) with each value, **case-insensitively**. Values are not trimmed.
- If the username matches one of the values, the script is stopped and the error message is used as output.
- If it matches none, the command continues.
- Empty values never match.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Blacklist with message

```bdfd
$blacklistUsers[baduser;spammer42;❌ You are blacklisted.]
$sendMessage[Access allowed.]
```

### Silent stop (empty error message)

```bdfd
$blacklistUsers[baduser;]
$sendMessage[OK.]
```

## Notes

- Unlike `$blacklistIDs`, this function compares **usernames**, which users can change. For a reliable blacklist, prefer `$blacklistIDs`.
- To blacklist roles, use `$blacklistRoles` or `$blacklistRolesIDs`.
- To whitelist (only allow certain users), use `$onlyForUsers`.
