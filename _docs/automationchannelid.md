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
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.channelId`, and blocks and texts as `((automation.channelId))`.

## Examples

```bdfd
Hello: $automationChannelID
```
