---
layout: doc
translation_key: docs
category: "Permission"
---

# $checkUsersPerms

Checks if one or multiple users have all the specified permissions. Returns `true` or `false`.

## Syntax

```
$checkUsersPerms[userIds;permissions;(separator);(amount)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `userIds` | IDs of users to check, separated by the chosen separator | Yes |
| `permissions` | Permissions to check, separated by `;` | Yes |
| `separator` | Separator used in `userIds` (default: `;`) | No |
| `amount` | Minimum number of users who must have the permissions for the result to be `true` (default: 1) | No |

## Description

`$checkUsersPerms` is the **multi-user version** of `$checkUserPerms`. It checks whether one or more users possess all the specified permissions and allows defining a minimum threshold of users who must satisfy the condition.

This function performs an **inline** check — it does not interrupt the command and simply returns `true` or `false`.

The permissions check is done with an **AND** logic: all listed permissions must be present for a user to be counted as having them.

## Examples

### Checking multiple users

```
$if[$checkUsersPerms[$authorID;$mentioned[1];KickMembers]==true]
  $kick[$mentioned[2]]
  $sendMessage[User kicked.]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

### At least 2 users must have Administrator

```
$if[$checkUsersPerms[$authorID;$mentioned[1];$mentioned[2];Administrator;;2]==true]
  $sendMessage[At least 2 users are administrators.]
$else
  $sendMessage[Less than 2 users have Administrator permission.]
$endif
```

### Custom separator

```
$var[ids;$authorID,$mentioned[1],$mentioned[2]]
$if[$checkUsersPerms[$var[ids];ManageMessages;,]==true]
  $clear[50]
  $sendMessage[Messages cleared.]
$endif
```

## Notes

- Uses an **AND** logic for permissions: all listed permissions are required for a user.
- The `amount` parameter lets you define how many users must satisfy the condition.
- Use `$checkUserPerms` for a single-user check (simpler syntax).
- Permissions are in **PascalCase**: `KickMembers`, `BanMembers`, `Administrator`, `ManageMessages`, etc.
- `Administrator` covers all permissions.
