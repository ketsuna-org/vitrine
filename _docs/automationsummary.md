---
layout: doc
title: $automationSummary
translation_key: docs
category: "Automations"
function_name: automationSummary
syntax: $automationSummary
description: Returns a short summary or description of the automation alert being handled.
---

# $automationSummary

`$automationSummary` returns a short summary or description, for the alert that started the workflow.

## Syntax

```
$automationSummary
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.summary`, and blocks and texts as `((automation.summary))`.

## Examples

```bdfd
Hello: $automationSummary
```
