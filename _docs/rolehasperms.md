---
layout: doc
title: $roleHasPerms[]
translation_key: docs
category: "Entity Info"
function_name: roleHasPerms
syntax: $roleHasPerms[guildID;roleID;perms]
description: "Returns whether the role has all specified perms."
---
# $roleHasPerms — Returns whether the role has all specified perms.

## Syntax

```
$roleHasPerms[guildID;roleID;perms]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to get its perms
- **perms** *(text, required)* — The perms to check for

## Return Value

- Boolean.

## Usage

```
$roleHasPerms[guildID;roleID;perms] → result
```

## Example

```bdfd
$sendMessage[$roleHasPerms[10;71;SendMessages;ViewChannel]]
```
