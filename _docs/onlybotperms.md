---
layout: doc
title: $onlyBotPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotPerms
syntax: $onlyBotPerms[permission1;permission2;...;errorMessage]
description: A guard function that stops execution if the bot does not have all specified permissions on the server.
---

# $onlyBotPerms

The guard function `$onlyBotPerms` checks if the **bot itself** has all the specified Discord permissions on the server. If the bot lacks any of these permissions, the command execution is halted.

## Syntax

```
$onlyBotPerms[permission1;permission2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List of Discord permissions separated by `;`. The bot must possess **all** of these permissions. Permission names are case-insensitive; spaces, underscores and other non-alphanumeric characters are ignored, and some aliases are accepted (for example `Admin`, `Ban`, `Kick`, `ManageServer`). An unknown name raises an "Invalid permission." error; an empty name is ignored (if all are empty, nothing is checked and the command continues). At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Checks the permissions of the bot at the **server** level (roles), not in the current channel.
- The `Administrator` permission (and server ownership) covers all other permissions.
- A member who is currently timed out only keeps `View Channel` and `Read Message History`.
- If a permission is missing, the script is stopped and the error message is used as output.
- Difference from `$onlyPerms`: `$onlyPerms` checks the **user**, while `$onlyBotPerms` checks the **bot**.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Check before banning

```bdfd
$onlyBotPerms[BanMembers;❌ I do not have the **BanMembers** permission. Please contact an admin.]
$sendMessage[I can ban members.]
```

### Multi-permission check

```bdfd
$onlyBotPerms[ManageMessages;ReadMessageHistory;❌ I need permissions to manage messages.]
$sendMessage[Ready to clean up.]
```

### Silent stop

```bdfd
$onlyBotPerms[ManageRoles;]
$sendMessage[I can manage roles.]
```

## Notes

- Use this systematically before any action requiring specific bot permissions (banning, kicking, managing roles, deleting messages, etc.).
- For permissions specific to a **channel**, use `$onlyBotChannelPerms`.
