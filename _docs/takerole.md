---
layout: doc
title: $takeRole
category: "Moderation"
function_name: takeRole
syntax: $takeRole[userID;roleID;(reason)] or $takeRole[roleID]
description: Removes a role from a user on the server.
locale: en
translation_key: doc-takerole
---

# $takeRole

The `$takeRole` function **removes a role** from a user on the Discord server. The bot must have the `ManageRoles` permission.

## Syntax

```
$takeRole[userID;roleID;(reason)]
$takeRole[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Optional - The ID of the target user. If only one argument is given, it is read as the role ID and the role is removed from the users mentioned in the message; an error is raised if there is no mention (the author is never used as a fallback). |
| `roleID` | The ID of the role to remove (a positive number). Required. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

None (empty string). An error is raised if the user ID or role ID is invalid.

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
- The bot must have `Manage Roles`; the role must be below the bot's highest role, and `@everyone` and managed roles (bot, integration, booster) cannot be removed.
- To remove multiple roles, use `$takeRoles`.

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
