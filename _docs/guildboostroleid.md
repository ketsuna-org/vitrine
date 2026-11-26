---
layout: doc
title: $guildBoostRoleID[]
translation_key: docs
category: "Entity Info"
function_name: guildBoostRoleID
syntax: $guildBoostRoleID[guildID]
description: "Returns the server boost role id."
---
# $guildBoostRoleID — Returns the server boost role id.

## Syntax

```
$guildBoostRoleID[guildID]
```

## Parameters

- **guildID** *(id, required)* — The guild to retrieve the data

## Return Value

- Role.

## Usage

```
$guildBoostRoleID[guildID] → result
```

## Example

```bdfd
$sendMessage[Value: $guildBoostRoleID]
```
