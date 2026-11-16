---
layout: doc
title: $giveRoleByName[]
translation_key: docs
category: "Server Helpers"
function_name: giveRoleByName
syntax: $giveRoleByName[userID;roleName;(reason)]
description: "Gives a role to a member, found by its name (not case sensitive)."
---
# $giveRoleByName — Gives a role to a member, found by its name (not case sensitive)

## Syntax

```
$giveRoleByName[userID;roleName;(reason)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleName** *(text, required)* — The role name. An unknown name, or a name shared by several roles, raises an error.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- empty.

## Usage

```
$giveRoleByName[$authorID;Member]
```

## Example

```bdfd
$giveRoleByName[$authorID;Member]
$sendMessage[Role given.]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
