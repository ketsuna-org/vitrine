---
layout: doc
title: $roleFlags[]
translation_key: docs
category: "Entity Info"
function_name: roleFlags
syntax: $roleFlags[guildID;roleID;(separator)]
description: "Returns the role flags."
---
# $roleFlags — Returns the role flags.

## Syntax

```
$roleFlags[guildID;roleID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its flags
- **separator** *(text, optional)* — The separator to use for every flag

## Return Value

- RoleFlags[].

## Usage

```
$roleFlags[guildID;roleID;(separator)] → result
```

## Example

```bdfd
$sendMessage[Value: $roleFlags[10;70]]
```
