---
layout: doc
title: $roleEditable[]
translation_key: docs
category: "Entity Info"
function_name: roleEditable
syntax: $roleEditable[guildID;roleID]
description: "Returns whether the role is editable by the bot"
---
# $roleEditable — Returns whether the role is editable by the bot

## Syntax

```
$roleEditable[guildID;roleID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its editable state

## Return Value

- Boolean.

## Usage

```
$roleEditable[guildID;roleID] → result
```

## Example

```bdfd
$sendMessage[$roleEditable[10;70]]
```
