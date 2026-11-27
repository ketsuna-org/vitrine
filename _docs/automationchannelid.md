---
layout: doc
title: $automationChannelID
translation_key: docs
category: "Automations"
function_name: automationChannelID
syntax: $automationChannelID
description: Returns the Discord ID of the channel the alert is posted in of the automation alert being handled.
---

# $automationChannelID

`$automationChannelID` returns the Discord ID of the channel the alert is posted in, for the alert that started the workflow.

## Syntax

```
$automationChannelID
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.channelId`, and blocks and texts as `((automation.channelId))`.

## Examples

```bdfd
Hello: $automationChannelID
```
