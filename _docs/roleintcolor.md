---
layout: doc
title: $roleIntColor[]
translation_key: docs
category: "Entity Info"
function_name: roleIntColor
syntax: $roleIntColor[guildID;roleID;(color)]
description: "Returns the role color as int."
---
# $roleIntColor — Returns the role color as int.

## Syntax

```
$roleIntColor[guildID;roleID;(color)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its color
- **color** *(text, optional)* — The role color to return

## Return Value

- Color.

## Usage

```
$roleIntColor[guildID;roleID;(color)] → result
```

## Example

```bdfd
$sendMessage[$roleIntColor[10;71]]
```
