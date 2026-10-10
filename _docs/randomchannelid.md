---
layout: doc
title: $randomChannelID[]
translation_key: docs
category: "Math & Text"
function_name: randomChannelID
syntax: $randomChannelID
description: Returns the ID of a random channel of the current server.
---

# $randomChannelID[]

The `$randomChannelID[]` function returns the Discord ID of a random channel of the server where the command runs.

## Syntax

```
$randomChannelID
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

The Discord ID (snowflake) of a random channel, as a string, or an empty string if no channel is returned.

## Behavior

- The candidates are all the channels returned by Discord for the server, whatever their type: text, voice, categories, and so on. Active threads are not included.
- It needs the Discord channel service of the running bot and a server context.

## Examples

### Get a random channel ID

```bdfd
Random channel ID: $randomChannelID
```

### Mention a random channel

```bdfd
Random channel: <#$randomChannelID>
```

## Notes

- Because voice channels and categories can be picked, the result is not always a channel you can send messages to.
