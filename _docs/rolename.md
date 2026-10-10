---
layout: doc
title: $roleName
translation_key: docs
category: "Entity Info"
function_name: roleName
syntax: $roleName[roleID]
description: Returns the name of a Discord role from its ID.
---

# $roleName

The function `$roleName` returns the **name** of a Discord role from its **ID**.

## Syntax

```
$roleName[roleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role in the current server. Required. An invalid ID raises "Invalid role ID."; an unknown role raises "Role not found.". |

## Return Value

| Type | Description |
|---|---|
| `string` | The name of the role (e.g., `Admin`, `Moderator`). |

## Examples

### Get the name of a role

```bdfd
$sendMessage[The role ID 123456789012345678 is: $roleName[123456789012345678]]
```

### Display the name of the first role of a user

```bdfd
$sendMessage[Your first role: $roleName[$getRole[$authorID;1]]]
```

### Verify a role name

```bdfd
$if[$roleName[123456789012345678]==Admin]
  $sendMessage[This is indeed the Admin role.]
$endif
```

## Notes

- The ID of the role must exist on the current server, otherwise an error is raised.
- To get the ID from a name, use `$roleID`.
- To list all roles, use `$roleNames`.
