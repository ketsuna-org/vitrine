---
layout: doc
title: $automationGame
translation_key: docs
category: "Automations"
function_name: automationGame
syntax: $automationGame
description: Returns the game being streamed (Twitch) of the automation alert being handled.
---

# $automationGame

`$automationGame` returns the game being streamed (Twitch), for the alert that started the workflow.

## Syntax

```
$automationGame
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.game`, and blocks and texts as `((automation.game))`.

## Examples

```bdfd
Hello: $automationGame
```
