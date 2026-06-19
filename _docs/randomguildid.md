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

The `$randomGuildID[]` function returns the Discord ID of a random server from all servers where the bot is present.

## Syntax

```
$randomGuildID
```

> **Note:** This function takes no parameters.

## Return Value

The Discord ID (snowflake) of a random server, as a string.

## Examples

### Get a random server ID

```bdfd
Random server ID: $randomGuildID
```

### Get information about a random server

```bdfd
$title[Random server]
$description[Name: $serverName[$randomGuildID]]
$addField[Members:;$membersCount[$randomGuildID]]
```

## Notes

- The server is chosen from all servers where the bot is present.
- Each server has an equal probability of being selected.
