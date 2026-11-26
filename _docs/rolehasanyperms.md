---
layout: doc
title: $roleHasAnyPerms[]
translation_key: docs
category: "Entity Info"
function_name: roleHasAnyPerms
syntax: $roleHasAnyPerms[guildID;roleID;perms]
description: "Returns whether the role has any of the specified perms."
---
# $roleHasAnyPerms — Returns whether the role has any of the specified perms.

## Syntax

```
$roleHasAnyPerms[guildID;roleID;perms]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to get its perms
- **perms** *(text, required)* — The perms to check for

## Return Value

- Boolean.

## Usage

```
$roleHasAnyPerms[guildID;roleID;perms] → result
```

## Example

```bdfd
$sendMessage[$roleHasAnyPerms[10;71;BanMembers;SendMessages]]
```
