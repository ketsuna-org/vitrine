---
layout: doc
title: $roleName
translation_key: docs
category: "Entity Info"
function_name: roleName
syntax: $roleName[roleID;(guildID)]
description: Returns the name of a Discord role from its ID.
---

# $roleName

The function `$roleName` returns the **name** of a Discord role from its **ID**.

## Syntax

```
$roleName[roleID;(guildID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `roleID` | The ID of the role. Required. |
| `guildID` | Optional. The ID of the target server. If omitted, the current server is used. |

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

### On another server

```bdfd
$sendMessage[Role: $roleName[123456789012345678;987654321098765432]]
```

## Notes

- The ID of the role must be valid on the server.
- To get the ID from a name, use `$roleID`.
- To list all roles, use `$roleNames`.
