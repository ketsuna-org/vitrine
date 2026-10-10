---
layout: doc
title: $roleGrant
translation_key: docs
category: "Moderation"
function_name: roleGrant
syntax: $roleGrant[userID;+roleID1;-roleID2;...]
description: Adds and removes several roles of a user in one call, each role ID being prefixed by + (add) or - (remove).
---

# $roleGrant

The function `$roleGrant` **adds and/or removes roles** of a member of the current server in a single call. Every role argument starts with `+` (give the role) or `-` (take the role).

## Syntax

```
$roleGrant[userID;+roleID1;-roleID2;...]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | The ID of the target member. Required, must be a positive number (`Missing or invalid user ID.`). |
| `+roleID` / `-roleID` | One or more role IDs, each prefixed by `+` (assign) or `-` (remove). At least one is required. An argument that starts with neither sign raises `A role grant must start with + or -.`; the ID after the sign must be a positive number (`Missing or invalid role ID.`). |

There is no server argument: the current server is always used.

## Return Value

None (empty string).

## Behavior

- All arguments are validated first; if one is invalid nothing is changed.
- The changes are then applied one after the other, in the order written. If one change fails (for example the bot cannot manage that role), the error is raised and the following changes are not applied.
- The bot must have `Manage Roles`; each role must be below the bot's highest role, and `@everyone` and managed roles (bot, integration, booster) cannot be assigned or removed.

## Examples

### Add one role

```bdfd
$roleGrant[$authorID;+$roleID[Member]]
$sendMessage[You now have the Member role!]
```

### Swap two roles

```bdfd
$roleGrant[$mentioned[1];+$roleID[Member];-$roleID[Newcomer]]
$sendMessage[<@$mentioned[1]> is now a Member.]
```

### Verification before assignment

```bdfd
$if[$roleExists[$roleID[VIP]]==true]
  $roleGrant[$authorID;+$roleID[VIP]]
  $sendMessage[VIP role successfully assigned!]
$else
  $sendMessage[The VIP role does not exist.]
$endif
```

## Notes

- Without the `+` / `-` sign the call is rejected: `$roleGrant[$authorID;$roleID[Member]]` is an error.
- To give one role without signs, use `$giveRole`; to remove one, use `$takeRole`.
- To replace all roles of a user, use `$setUserRoles`.
