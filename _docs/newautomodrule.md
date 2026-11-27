---
layout: doc
title: $newAutomodRule[]
translation_key: docs
category: "Events"
function_name: newAutomodRule
syntax: $newAutomodRule[property;(separator)]
description: "State of the AutoMod rule of a rule event. Properties: id, name, authorID, enabled, eventType, triggerType, exemptRoles, exemptChannels, actions, keywordFilter, regexPatterns, presets, allowList, mentionTotalLimit, mentionRaidProtectionEnabled."
---
# $newAutomodRule — State of the AutoMod rule of a rule event. Properties: id, name, authorID, enabled, eventType, triggerType, exemptRoles, exemptChannels, actions, keywordFilter, regexPatterns, presets, allowList, mentionTotalLimit, mentionRaidProtectionEnabled.

## Syntax

```
$newAutomodRule[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$newAutomodRule[property;separator] → result
```

## Example

```bdfd
$sendMessage[$newAutomodRule[property;separator]]
```
