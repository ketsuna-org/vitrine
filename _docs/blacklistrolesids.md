---
layout: doc
translation_key: docs
category: "Moderation"
---

# $blacklistRolesIDs

Adds role IDs to the command's blacklist. Users with any of the specified roles will not be able to execute the command.

## Syntax

```
$blacklistRolesIDs[roleIds;(errorMessage)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `roleIds` | IDs of the roles to blacklist, separated by `;` | Yes |
| `errorMessage` | Custom error message sent when a user has a blacklisted role | No |

## Description

`$blacklistRolesIDs` is a **guard function** that blocks command execution if the user has at least one of the specified roles. The check is performed with an **OR** condition: a single match among the listed roles is enough to block the user.

If no custom error message is provided, a default message is sent.

## Examples

### Default error

```
$blacklistRolesIDs[123456789012345678]
$sendMessage[Command executed successfully.]
```

### Multiple roles with custom message

```
$blacklistRolesIDs[111111111111111111;222222222222222222;333333333333333333;❌ You are not allowed to use this command.]
$sendMessage[Processing...]
```

### Variable-based blacklist

```
$blacklistRolesIDs[$getServerVar[blacklistedRoles];⛔ Access denied.]
$sendMessage[Done.]
```

## Notes

- Uses an **OR** logic: the user is blocked if they have **any** of the listed roles.
- Role IDs must be valid Discord snowflakes (18-19 digits).
- To whitelist roles, use `$onlyForRoleIDs`.
- For easier maintenance, store blacklisted role IDs in server variables.
