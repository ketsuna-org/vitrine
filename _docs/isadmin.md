---
layout: doc
title: $isAdmin
translation_key: docs
category: "Entity Info"
function_name: isAdmin
syntax: $isAdmin[userID]
description: Returns "true" if the given user has the Administrator permission on the server, and "false" otherwise.
---

# $isAdmin

The function `$isAdmin[userID]` returns `"true"` if the given user has the **Administrator** permission on the Discord server.

## Syntax

```
$isAdmin[userID]
```

## Parameters

| Parameter | Description |
|---|---|
| `userID` | Required. The Discord ID of the user to check. An invalid ID raises an error ("Invalid Discord ID."). |

## Return Value

- **Type**: String `"true"` or `"false"`
- `"true"`: The user has the `Administrator` permission.
- `"false"`: The user does not have this permission.

## Behavior

- `$isAdmin` takes **one argument**, the user ID; a bare `$isAdmin` is invalid.
- The `Administrator` permission grants **all** permissions on the server.
- The server owner is implicitly an administrator (returns `"true"`).

## Examples

### Restricting a command

```bdfd
$if[$isAdmin[$authorID]==true]
  $ban[Moderation]
  $sendMessage[<@$mentioned[1]> was banned.]
$else
  $sendMessage[Only administrators can use this command.]
$endif
```

### Displaying an admin menu

```bdfd
$if[$isAdmin[$authorID]==true]
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
$if[$isAdmin[$authorID]==true]
  $log[Admin action performed by $userName (ID: $userID)]
$endif
```

## Notes

- `$isAdmin` only checks for the `Administrator` permission, not other individual permissions.
- To check for a specific permission (e.g., `BanMembers`, `ManageMessages`), use `$userPerms[userID;amount;separator]` and test the result for the permission name.
