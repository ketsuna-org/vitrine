---
layout: doc
title: $onlyPerms
translation_key: docs
category: "Moderation"
function_name: onlyPerms
syntax: $onlyPerms[permission1;permission2;...;(errorMessage)]
description: Guard function that stops command execution if the user does not have all the specified permissions.
---

# $onlyPerms

The guard function `$onlyPerms` checks that the user has **all** the listed Discord permissions. If any permission is missing, the command is interrupted.

## Syntax

```
$onlyPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List of Discord permissions separated by `;`. The user must have **all** of these permissions. |
| `errorMessage` | String (optional) | Message sent to the user if permissions are insufficient. If omitted, the bot remains silent. |

**Common Discord permissions:** `Administrator`, `BanMembers`, `KickMembers`, `ManageMessages`, `ManageChannels`, `ManageRoles`, `ManageGuild`, `ModerateMembers`, `MuteMembers`, `DeafenMembers`, `MoveMembers`, `ManageNicknames`, `ManageWebhooks`, `ManageGuildExpressions`, `ViewAuditLog`, `ViewGuildInsights`.

## Behavior

- Checks the user's permissions **in the server**, not in the channel.
- If the user has the `Administrator` permission, **all** other permissions are implicitly granted.
- The check is an **AND** type: all listed permissions are required.

## Examples

### Single permission

```bdfd
$onlyPerms[BanMembers;❌ Ban permission required.]
$ban[$mentioned[1];Reason provided by staff]
$sendMessage[$mentioned[1] has been banned.]
```

### Multiple permissions

```bdfd
$onlyPerms[ManageMessages;ManageChannels;❌ You need Messages + Channels perms.]
$clear[50]
$sendMessage[50 messages deleted.]
```

### Without error message (silent)

```bdfd
$onlyPerms[KickMembers]
$kick[$mentioned[1]]
```

## Notes

- Permission names are case-sensitive. Use Discord's exact PascalCase notation (`BanMembers`, not `banmembers`).
- To check the **bot's** permissions, use `$onlyBotPerms`.
- For an inline check (without interrupting the command), use `$hasPerms`.
- Place `$onlyPerms` at the beginning of the command to avoid any partial execution.
