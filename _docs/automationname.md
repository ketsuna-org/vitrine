---
layout: doc
title: $automationName
translation_key: docs
category: "Automations"
function_name: automationName
syntax: $automationName
description: Returns the name of the automation of the automation alert being handled.
---

# $automationName

`$automationName` returns the name of the automation, for the alert that started the workflow.

## Syntax

```
$automationName
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.name`, and blocks and texts as `((automation.name))`.

## Examples

```bdfd
Hello: $automationName
```
