---
layout: doc
title: $userPerms
translation_key: docs
category: "Entity Info"
function_name: userPerms
syntax: $userPerms
description: Returns the list of effective permissions of the user on the current server.
---

# $userPerms

The `$userPerms` function returns the **list of effective permissions** of the user on the server. The permissions are calculated by combining the permissions of all their roles and channel overrides.

## Syntax

```
$userPerms
```

## Return Value

- **Type**: List of permission names, separated by commas
- Example: `SendMessages, ReadMessageHistory, AddReactions, UseExternalEmojis`
- Standard permission list from the Discord API.

## Behavior

- `$userPerms` takes **no arguments**.
- Returns the **effective permissions** (resulting from all roles).
- If the user has the `Administrator` permission, all other permissions are implicitly included.

## Examples

### Display permissions

```bdfd
$title[Permissions of $userName]
$description[
**Permissions:**
$userPerms
]
$color[#5865F2]
$sendMessage[]
```

### Restrict a command to moderators

```bdfd
$if[$checkContains[$userPerms;BanMembers]==true]
  $ban[$mentioned]
  $sendMessage[<@$mentioned> was banned.]
$else
  $sendMessage[You do not have permission to ban members.]
$endif
```

### Check multiple permissions

```bdfd
$if[$checkContains[$userPerms;ManageMessages]==true]
  $deleteMessage[$messageID[$mentioned]]
  $sendMessage[Message deleted.]
$else
  $sendMessage[ManageMessages permission required.]
$endif
```

## Notes

- Permission names are in **English** (Discord API nomenclature).
- For a simple admin check, use `$isAdmin` or `$checkContains[$userPerms;Administrator]`.
- `$userPerms` and `$memberPerms` return the same result for the triggering user.
