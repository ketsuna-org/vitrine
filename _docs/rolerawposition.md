---
layout: doc
title: $roleRawPosition[]
translation_key: docs
category: "Entity Info"
function_name: roleRawPosition
syntax: $roleRawPosition[guildID;roleID]
description: "Returns the role raw position."
---
# $roleRawPosition — Returns the role raw position.

## Syntax

```
$roleRawPosition[guildID;roleID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its raw position

## Return Value

- Number.

## Usage

```
$roleRawPosition[guildID;roleID] → result
```

## Example

```bdfd
$sendMessage[$roleRawPosition[10;70]]
```
