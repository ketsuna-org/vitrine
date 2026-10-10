---
layout: doc
title: $userRoles
translation_key: docs
category: "Entity Info"
function_name: userRoles
syntax: $userRoles[userID]
description: Returns the names of the roles assigned to the user on the current server, one per line.
---

# $userRoles

The `$userRoles` function returns the **names of the roles** assigned to a user on the server where the command is executed.

## Syntax

```
$userRoles[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | **Required.** The ID of the user (digits only, greater than 0). Otherwise `Invalid user ID.` is raised. |

`$userRoles` without brackets, or with more than one argument, is refused ("Invalid argument count").

## Return Value

- **Type**: String
- The names of the user's roles, separated by line breaks (`\n`).
- Role IDs that do not match a role of the server are omitted.
- The names follow the order of the member's role list as returned by Discord; they are not sorted by server hierarchy.
- The user must be a member of the current server (the member lookup is done in that server).

## Examples

### Display the roles of the author

```bdfd
$title[Roles of $username]
$description[$userRoles[$authorID]]
$color[#5865F2]
```

### Check for a specific role

```bdfd
$if[$checkContains[$userRoles[$authorID];VIP]==true]
  $sendMessage[You have the VIP role!]
$else
  $sendMessage[You do not have the VIP role.]
$endif
```

## Notes

- The result contains role **names**, not IDs.
