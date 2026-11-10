---
layout: doc
title: $takeRoleByName[]
translation_key: docs
category: "Server Helpers"
function_name: takeRoleByName
syntax: $takeRoleByName[userID;roleName]
description: "Takes a role from a member, found by its name."
---
# $takeRoleByName — Takes a role from a member, found by its name

## Syntax

```
$takeRoleByName[userID;roleName]
```

## Parameters

- **userID** *(ID, required)* — The member.
- **roleName** *(text, required)* — The role name.

## Return Value

- empty.

## Usage

```
$takeRoleByName[$authorID;Member]
```

## Example

```bdfd
$sendMessage[$takeRoleByName[$authorID;Member]]
```
