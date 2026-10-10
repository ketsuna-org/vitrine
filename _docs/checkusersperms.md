---
layout: doc
translation_key: docs
category: "Permission"
---

# $checkUsersPerms

Checks if **one user** has all the specified permissions. Returns `true` or `false`.

## Syntax

```bdfd
$checkUsersPerms[userID;permission1;(permission2);(...)]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `userID` | ID of the user to check (a positive number, otherwise the error `Invalid user ID.` is raised) | Yes |
| `permission1;(permission2);(...)` | One permission name per argument. At least one is required. | Yes |

## Description

In the engine, `$checkUsersPerms` behaves **exactly like `$checkUserPerms`** (and `$hasPerms`): the first argument is a single user ID and every following argument is one permission name. It does **not** accept several user IDs, a separator or a minimum user count.

The check uses an **AND** logic: the result is `true` only when all listed permissions are present. The user's permissions are computed from the server roles (no channel overwrites). The server owner and users with the `Administrator` permission always get `true`. The function runs inline: it does not stop the command.

## Return value

`true` or `false`. An error is raised if:

- the user ID is not a positive number (`Invalid user ID.`),
- a permission argument is empty (`Permission is required.`),
- a permission name is unknown or contains characters other than letters, digits and `_` (`Invalid permission.`),
- the command is not run in a server (`Permission lookup requires a guild.`).

## Examples

### Checking one user

```bdfd
$if[$checkUsersPerms[$authorID;KickMembers]==true]
  $sendMessage[You can kick members.]
$else
  $sendMessage[❌ Insufficient permissions.]
$endif
```

### Several permissions at once

```bdfd
$if[$checkUsersPerms[$mentioned[1];ManageMessages;KickMembers]==true]
  $sendMessage[This user can manage messages AND kick members.]
$else
  $sendMessage[This user does not have both permissions.]
$endif
```

## Notes

- Uses an **AND** logic: all listed permissions are required.
- Permission names are case-insensitive and non-alphanumeric characters are ignored (`KickMembers`, `kick_members` and `kickmembers` are the same). Some aliases are accepted, for example `Admin` for `Administrator`, `Ban` for `BanMembers`, `Kick` for `KickMembers`, `ManageServer` for `ManageGuild`.
- `Administrator` covers all permissions.
- `$checkUserPerms` is the same function under another name.
