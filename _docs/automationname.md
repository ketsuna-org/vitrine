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
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.name`, and blocks and texts as `((automation.name))`.

## Examples

```bdfd
Hello: $automationName
```
