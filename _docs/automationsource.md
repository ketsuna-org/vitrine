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
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.source`, and blocks and texts as `((automation.source))`.

## Examples

```bdfd
Hello: $automationSource
```
