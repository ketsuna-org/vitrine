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
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.author`, and blocks and texts as `((automation.author))`.

## Examples

```bdfd
Hello: $automationAuthor
```
