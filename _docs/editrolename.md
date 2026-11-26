---
layout: doc
title: $editRoleName[]
translation_key: docs
category: "Moderation"
function_name: editRoleName
syntax: $editRoleName[guildID;roleID;name]
description: "Edits a role's name, returns boolean."
---
# $editRoleName — Edits a role's name, returns boolean.

## Syntax

```
$editRoleName[guildID;roleID;name]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to edit name for
- **name** *(text, required)* — The new name for the role

## Return Value

- Boolean.

## Usage

```
$editRoleName[guildID;roleID;name] → result
```

## Example

```bdfd
$sendMessage[$editRoleName[10;70;Mods]]
```
