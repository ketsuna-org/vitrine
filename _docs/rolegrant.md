---
layout: doc
title: $roleGrant
translation_key: docs
category: "Moderation"
function_name: roleGrant
syntax: $roleGrant[userID;roleID;(guildID)]
description: Assigns a role to a member of the server.
---

# $roleGrant

The function `$roleGrant` **assigns a role** to a member of the Discord server. The bot must have the `ManageRoles` permission to perform this action.

## Syntax

```
$roleGrant[userID;roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target member. Required. |
| `roleID` | The ID of the role to assign. Required. |
| `guildID` | Optional. The ID of the target server. |

## Return Value

None. The function performs the assignment action.

## Examples

### Simple assignment

```bdfd
$roleGrant[$authorID;$roleID[Member]]
$sendMessage[You now have the Member role!]
```

### Verification before assignment

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $roleGrant[$authorID;$roleID[VIP]]
  $sendMessage[VIP role successfully assigned!]
$else
  $sendMessage[The VIP role does not exist.]
$endif
```

### Assigning to another member

```bdfd
$roleGrant[$mentioned[1];$roleID[Muted]]
$sendMessage[<@$mentioned[1]> has been muted.]
```

### With hierarchy check

```bdfd
$if[$rolePosition[$getRole[$authorID;1]]>$rolePosition[$roleID[Mod]]]
  $roleGrant[$mentioned[1];$roleID[Mod]]
  $sendMessage[<@$mentioned[1]> is now a Moderator!]
$else
  $sendMessage[You do not have permission to promote moderators.]
$endif
```

## Notes

- The bot must have the `ManageRoles` permission.
- The bot cannot assign a role higher than its own highest role.
- If the member already has the role, nothing happens.
- To remove a role, use `$roleRemove`.
