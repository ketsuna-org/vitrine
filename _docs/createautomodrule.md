---
layout: doc
title: $createAutoModRule
translation_key: docs
category: "AutoMod"
function_name: createAutoModRule
syntax: $createAutoModRule[name;triggerType;value;actionType;extra;exemptRoles;exemptChannels;(reason)]
description: Creates a Discord AutoMod rule and returns its ID.
---

# $createAutoModRule

Creates a Discord AutoMod rule and returns its ID. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$createAutoModRule[name;triggerType;value;actionType;extra;exemptRoles;exemptChannels;(reason)]
```

## Parameters

| Parameter | Description |
|---|---|
| `name` | **Required.** Rule name. |
| `triggerType` | **Required.** `keyword`, `keywordPreset`, `mentionSpam` or `spam`. |
| `value` | With `keyword`: the words, separated by commas. With `keywordPreset`: `profanity`, `sexualContent` or `slurs`, separated by commas. With `mentionSpam`: the maximum number of mentions. Ignored for `spam`. |
| `actionType` | `block_message` (default), `send_alert_message` or `timeout`. |
| `extra` | With `send_alert_message`: the alert channel ID. With `timeout`: the duration in seconds (60 by default). |
| `exemptRoles` | Role IDs exempt from the rule, separated by commas. |
| `exemptChannels` | Channel IDs exempt from the rule, separated by commas. |
| `reason` | Optional. Reason recorded in the server's audit log (up to 512 characters). Empty, or absent, uses the reason set with `$auditLogReason`, if any. |

## Return Value

- **Type**: String
- The ID of the new rule.

## Behavior

- Only the first two arguments are required.
- The bot needs Manage Server in the guild, and Discord limits each guild to a few rules per trigger type.
- Runs in a guild only.

## Examples

```bdfd
$createAutoModRule[No invites;keyword;discord.gg,discord.com/invite;block_message]
```

## Audit log reason

The last, optional argument `reason` is the reason shown next to this action in the server's audit log (Discord's `X-Audit-Log-Reason`). Without it, the reason set earlier in the script with `$auditLogReason` is used; with neither, no reason is recorded.
