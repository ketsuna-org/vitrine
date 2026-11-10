---
layout: doc
title: $getRolesWithPerm[]
translation_key: docs
category: "Server Helpers"
function_name: getRolesWithPerm
syntax: $getRolesWithPerm[permission;(separator);(guildID);(includeAdmin)]
description: "Lists the IDs of the roles that have a permission, from the highest role to the lowest. Gives an empty text when no role has it."
---
# $getRolesWithPerm — Lists the IDs of the roles that have a permission, from the highest role to the lowest

## Syntax

```
$getRolesWithPerm[permission;(separator);(guildID);(includeAdmin)]
```

## Parameters

- **permission** *(text, required)* — A permission name (`manageMessages`, `ban`, `administrator`…, same names as `$highestRoleWithPerms`). Several permissions separated by `|` mean all of them. An unknown name raises "Unknown permission".
- **separator** *(text, optional)* — Between two IDs. Default: `,`.
- **guildID** *(ID, optional)* — Default: the current server.
- **includeAdmin** *(`yes` or `no`, optional)* — `yes` (default): a role with Administrator counts as having every permission, like Discord. `no`: only roles that carry the permission themselves.

## Return Value

- string: the role IDs, or an empty text (never `null`).

## Usage

```
$getRolesWithPerm[manageMessages] → "30,20"
$getRolesWithPerm[manageMessages;|;;no] → "20"
$getRolesWithPerm[banMembers;,;;no] → ""
```

## Important Notes

- `@everyone` is listed only when it has the permission.
- The IDs never get mixed together: pick another separator with `separator`.

## Example

```bdfd
$sendMessage[$getRolesWithPerm[manageMessages]]
```
