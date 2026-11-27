---
layout: doc
title: $getAutomodRuleActions[]
translation_key: docs
category: "Entity Info"
function_name: getAutomodRuleActions
syntax: $getAutomodRuleActions[guildID;ruleID;(property);(separator)]
description: "Returns the actions of an automod rule from a guild"
---
# $getAutomodRuleActions — Returns the actions of an automod rule from a guild

## Syntax

```
$getAutomodRuleActions[guildID;ruleID;(property);(separator)]
```

## Parameters

- **guildID** *(id, required)* — The guild to get automod rule from
- **ruleID** *(id, required)* — The automod rule to get its actions
- **property** *(text, optional)* — The property of each action to return
- **separator** *(text, optional)* — The separator to use for every property

## Return Value

- Json.

## Usage

```
$getAutomodRuleActions[guildID;ruleID;(property);(separator)] → result
```

## Example

```bdfd
$sendMessage[$getAutomodRuleActions[10;500;type]]
```
