---
layout: doc
title: $highestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: highestRoleWithPerms
syntax: $highestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the user's highest role that possesses the specified permissions.
---

# $highestRoleWithPerms

The `$highestRoleWithPerms` function returns the **ID of the highest role** of the user that has one or more specified permissions.

## Syntax

```
$highestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permissions` | One or more Discord permissions, separated by semicolons. All listed permissions must be present on the role. |

## Return Value

- **Type**: Snowflake (numeric string) or empty string
- The ID of the highest matching role.
- An empty string if no role has all the requested permissions.

## Behavior

- Checks the user's roles from highest to lowest.
- Returns the **first** (highest) role that has **all** the specified permissions.
- Permission names must be in English (Discord API terminology).

## Examples

### Find a moderator role

```bdfd
$var[modRole;$highestRoleWithPerms[ManageMessages]]
$if[$var[modRole]!=]
  $sendMessage[Your moderation role: $roleName[$var[modRole]]]
$else
  $sendMessage[You do not have a moderation role.]
$endif
```

### Check for admin role

```bdfd
$if[$highestRoleWithPerms[Administrator]!=]
  $sendMessage[You have an administrator role.]
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
  $sendMessage[]
$endif
```

## Notes

- Permissions are cumulative: the role must have **all** the listed permissions.
- If you want a role that has **one or another** permission, make two separate calls.
- To get the lowest role with these permissions, use `$lowestRoleWithPerms[]`.
