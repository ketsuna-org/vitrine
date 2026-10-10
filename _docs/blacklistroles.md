---
layout: doc
title: $blacklistRoles
translation_key: docs
category: "Moderation"
function_name: blacklistRoles
syntax: $blacklistRoles[roleName1;roleName2;...;errorMessage]
description: Guard function that blacklists roles by name. If the user has any of the roles, the command is interrupted.
---

# $blacklistRoles

The guard function `$blacklistRoles` blocks the execution of the command if the user has **at least one** of the blacklisted roles, identified by their **name**. To compare role IDs, use `$blacklistRolesIDs`.

## Syntax

```
$blacklistRoles[roleName1;roleName2;...;errorMessage]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `roleName1;roleName2;...` | String[] | Names of roles to blacklist, separated by `;`. At least one value is required (empty values are ignored). |
| `errorMessage` | String | **Required**, always the **last** argument. Message returned when the guard stops the command; it replaces the output of the script. Leave it empty (`;` at the end) for a silent stop. |

The function therefore needs at least 2 arguments. With a single argument, the call is rejected ("Invalid argument count").

## Behavior

- Looks up the roles of the command author (`author.id`, or `user.id`) in the current server and compares the values with the **name** of each of those roles (case-sensitive, values are trimmed). If the author ID is missing or invalid, the error "Invalid Discord ID." is raised. The `@everyone` role (whose ID is the server ID) counts as a role of the user.
- The match is an **OR**: a single matching role is enough.
- If the user has at least one matching role, the script is stopped and the error message is used as output.
- If the user has none (or all values are empty), the command continues.

## Return Value

Returns an empty string when the command continues. When the guard stops the command, the script is stopped and the error message (last argument) is used as its output.

## Examples

### Block muted users

```bdfd
$blacklistRoles[Muted;❌ You are currently muted. Contact a moderator.]
$sendMessage[Your message has been processed.]
```

### Multiple blacklisted roles

```bdfd
$blacklistRoles[Muted;Restricted;❌ Access forbidden for your role.]
$sendMessage[Command executed.]
```

### Silent stop

```bdfd
$blacklistRoles[Muted;]
$sendMessage[Command executed.]
```

## Notes

- `$blacklistRoles` compares role **names**; `$blacklistRolesIDs` compares role **IDs**. They are not interchangeable.
- To whitelist roles, use `$onlyForRoles`.
- Very useful to prevent muted or restricted users from using commands.
- Combine it with `$blacklistIDs` for complete protection (specific roles + users).
