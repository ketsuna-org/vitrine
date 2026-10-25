---
layout: doc
title: $editServer
translation_key: docs
category: "Server"
function_name: editServer
syntax: $editServer[setting;value]
description: Changes one setting of the current server.
---

# $editServer

Changes one setting of the current server. This function is a Bot Creator extension: it does not exist in the official BDFD wiki. It runs the same Discord logic as the matching block.

## Syntax

```
$editServer[setting;value]
```

## Parameters

| Parameter | Description |
|---|---|
| `setting` | **Required.** One of `name`, `description`, `preferredLocale`, `afkTimeoutSeconds`, `afkChannelId`, `systemChannelId`, `rulesChannelId`, `publicUpdatesChannelId`, `safetyAlertsChannelId`, `verificationLevel`, `defaultMessageNotificationLevel`, `explicitContentFilterLevel` (not case sensitive). Any other name raises an error. |
| `value` | **Required.** The new value. An empty value clears the field when Discord allows it. |

## Return Value

- **Type**: String
- Always empty.

## Behavior

- Changes one setting per call; call it several times to change several.
- The bot needs Manage Server in the guild.
- It never removes the bot from the server: use `$botLeave` for that.

## Examples

```bdfd
$editServer[name;$getVar[serverName]]
```
