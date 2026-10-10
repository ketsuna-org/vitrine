---
layout: doc
title: $roleExists
translation_key: docs
category: "Entity Info"
function_name: roleExists
syntax: $roleExists[roleID]
description: Checks if a role exists on the server. Returns "true" or "false".
---

# $roleExists

The function `$roleExists` checks if a **Discord role exists** on the server using its ID.

## Syntax

```
$roleExists[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to check in the current server. Required. A value that is not a positive number returns `"false"`. |

## Return Value

| Type | Description |
|---|---|
| `string` | `"true"` if the role exists, `"false"` otherwise. |

## Examples

### Simple Check

```bdfd
$if[$roleExists[123456789012345678]==true]
  $sendMessage[The role $roleName[123456789012345678] exists.]
$else
  $sendMessage[This role does not exist.]
$endif
```

### Check before granting a role

```bdfd
$if[$roleExists[$roleID[Member]]==true]
  $roleGrant[$authorID;$roleID[Member]]
  $sendMessage[Member role granted!]
$else
  $sendMessage[The Member role does not exist. Please contact an administrator.]
$endif
```

## Notes

- Returns a string of `"true"` or `"false"`.
- Useful before using `$roleGrant` or other functions that manipulate roles.
