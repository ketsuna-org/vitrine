---
layout: doc
title: $giveRole
translation_key: docs
category: "Moderation"
function_name: giveRole
syntax: $giveRole[(userID);roleID]
description: Assigns a role to a user on the server.
---

# $giveRole

The function `$giveRole` assigns a role to a user on the Discord server. The bot must have the `ManageRoles` permission.

## Syntax

```
$giveRole[userID;roleID]
```

Or with a single parameter (targeting the users mentioned in the message):

```
$giveRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional. The ID of the target user. With a single parameter, the role is given to the users mentioned in the message (never to the author). |
| `roleID` | The ID of the role to assign. Required, must be a valid ID. |

## Return Value

None. The role is assigned.

An error is raised if the role or user ID is invalid, or if the single-parameter form is used and the message mentions nobody.

## Examples

### Simple assignment

```bdfd
$giveRole[$mentioned[1];$roleID[Confirmed]]
$sendMessage[<@$mentioned[1]> has received the Confirmed role!]
```

### Assignment to the author

```bdfd
$giveRole[$authorID;$roleID[Member]]
$sendMessage[$userName, you now have the Member role.]
```

### Assignment command with verification

```bdfd
$if[$roleExists[$roleID[$message[2]]]==true]
  $giveRole[$mentioned[1];$roleID[$message[2]]]
  $sendMessage[Role assigned successfully.]
$else
  $sendMessage[This role does not exist.]
$endif
```

### Assignment after hierarchy check

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]<$rolePosition[$roleID[Staff]]]
  $giveRole[$mentioned[1];$roleID[Staff]]
  $sendMessage[<@$mentioned[1]> is now Staff!]
$else
  $sendMessage[You do not have permission to promote members.]
$endif
```

## Notes

- The bot must have the `ManageRoles` permission.
- The bot cannot assign a role higher than its own highest role.
- To assign multiple roles at once, use `$giveRoles`.
- To replace all roles of a user, use `$setUserRoles`.
- To add or remove several roles in one call, use `$roleGrant`.
