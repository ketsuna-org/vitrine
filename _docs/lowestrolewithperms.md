---
layout: doc
title: $lowestRoleWithPerms
translation_key: docs
category: "Entity Info"
function_name: lowestRoleWithPerms
syntax: $lowestRoleWithPerms[permission1;permission2;...]
description: Returns the ID of the lowest role of the user that possesses the specified permissions.
---

# $lowestRoleWithPerms

The function `$lowestRoleWithPerms[]` returns the **ID of the lowest role** of the user that possesses one or more specific permissions.

## Syntax

```
$lowestRoleWithPerms[permission1;permission2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `permissions` | One or more Discord permissions, separated by semicolons. All listed permissions must be present on the role. |

## Return Value

- **Type** : Snowflake (numeric string) or empty string
- The ID of the lowest role possessing all requested permissions
- Empty string if no role matches

## Behavior

- Scans the user's roles from lowest to highest.
- Returns the **first** (lowest) role that possesses **all** specified permissions.
- Permission names are in English (matching the Discord API nomenclature).

## Examples

### Find the lowest role with voice access

```bdfd
$let[voiceRole;$lowestRoleWithPerms[Connect;Speak]]
$if[$voiceRole!=]
  $sendMessage[Your lowest voice role: $roleName[$voiceRole]]
$endif
```

### Check basic permissions

```bdfd
$let[basicRole;$lowestRoleWithPerms[SendMessages;ReadMessageHistory]]
$if[$basicRole!=]
  $sendMessage[The role $roleName[$basicRole] grants you message access.]
$endif
```

### Comparison between highest/lowest

```bdfd
$let[highest;$highestRoleWithPerms[ManageMessages]]
$let[lowest;$lowestRoleWithPerms[ManageMessages]]
$title[Moderation Permissions]
$description[
**Highest Role:** $roleName[$highest]
**Lowest Role:** $roleName[$lowest]
]
$color[#5865F2]
$sendMessage[]
```

## Notes

- Useful for determining the minimum level at which a permission is granted.
- If `$highestRoleWithPerms[]` and `$lowestRoleWithPerms[]` return the same ID, only a single role possesses those permissions.
- Ideal for permission hierarchy and granular verification systems.

