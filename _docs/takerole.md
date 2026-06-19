---
layout: doc
title: $takeRole
translation_key: docs
category: "Moderation"
function_name: takeRole
syntax: $takeRole[userID;roleID]
description: Removes a role from a user on the server.
---

# $takeRole

The `$takeRole` function **removes a role** from a user on the Discord server. The bot must have the `ManageRoles` permission.

## Syntax

```
$takeRole[userID;roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target user. Required. |
| `roleID` | The ID of the role to remove. Required. |

## Return Value

None. The role is removed.

## Examples

### Simple Removal

```bdfd
$takeRole[$mentioned[1];$roleID[Muted]]
$sendMessage[🔊 <@$mentioned[1]> is no longer muted!]
```

### Removal After Verification

```bdfd
$if[$checkContains[$userRoles[$mentioned[1]];$roleID[Muted]]==true]
  $takeRole[$mentioned[1];$roleID[Muted]]
  $sendMessage[Muted role removed.]
$else
  $sendMessage[This user does not have the Muted role.]
$endif
```

### Removal Command with Confirmation

```bdfd
$takeRole[$mentioned[1];$roleID[$message[2]]]
$sendMessage[✅ Role removed from <@$mentioned[1]>.]
```

## Notes

- The bot must have the `ManageRoles` permission.
- The bot cannot remove a role higher than or equal to its own highest role.
- If the user does not have the role, nothing happens.
- To remove multiple roles, use `$takeRoles`.
- Functionally equivalent to `$roleRemove`.
