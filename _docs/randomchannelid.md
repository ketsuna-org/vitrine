---
layout: doc
title: $randomChannelID[]
translation_key: docs
category: "Math & Text"
function_name: randomChannelID
syntax: $randomChannelID
description: Returns the ID of a random channel present on the server.
---

# $randomChannelID[]

The `$randomChannelID[]` function returns the Discord ID of a random channel present on the server where the command is executed.

## Syntax

```
$randomChannelID
```

> **Note:** This function takes no parameters.

## Return Value

The Discord ID (snowflake) of a random channel on the server, as a string.

## Examples

### Get a random channel ID

```bdfd
Random channel ID: $randomChannelID
```

### Mention a random channel

```bdfd
Random channel: <#$randomChannelID>
```

### Use as destination channel

```bdfd
$sendMessage[$randomChannelID;Message sent to a random channel!]
```

## Notes

- The channel is chosen from all channels accessible to the bot on the server.
- For text channels, you can use the ID with message sending functions.
