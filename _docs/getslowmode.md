---
layout: doc
title: $getSlowmode
translation_key: docs
category: "Entity Info"
function_name: getSlowmode
syntax: $getSlowmode[(channelID)]
description: Gets the slowmode value of a channel in seconds. Returns the minimum delay between two messages.
---
# $getSlowmode

The function `$getSlowmode[]` returns the **slowmode value** of a channel in seconds.

## Syntax

```
$getSlowmode[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | *(Optional)* The ID of the channel. Default: the current channel (the `channel.id` supplied by the host). Must be a positive integer, otherwise the error `Invalid channel ID.` is raised; an unknown channel raises `Channel not found.` |

## Return Value

- **Type**: Number (string)
- The slowmode of the channel in seconds (`0` when slowmode is off, or when the channel type has no slowmode).

## Examples

### Simple verification

```bdfd
$sendMessage[Current slowmode: $getSlowmode seconds]
```

### Comparison

```bdfd
$if[$getSlowmode==0]
  $sendMessage[This channel does not have slowmode enabled.]
$else
  $sendMessage[This channel has a slowmode of $getSlowmode seconds.]
$endif
```

### Check another channel

```bdfd
$sendMessage[Slowmode of the log channel: $getSlowmode[123456789]s]
```

### Alert if slowmode is active

```bdfd
$if[$getSlowmode>0]
  $title[⏱️ Slowmode Active]
  $description[The channel <#$channelID> has a slowmode of **$getSlowmode seconds**.]
  $color[#FEE75C]
$endif
```

## Notes

- `0` means slowmode is disabled.
- To modify the slowmode, use `$slowmode[channelID;time]` or `$modifyChannel`.
