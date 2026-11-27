---
layout: doc
title: $automationThumbnail
translation_key: docs
category: "Automations"
function_name: automationThumbnail
syntax: $automationThumbnail
description: Returns the image address of the item of the automation alert being handled.
---

# $automationThumbnail

`$automationThumbnail` returns the image address of the item, for the alert that started the workflow.

## Syntax

```
$automationThumbnail
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.thumbnail`, and blocks and texts as `((automation.thumbnail))`.

## Examples

```bdfd
Hello: $automationThumbnail
```
