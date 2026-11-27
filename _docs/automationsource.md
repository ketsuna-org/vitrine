---
layout: doc
title: $automationSource
translation_key: docs
category: "Automations"
function_name: automationSource
syntax: $automationSource
description: Returns the source address (feed URL, channel, account) of the automation alert being handled.
---

# $automationSource

`$automationSource` returns the source address (feed URL, channel, account), for the alert that started the workflow.

## Syntax

```
$automationSource
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.source`, and blocks and texts as `((automation.source))`.

## Examples

```bdfd
Hello: $automationSource
```
