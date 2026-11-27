---
layout: doc
title: $automationLink
translation_key: docs
category: "Automations"
function_name: automationLink
syntax: $automationLink
description: Returns the link to the item of the automation alert being handled.
---

# $automationLink

`$automationLink` returns the link to the item, for the alert that started the workflow.

## Syntax

```
$automationLink
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.link`, and blocks and texts as `((automation.link))`.

## Examples

```bdfd
Hello: $automationLink
```
