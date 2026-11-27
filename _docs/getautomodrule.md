---
layout: doc
title: $getAutomodRule[]
translation_key: docs
category: "Entity Info"
function_name: getAutomodRule
syntax: $getAutomodRule[guildID;ruleID;(property);(separator)]
description: "Returns an automod rule of a guild"
---
# $getAutomodRule — Returns an automod rule of a guild

## Syntax

```
$getAutomodRule[guildID;ruleID;(property);(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get automod rule from
- **ruleID** *(id, required)* — The automod rule to get
- **property** *(text, optional)* — The property of the automod rule to return
- **separator** *(text, optional)* — The separator to use in case of array

## Return Value

- Json.

## Usage

```
$getAutomodRule[guildID;ruleID;(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$getAutomodRule[10;500;name]]
```
