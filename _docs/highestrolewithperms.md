---
layout: doc
title: $highestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: highestRoleWithPerms
syntax: $highestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the highest role of the server that possesses all the specified permissions.
---

# $highestRoleWithPerms

The `$highestRoleWithPerms` function returns the **ID of the highest role of the server** (in the role hierarchy) that has all the specified permissions.

## Syntax

```
$highestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permission1;permission2;...` | One or more permissions (at least one is required), separated by semicolons. All listed permissions must be present on the role. |

## Return Value

- **Type**: Snowflake (numeric string) or empty string
- The ID of the highest matching role.
- An empty string if no role has all the requested permissions.
- The error `Invalid role permissions.` is raised if a permission name is empty or unknown.

## Behavior

- Checks all the roles of the server, from highest to lowest (`@everyone` last); it does not depend on a user.
- Returns the **first** (highest) role that has **all** the specified permissions.
- A role with the `Administrator` permission satisfies every permission.
- Permission names are English, case-insensitive; spaces and symbols are ignored and aliases such as `Admin`, `Ban` and `Kick` are accepted.

## Examples

### Find a moderator role

```bdfd
$var[modRole;$highestRoleWithPerms[ManageMessages]]
$if[$var[modRole]!=]
  $sendMessage[Highest role able to manage messages: $roleName[$var[modRole]]]
$else
  $sendMessage[No role can manage messages.]
$endif
```

### Check for admin role

```bdfd
$if[$highestRoleWithPerms[Administrator]!=]
  $sendMessage[The server has a role with the Administrator permission.]
$endif
```

### Role with ban permissions

```bdfd
$var[banRole;$highestRoleWithPerms[BanMembers]]
$if[$var[banRole]!=]
  $title[Ban Role]
  $description[
  **Role:** $roleName[$var[banRole]]
  **ID:** $var[banRole]
  ]
  $color[#ED4245]
$endif
```

## Notes

- Permissions are cumulative: the role must have **all** the listed permissions.
- If you want a role that has **one or another** permission, make two separate calls.
- To get the lowest role with these permissions, use `$lowestRoleWithPerms[]`.
