---
layout: doc
title: $roleTags[]
translation_key: docs
category: "Entity Info"
function_name: roleTags
syntax: $roleTags[guildID;roleID;(separator)]
description: "Returns all role tags."
---
# $roleTags — Returns all role tags.

## Syntax

```
$roleTags[guildID;roleID;(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to pull the role from
- **roleID** *(id, required)* — The role to return its perms
- **separator** *(text, optional)* — The separator to use for every perm

## Return Value

- String[].

## Usage

```
$roleTags[guildID;roleID;(separator)] → result
```

## Example

```bdfd
$sendMessage[$roleTags[10;72]]
```
