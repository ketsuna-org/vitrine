---
layout: doc
title: $roleManageable[]
translation_key: docs
category: "Entity Info"
function_name: roleManageable
syntax: $roleManageable[guildID;roleID]
description: "Returns whether the role is managed by discord"
---
# $roleManageable — Returns whether the role is managed by discord

## Syntax

```
$roleManageable[guildID;roleID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its managed state

## Return Value

- Boolean.

## Usage

```
$roleManageable[guildID;roleID] → result
```

## Example

```bdfd
$sendMessage[$roleManageable[10;72]]
```
