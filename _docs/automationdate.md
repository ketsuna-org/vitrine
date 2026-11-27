---
layout: doc
title: $automationDate
translation_key: docs
category: "Automations"
function_name: automationDate
syntax: $automationDate
description: Returns the publication date of the automation alert being handled.
---

# $automationDate

`$automationDate` returns the publication date, for the alert that started the workflow.

## Syntax

```
$automationDate
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.date`, and blocks and texts as `((automation.date))`.

## Examples

```bdfd
Hello: $automationDate
```
