---
layout: doc
title: $onlyPerms
translation_key: docs
category: "Moderation"
function_name: onlyPerms
syntax: $onlyPerms[permission1;permission2;...;errorMessage]
description: Guard function that stops command execution if the user does not have all the specified permissions.
---

# $onlyPerms

The guard function `$onlyPerms` checks that the user has **all** the listed Discord permissions. If any permission is missing, the command is interrupted.

## Syntax

```
$onlyPerms[permission1;permission2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List of Discord permissions separated by `;`. The user must have **all** of these permissions. Permission names are case-insensitive; spaces, underscores and other non-alphanumeric characters are ignored, and some aliases are accepted (for example `Admin`, `Ban`, `Kick`, `ManageServer`). An unknown name raises an "Invalid permission." error; an empty name is ignored (if all are empty, nothing is checked and the command continues). At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Checks the permissions of the triggering user (`author.id`) at the **server** level (roles), not in the channel.
- The server owner and members with the `Administrator` permission pass the check for any permission.
- A member who is currently timed out only keeps `View Channel` and `Read Message History`.
- The check is an **AND** type: all listed permissions are required.
- If a permission is missing, the script is stopped and the error message is used as output.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Single permission

```bdfd
$onlyPerms[BanMembers;❌ Ban permission required.]
$sendMessage[You can ban members.]
```

### Multiple permissions

```bdfd
$onlyPerms[ManageMessages;ManageChannels;❌ You need Messages + Channels perms.]
$sendMessage[Allowed.]
```

### Silent stop

```bdfd
$onlyPerms[KickMembers;]
$sendMessage[You can kick members.]
```

## Notes

- To check the **bot's** permissions, use `$onlyBotPerms`.
- For an inline check (without interrupting the command), use `$hasPerms`.
- Place `$onlyPerms` at the beginning of the command to avoid any partial execution.
