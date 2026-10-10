---
layout: doc
title: $categoryCount
translation_key: docs
category: "Entity Info"
function_name: categoryCount
syntax: $categoryCount[(serverID)]
description: Returns the number of categories of the current Discord server, or of the server whose ID is given.
---

# $categoryCount

The `$categoryCount` function returns the **total number of categories** of a Discord server.

## Syntax

```
$categoryCount[(serverID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `serverID` | Optional. ID of the server to count. When the argument is present it must be a positive number, otherwise the error `Invalid guild ID.` is raised (an empty value is not accepted). Without argument, the current server is used. |

## Return value

| Type | Description |
|---|---|
| `integer` | The number of categories on the server. |

## Examples

### Number of categories

```bdfd
$sendMessage[This server has $categoryCount categories.]
```

### Comparison of channels and categories

```bdfd
$sendMessage[
**Server Statistics:**
Categories: $categoryCount
Channels: $channelCount
]
```

### Server without categories

```bdfd
$if[$categoryCount==0]
  $sendMessage[This server has no categories.]
$endif
```

## Notes

- Only counts channels of type `category` (the channel list of the server, without threads).
- Without a server (outside a guild and without `serverID`) the lookup fails with `Channel lookup requires a guild.`
- Useful for statistics or displaying the server structure.
