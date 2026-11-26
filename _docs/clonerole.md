---
layout: doc
title: $cloneRole[]
translation_key: docs
category: "Moderation"
function_name: cloneRole
syntax: $cloneRole[guildID;roleID;(name)]
description: "Clones an existing role of a guild, returns role id if success."
---
# $cloneRole — Clones an existing role of a guild, returns role id if success.

## Syntax

```
$cloneRole[guildID;roleID;(name)]
```

## Parameters

- **guildID** *(id, required)* — The guild to fetch role from
- **roleID** *(id, required)* — The role to clone
- **name** *(text, optional)* — The role name for the cloned role

## Return Value

- Role.

## Usage

```
$cloneRole[guildID;roleID;(name)] → result
```

## Example

```bdfd
$sendMessage[$cloneRole[10;70;Copy]]
```
