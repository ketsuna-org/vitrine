---
layout: doc
title: $automationText
translation_key: docs
category: "Automations"
function_name: automationText
syntax: $automationText
description: Returns the text of the post (Bluesky) of the automation alert being handled.
---

# $automationText

`$automationText` returns the text of the post (Bluesky), for the alert that started the workflow.

## Syntax

```
$automationText
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.text`, and blocks and texts as `((automation.text))`.

## Examples

```bdfd
Hello: $automationText
```
