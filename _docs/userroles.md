---
layout: doc
title: $userRoles
translation_key: docs
category: "Entity Info"
function_name: userRoles
syntax: $userRoles
description: Returns the list of role IDs assigned to the user on the current server.
---

# $userRoles

The `$userRoles` function returns the **list of role IDs** assigned to the user on the server where the command is executed.

## Syntax

```
$userRoles
```

## Return Value

- **Type**: List of snowflakes (numerical strings), separated by commas
- Example: `123456789,987654321,555555555`
- Includes the `@everyone` role and all assigned roles.

## Behavior

- `$userRoles` takes **no arguments**.
- Returns the IDs of **all** the roles of the user on the server.
- The order may correspond to the hierarchy (from lowest to highest).

## Examples

### Display role IDs

```bdfd
$title[Roles of $userName]
$description[
The user has the following roles:
`$userRoles`
]
$color[#5865F2]
$sendMessage[]
```

### Check for a specific role

```bdfd
$if[$checkContains[$userRoles;123456789012345678]==true]
  $sendMessage[You have the VIP role!]
$else
  $sendMessage[You do not have the VIP role.]
$endif
```

### Count roles

```bdfd
$let[count;$arrayCount[$splitText[$userRoles;,]]]
$sendMessage[You have $count roles on this server.]
```

## Notes

- The IDs are numerical snowflakes, not role names.
- Use `$roleName[ID]` to get the name of a role from its ID.
- To check permissions, use `$userPerms` which is more directly exploitable.
