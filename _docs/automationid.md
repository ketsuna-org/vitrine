---
layout: doc
title: $automationID
translation_key: docs
category: "Automations"
function_name: automationID
syntax: $automationID
description: Returns the identifier of the automation of the automation alert being handled.
---

# $automationID

`$automationID` returns the identifier of the automation, for the alert that started the workflow.

## Syntax

```
$automationID
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.id`, and blocks and texts as `((automation.id))`.

## Examples

```bdfd
Hello: $automationID
```
