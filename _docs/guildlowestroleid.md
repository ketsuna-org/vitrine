---
layout: doc
title: $guildLowestRoleID[]
translation_key: docs
category: "Entity Info"
function_name: guildLowestRoleID
syntax: $guildLowestRoleID[guildID]
description: "Returns the lowest role id of a guild."
---
# $guildLowestRoleID — Returns the lowest role id of a guild.

## Syntax

```
$guildLowestRoleID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve its lowest role

## Return Value

- Role.

## Usage

```
$guildLowestRoleID[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildLowestRoleID]
```
