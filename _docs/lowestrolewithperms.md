---
layout: doc
title: $lowestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: lowestRoleWithPerms
syntax: $lowestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the lowest role of the server (in the role hierarchy) that possesses all the specified permissions.
---

# $lowestRoleWithPerms

The function `$lowestRoleWithPerms[]` returns the **ID of the lowest role of the server** (in the role hierarchy) that possesses one or more specific permissions.

## Syntax

```
$lowestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permission1;permission2;...` | Required, at least one. Discord permissions, separated by semicolons. All listed permissions must be present on the role. A role with the `Administrator` permission counts as having all of them. An unknown permission name raises an error. |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- The ID of the lowest role possessing all requested permissions
- Empty string if no role matches

## Behavior

- Scans all the roles of the server (not only the roles of a given user), ordered by the role hierarchy.
- Returns the **lowest** role that possesses **all** specified permissions.
- Permission names are in English; case and non-alphanumeric characters are ignored (e.g. `SendMessages`), and some aliases (e.g. `admin`, `ban`, `kick`) are accepted.

## Examples

### Find the lowest role with voice access

```bdfd
$var[voiceRole;$lowestRoleWithPerms[Connect;Speak]]
$if[$var[voiceRole]!=]
  $sendMessage[Lowest role granting voice access: $roleName[$var[voiceRole]]]
$endif
```

### Check basic permissions

```bdfd
$var[basicRole;$lowestRoleWithPerms[SendMessages;ReadMessageHistory]]
$if[$var[basicRole]!=]
  $sendMessage[The role $roleName[$var[basicRole]] is the lowest role granting message access.]
$endif
```

### Comparison between highest/lowest

```bdfd
$var[highest;$highestRoleWithPerms[ManageMessages]]
$var[lowest;$lowestRoleWithPerms[ManageMessages]]
$title[Moderation Permissions]
$description[
**Highest Role:** $roleName[$var[highest]]
**Lowest Role:** $roleName[$var[lowest]]
]
$color[#5865F2]
```

## Notes

- Useful for determining the minimum level at which a permission is granted.
- If `$highestRoleWithPerms[]` and `$lowestRoleWithPerms[]` return the same ID, only a single role possesses those permissions.
- Ideal for permission hierarchy and granular verification systems.

