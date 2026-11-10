---
layout: doc
title: $botCanManageRole[]
translation_key: docs
category: "Server Helpers"
function_name: botCanManageRole
syntax: $botCanManageRole[roleID]
description: "Tells whether the bot can give or take a role: it must have Manage Roles (or Administrator) and its highest role must be above that role. This is the first cause of \"Missing Permissions\" errors on `$giveRole`."
---
# $botCanManageRole — Tells whether the bot can give or take a role: it must have Manage Roles (or Administrator) and its highest role must be above that role

## Syntax

```
$botCanManageRole[roleID]
```

## Parameters

- **roleID** *(ID, required)* — The role.

## Return Value

- `true` or `false`.

## Usage

```
$onlyIf[$botCanManageRole[$roleID[VIP]]==true;Move my role above VIP first.]
```

## Important Notes

- The check is about the hierarchy and Manage Roles, not about roles managed by an integration.

## Example

```bdfd
$sendMessage[$onlyIf[$botCanManageRole[$roleID[VIP]]==true;Move my role above VIP first.]]
```
