---
layout: doc
title: $giveRoleByName[]
translation_key: docs
category: "Server Helpers"
function_name: giveRoleByName
syntax: $giveRoleByName[userID;roleName]
description: "Gives a role to a member, found by its name (not case sensitive)."
---
# $giveRoleByName — Gives a role to a member, found by its name (not case sensitive)

## Syntax

```
$giveRoleByName[userID;roleName]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleName** *(text, required)* — The role name. An unknown name, or a name shared by several roles, raises an error.

## Return Value

- empty.

## Usage

```
$giveRoleByName[$authorID;Member]
```

## Example

```bdfd
$sendMessage[$giveRoleByName[$authorID;Member]]
```
