---
layout: doc
title: $deleteAutoModRule
translation_key: docs
category: "AutoMod"
function_name: deleteAutoModRule
syntax: $deleteAutoModRule[ruleID]
description: Deletes a Discord AutoMod rule.
---

# $deleteAutoModRule

Deletes a Discord AutoMod rule. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$deleteAutoModRule[ruleID]
```

## Parameters

| Parameter | Description |
|---|---|
| `ruleID` | **Required.** The ID of the rule (see `$listAutoModRules`). |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Server in the guild.

## Examples

```bdfd
$deleteAutoModRule[123456789012345678]
```
