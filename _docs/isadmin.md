---
layout: doc
title: $isAdmin
translation_key: docs
category: "Entity Info"
function_name: isAdmin
syntax: $isAdmin
description: Returns "true" if the user has the Administrator permission on the server, and "false" otherwise.
---

# $isAdmin

The function `$isAdmin` returns `"true"` if the user has the **Administrator** permission on the Discord server.

## Syntax

```
$isAdmin
```

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user has the `Administrator` permission.
- `"false"`: The user does not have this permission.

## Behavior

- `$isAdmin` takes **no arguments**.
- The `Administrator` permission grants **all** permissions on the server.
- The server owner is implicitly an administrator (returns `"true"`).

## Examples

### Restricting a command

```bdfd
$if[$isAdmin==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> was banned.]
$else
  $sendMessage[Only administrators can use this command.]
$endif
```

### Displaying an admin menu

```bdfd
$if[$isAdmin==true]
  $title[Administration Panel]
  $description[
  **Available commands:**
  `/ban`, `/kick`, `/mute`, `/config`
  ]
  $color[#ED4245]
  $sendMessage[]
$endif
```

### Logging admin actions

```bdfd
$if[$isAdmin==true]
  $log[Admin action performed by $userName (ID: $userID)]
$endif
```

## Notes

- `$isAdmin` only checks for the `Administrator` permission, not other individual permissions.
- To check for a specific permission (e.g., `BanMembers`, `ManageMessages`), use `$checkContains[$userPerms;PermissionName]`.
- Equivalent to `$checkContains[$userPerms;Administrator]==true`.
