---
layout: doc
title: $guildHighestRoleID[]
translation_key: docs
category: "Entity Info"
function_name: guildHighestRoleID
syntax: $guildHighestRoleID[guildID]
description: "Returns the highest role id of a guild."
---
# $guildHighestRoleID — Returns the highest role id of a guild.

## Syntax

```
$guildHighestRoleID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve its highest role

## Return Value

- Role.

## Usage

```
$guildHighestRoleID[guildID] → result
```

## Example

```bdfd
$sendMessage[$guildHighestRoleID]
```
