---
layout: doc
title: $url
translation_key: docs
category: "Context & Commands"
function_name: url
syntax: $url
description: "Returns the URL of the web page currently loaded in the bot's context. Useful in web interactions or dashboards."
---

# $url

The function `$url` returns the **URL of the current web context** in which the bot is running.

## Syntax

```
$url
```

## Parameters

None.

## Return Value

- **Type** : String
- The URL of the current context (web page, dashboard, etc.).

## Behavior

- Returns the page URL if the bot is executed in a web context.
- May return an empty string outside a web context.

## Examples

### Display the current URL

```bdfd
$sendMessage[Current URL: $url]
```

### Check a specific page

```bdfd
$if[$checkContains[$url;/dashboard]==true]
  $sendMessage[You are on the dashboard.]
$else
  $sendMessage[You are on: $url]
$endif
```

## Notes

- Context-dependent: returns nothing in classic Discord commands.
- Useful for web-based applications and BDFD dashboards.
