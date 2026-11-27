---
layout: doc
title: $automationViewers
translation_key: docs
category: "Automations"
function_name: automationViewers
syntax: $automationViewers
description: Returns the viewer count (Twitch) of the automation alert being handled.
---

# $automationViewers

`$automationViewers` returns the viewer count (Twitch), for the alert that started the workflow.

## Syntax

```
$automationViewers
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.viewers`, and blocks and texts as `((automation.viewers))`.

## Examples

```bdfd
Hello: $automationViewers
```
