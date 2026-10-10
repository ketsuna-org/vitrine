---
layout: doc
title: $randomGuildID[]
translation_key: docs
category: "Math & Text"
function_name: randomGuildID
syntax: $randomGuildID
description: Returns the ID of a random server among the servers where the bot is present.
---

# $randomGuildID[]

The `$randomGuildID[]` function returns the Discord ID of a random server of the bot.

## Syntax

```
$randomGuildID
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

The Discord ID (snowflake) of a random server, as a string.

## Behavior

- The candidates are the servers returned by Discord for the bot account.
- If that list is empty (or no guild service is available), the ID of the current server is returned instead (an empty string if there is none).

## Examples

### Get a random server ID

```bdfd
Random server ID: $randomGuildID
```
