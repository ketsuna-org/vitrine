---
layout: doc
title: $channelCount
translation_key: docs
category: "Entity Info"
function_name: channelCount
syntax: $channelCount
description: Returns the total number of channels on the server.
---

# $channelCount

The `$channelCount` function returns the **number of channels** on the Discord server.

## Syntax

```
$channelCount
```

## Parameters

None. The function takes no argument (`$channelCount[...]` with an argument is refused).

## Return value

| Type | Description |
|---|---|
| `integer` | The number of channels of the server. |

## Examples

### Total number of channels

```bdfd
$sendMessage[This server has $channelCount channels.]
```

### Comparison

```bdfd
$if[$channelCount>50]
  $sendMessage[This server is huge! ($channelCount channels)]
$else
  $sendMessage[This server has $channelCount channels.]
$endif
```

## Notes

- Counts every channel returned for the server, categories included.
- When the server has forum channels, their active (non-archived) posts are counted too.
- Requires a server context; the function raises an error outside a guild.
- To count categories only, use `$categoryCount`. To count the channels of one category, use `$categoryChannels[categoryID;separator;count]`.
