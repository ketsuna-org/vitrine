---
layout: doc
title: $oldAutomodRule[]
translation_key: docs
category: "Events"
function_name: oldAutomodRule
syntax: $oldAutomodRule[property;(separator)]
description: "Previous state of the AutoMod rule of a rule event. Properties: id, name, authorID, enabled, eventType, triggerType, exemptRoles, exemptChannels, actions, keywordFilter, regexPatterns, presets, allowList, mentionTotalLimit, mentionRaidProtectionEnabled."
---
# $oldAutomodRule — Previous state of the AutoMod rule of a rule event. Properties: id, name, authorID, enabled, eventType, triggerType, exemptRoles, exemptChannels, actions, keywordFilter, regexPatterns, presets, allowList, mentionTotalLimit, mentionRaidProtectionEnabled.

## Syntax

```
$oldAutomodRule[property;(separator)]
```

## Parameters

- **property** *(String, required)* — Property to read
- **separator** *(String, optional)* — Separator for lists

## Return Value

- String.

## Usage

```
$oldAutomodRule[property;separator] → result
```

## Example

```bdfd
$sendMessage[$oldAutomodRule[property;separator]]
```
