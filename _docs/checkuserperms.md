---
layout: doc
title: $checkUserPerms
translation_key: docs
category: "Moderation"
function_name: checkUserPerms
syntax: $checkUserPerms[userID;permission1;permission2;...]
description: Checks if a user has all the specified permissions. Alias of $hasPerms. Returns "true" or "false".
---

# $checkUserPerms

The `$checkUserPerms` function checks if a user has all the specified Discord permissions. This is a **direct alias** of `$hasPerms` — the two functions are strictly identical.

## Syntax

```
$checkUserPerms[userID;permission1;permission2;...]
```

## Parameters

| Parameter | Type | Description |
|-----------|------|-------------|
| `userID` | Snowflake | The ID of the user to check. |
| `permission1;permission2;...` | String[] | Required permissions (checks with **AND**). |

## Return value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user has all permissions.
- `"false"`: At least one permission is missing.

## Behavior

- **Inline** check: Does not interrupt the command.
- **AND** check: All listed permissions are required.
- `Administrator` covers all permissions.

## Examples

### Inline verification

```bdfd
$if[$checkUserPerms[$authorID;KickMembers]==true]
  $kick[$mentioned[1]]
$else
  $sendMessage[❌ KickMembers permission required.]
$endif
```

### Checking another user's permissions

```bdfd
$if[$checkUserPerms[$mentioned[1];Administrator]==true]
  $sendMessage[⚠️ You cannot perform this action on an administrator.]
  $stop
$endif
$ban[$mentioned[1]]
```

### Multi-permissions

```bdfd
$if[$checkUserPerms[$authorID;ManageMessages;ReadMessageHistory]==true]
  $clear[50]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

## Notes

- `$checkUserPerms` and `$hasPerms` are **interchangeable**. Use whichever syntax is most explicit for your context.
- For the bot itself, pass `$botID` as the `userID`.
- For a check with automatic interruption (guard), use `$onlyPerms`.
- Permissions are in **PascalCase**: `BanMembers`, `ManageMessages`, `Administrator`, etc.
