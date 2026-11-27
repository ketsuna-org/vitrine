---
layout: doc
title: $automationAuthor
translation_key: docs
category: "Automations"
function_name: automationAuthor
syntax: $automationAuthor
description: Returns the author or channel name of the automation alert being handled.
---

# $automationAuthor

`$automationAuthor` returns the author or channel name, for the alert that started the workflow.

## Syntax

```
$automationAuthor
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.author`, and blocks and texts as `((automation.author))`.

## Examples

```bdfd
Hello: $automationAuthor
```
