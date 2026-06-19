---
layout: doc
title: $onlyBotPerms
translation_key: docs
category: "Moderation"
function_name: onlyBotPerms
syntax: $onlyBotPerms[permission1;permission2;...;(errorMessage)]
description: A guard function that stops execution if the bot does not have all specified permissions on the server.
---

# $onlyBotPerms

The guard function `$onlyBotPerms` checks if the **bot itself** has all the specified Discord permissions on the server. If the bot lacks any of these permissions, the command execution is halted.

## Syntax

```
$onlyBotPerms[permission1;permission2;...;(errorMessage)]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `permission1;permission2;...` | String[] | List of Discord permissions separated by `;`. The bot must possess **all** of these permissions. |
| `errorMessage` | String (optional) | The message sent if the bot does not have the required permissions. If omitted, the bot remains silent. |

## Behavior

- Checks the global permissions of the bot on the server (not just in the current channel).
- The `Administrator` permission implicitly covers all other permissions.
- If the bot lacks the permissions, the command execution stops immediately.
- Difference from `$onlyPerms`: `$onlyPerms` checks the **user**, while `$onlyBotPerms` checks the **bot**.

## Examples

### Check before banning

```bdfd
$onlyBotPerms[BanMembers;❌ I do not have the **BanMembers** permission. Please contact an admin.]
$ban[$mentioned[1]]
```

### Multi-permission check

```bdfd
$onlyBotPerms[ManageMessages;ReadMessageHistory;❌ I need permissions to manage messages.]
$clear[50]
$sendMessage[Clean up completed.]
```

### Role creation command

```bdfd
$onlyBotPerms[ManageRoles;❌ I cannot create roles without the **ManageRoles** permission.]
$createRole[New Role;#5865F2]
$sendMessage[Role created successfully.]
```

## Notes

- Use this systematically before any action requiring specific bot permissions (banning, kicking, managing roles, deleting messages, etc.).
- For permissions specific to the **channel** (e.g. `SendMessages`, `ViewChannel`), use `$onlyBotChannelPerms`.
- Permission names must be in PascalCase (`ManageMessages`, `BanMembers`, etc.).
- Equivalent to `$onlyIf[$hasPerms[$botID;Permission]==true]` but more concise.
