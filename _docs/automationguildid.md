---
layout: doc
title: $automationGuildID
translation_key: docs
category: "Automations"
function_name: automationGuildID
syntax: $automationGuildID
description: Returns the Discord ID of the server that owns the automation of the automation alert being handled.
---

# $automationGuildID

`$automationGuildID` returns the Discord ID of the server that owns the automation, for the alert that started the workflow.

## Syntax

```
$automationGuildID
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. Server admins create alerts with a command the bot owner writes (see [`$createAlert`]({{ '/docs/createalert/' | relative_url }})); the owner turns the feature on for the bot.
- JavaScript reads the same value as `automation.guildId`, and blocks and texts as `((automation.guildId))`.

## Examples

```bdfd
Hello: $automationGuildID
```
