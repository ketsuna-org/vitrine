---
layout: doc
title: $automationTitle
translation_key: docs
category: "Automations"
function_name: automationTitle
syntax: $automationTitle
description: Returns the title of the item of the automation alert being handled.
---

# $automationTitle

`$automationTitle` returns the title of the item, for the alert that started the workflow.

## Syntax

```
$automationTitle
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.title`, and blocks and texts as `((automation.title))`.

## Examples

```bdfd
Hello: $automationTitle
```
