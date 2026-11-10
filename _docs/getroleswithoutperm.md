---
layout: doc
title: $getRolesWithoutPerm[]
translation_key: docs
category: "Server Helpers"
function_name: getRolesWithoutPerm
syntax: $getRolesWithoutPerm[permission;(separator);(guildID);(includeAdmin)]
description: "Lists the IDs of the roles that do NOT have a permission. The opposite of `$getRolesWithPerm`."
---
# $getRolesWithoutPerm — Lists the IDs of the roles that do NOT have a permission

## Syntax

```
$getRolesWithoutPerm[permission;(separator);(guildID);(includeAdmin)]
```

## Parameters

- **permission** *(text, required)* — Same as `$getRolesWithPerm`.
- **separator** *(text, optional)* — Default: `,`.
- **guildID** *(ID, optional)* — Default: the current server.
- **includeAdmin** *(`yes` or `no`, optional)* — `yes` (default): Administrator roles count as having the permission, so they are not listed.

## Return Value

- string: the role IDs, or empty.

## Usage

```
$getRolesWithoutPerm[manageMessages] → "50,40,10"
```

## Example

```bdfd
$sendMessage[$getRolesWithoutPerm[manageMessages]]
```
