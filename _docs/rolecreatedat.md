---
layout: doc
title: $roleCreatedAt[]
translation_key: docs
category: "Entity Info"
function_name: roleCreatedAt
syntax: $roleCreatedAt[guildID;roleID]
description: "Returns the role creation date."
---
# $roleCreatedAt — Returns the role creation date.

## Syntax

```
$roleCreatedAt[guildID;roleID]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its creation date

## Return Value

- Number.

## Usage

```
$roleCreatedAt[guildID;roleID] → result
```

## Example

```bdfd
$sendMessage[$roleCreatedAt[10;70]]
```
