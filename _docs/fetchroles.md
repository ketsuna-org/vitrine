---
layout: doc
title: $fetchRoles[]
translation_key: docs
category: "Entity Info"
function_name: fetchRoles
syntax: $fetchRoles[guildID;(roleID)]
description: "Caches all roles of a guild."
---
# $fetchRoles — Caches all roles of a guild.

## Syntax

```
$fetchRoles[guildID;(roleID)]
```

## Parameters

- **guildID** *(id, required)* — The guild to cache roles of
- **roleID** *(id, optional)* — The role to fetch

## Return Value

- string.

## Usage

```
$fetchRoles[guildID;(roleID)] → result
```

## Example

```bdfd
$fetchRoles[10]
$sendMessage[Done]
```
