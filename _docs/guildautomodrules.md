---
layout: doc
title: $guildAutomodRules[]
translation_key: docs
category: "Entity Info"
function_name: guildAutomodRules
syntax: $guildAutomodRules[guildID;(property);(separator)]
description: "Returns all automod rules of a guild."
---
# $guildAutomodRules — Returns all automod rules of a guild.

## Syntax

```
$guildAutomodRules[guildID;(property);(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get automod rules from
- **property** *(text, optional)* — The property of each automod rule to return
- **separator** *(text, optional)* — The separator to use for each property

## Return Value

- Json,Unknown[].

## Usage

```
$guildAutomodRules[guildID;(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$guildAutomodRules[10;name]]
```
