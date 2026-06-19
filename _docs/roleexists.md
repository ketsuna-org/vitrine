---
layout: doc
title: $roleExists
translation_key: docs
category: "Entity Info"
function_name: roleExists
syntax: $roleExists[roleID;(guildID)]
description: Checks if a role exists on the server. Returns "true" or "false".
---

# $roleExists

The function `$roleExists` checks if a **Discord role exists** on the server using its ID.

## Syntax

```
$roleExists[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role to check. Required. |
| `guildID` | Optional. The ID of the target server. If omitted, the current server is used. |

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

### On another server

```bdfd
$if[$roleExists[123456789012345678;987654321098765432]==true]
  $sendMessage[Role valid.]
$endif
```

## Notes

- Returns a string of `"true"` or `"false"`.
- Useful before using `$roleGrant` or other functions that manipulate roles.
