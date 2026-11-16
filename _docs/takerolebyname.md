---
layout: doc
title: $takeRoleByName[]
translation_key: docs
category: "Server Helpers"
function_name: takeRoleByName
syntax: $takeRoleByName[userID;roleName;(reason)]
description: "Takes a role from a member, found by its name."
---
# $takeRoleByName — Takes a role from a member, found by its name

## Syntax

```
$takeRoleByName[userID;roleName;(reason)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleName** *(text, required)* — The role name.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- empty.

## Usage

```
$takeRoleByName[$authorID;Member]
```

## Example

```bdfd
$takeRoleByName[$authorID;Member]
$sendMessage[Role removed.]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
