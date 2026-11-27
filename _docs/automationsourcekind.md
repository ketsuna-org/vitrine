---
layout: doc
title: $automationSourceKind
translation_key: docs
category: "Automations"
function_name: automationSourceKind
syntax: $automationSourceKind
description: Returns the kind of source: rss, youtube, twitch or bluesky of the automation alert being handled.
---

# $automationSourceKind

`$automationSourceKind` returns the kind of source: rss, youtube, twitch or bluesky, for the alert that started the workflow.

## Syntax

```
$automationSourceKind
```

## Return value

- **Type**: Text
- The value supplied by the automation alert
- An empty string outside an "Automation alert" workflow

## Behavior

- Takes **no arguments**.
- Available in workflows triggered by the **Automation alert** event. A server's admins create automations from `/config` or the server dashboard; the bot owner enables the feature on the bot.
- JavaScript reads the same value as `automation.sourceKind`, and blocks and texts as `((automation.sourceKind))`.

## Examples

```bdfd
Hello: $automationSourceKind
```
