---
layout: doc
title: $editRolePosition[]
translation_key: docs
category: "Moderation"
function_name: editRolePosition
syntax: $editRolePosition[guildID;roleID;position]
description: "Edits a role's position, returns boolean."
---
# $editRolePosition — Edits a role's position, returns boolean.

## Syntax

```
$editRolePosition[guildID;roleID;position]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to edit position for
- **position** *(number, required)* — The new position for the role

## Return Value

- Boolean.

## Usage

```
$editRolePosition[guildID;roleID;position] → result
```

## Example

```bdfd
$sendMessage[$editRolePosition[10;70;3]]
```
