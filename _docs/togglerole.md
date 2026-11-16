---
layout: doc
title: $toggleRole[]
translation_key: docs
category: "Server Helpers"
function_name: toggleRole
syntax: $toggleRole[userID;roleID;(reason)]
description: "Gives the role if the member does not have it, takes it away otherwise. Handy for role menus and buttons."
---
# $toggleRole — Gives the role if the member does not have it, takes it away otherwise

## Syntax

```
$toggleRole[userID;roleID;(reason)]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleID** *(ID, required)* — The role.
- **reason** *(text, optional)* — The reason recorded in the server's audit log (up to 512 characters). Empty or absent: the reason set with `$auditLogReason`, if any.

## Return Value

- `added` or `removed`.

## Usage

```
$toggleRole[$authorID;123] → "added"
```

## Example

```bdfd
$sendMessage[$toggleRole[$authorID;123]]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
