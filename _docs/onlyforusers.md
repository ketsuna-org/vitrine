---
layout: doc
title: $onlyForUsers
translation_key: docs
category: "Moderation"
function_name: onlyForUsers
syntax: $onlyForUsers[username1;username2;...;errorMessage]
description: Guard function that stops execution if the username of the user is not in the list.
---

# $onlyForUsers

The guard function `$onlyForUsers` restricts command execution to a list of users identified by their **username** (not their ID). To restrict by ID, use `$onlyForIDs`.

## Syntax

```
$onlyForUsers[username1;username2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `username1;username2;...` | String[] | Usernames of authorized users, separated by `;`. The comparison ignores case. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Compares the username of the triggering user (`author.username`) with each value, **case-insensitively**. Values are not trimmed.
- If the username matches one of the values, the command continues.
- If it matches none (or the list contains only empty values), the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Restricted command

```bdfd
$onlyForUsers[jeremy;❌ Command reserved for the bot owner.]
$sendMessage[Welcome to the control panel.]
```

### Several users

```bdfd
$onlyForUsers[alice;bob;carol;❌ Access denied.]
$sendMessage[Welcome to the control panel.]
```

### Silent stop

```bdfd
$onlyForUsers[alice;]
$sendMessage[Hello alice.]
```

## Notes

- `$onlyForUsers` checks the **username**, not the ID. Usernames can change; for a reliable check use `$onlyForIDs`.
- For a role-based check, use `$onlyForRoles` or `$onlyForRoleIDs`.
- To blacklist users instead of whitelisting them, use `$blacklistUsers` or `$blacklistIDs`.
