---
layout: doc
title: $copyRolePerms[]
translation_key: docs
category: "Server Helpers"
function_name: copyRolePerms
syntax: $copyRolePerms[sourceRoleID;targetRoleID]
description: "Makes the permissions of a role identical to those of another role. Only the differing permissions are changed."
---
# $copyRolePerms — Makes the permissions of a role identical to those of another role

## Syntax

```
$copyRolePerms[sourceRoleID;targetRoleID]
```

## Parameters

- **sourceRoleID** *(ID, required)* — The role to copy.
- **targetRoleID** *(ID, required)* — The role to change. `@everyone` is refused.

## Return Value

- empty.

## Usage

```
$copyRolePerms[111;222]
```

## Important Notes

- The bot needs Manage Roles and its role must be above the target role.

## Example

```bdfd
$sendMessage[$copyRolePerms[111;222]]
```
