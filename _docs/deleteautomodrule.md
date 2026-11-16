---
layout: doc
title: $deleteAutoModRule
translation_key: docs
category: "AutoMod"
function_name: deleteAutoModRule
syntax: $deleteAutoModRule[ruleID;(reason)]
description: Deletes a Discord AutoMod rule.
---

# $deleteAutoModRule

Deletes a Discord AutoMod rule. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$deleteAutoModRule[ruleID;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `ruleID` | **Required.** The ID of the rule (see `$listAutoModRules`). |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- The bot needs Manage Server in the guild.

## Examples

```bdfd
$deleteAutoModRule[123456789012345678]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
