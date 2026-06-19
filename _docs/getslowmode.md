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
| `channelID` | *(Optional)* The ID of the channel. Default: current channel. |

## Return Value

- **Type**: Number (string)
- The slowmode in seconds (`0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`).

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
  $sendMessage[]
$endif
```

## Notes

- `0` means slowmode is disabled.
- The possible values are limited by Discord (5s, 10s, 15s, 30s, 1m, 2m, 5m, 10m, 15m, 30m, 1h, 2h, 6h).
- To modify the slowmode, use `$modifyChannel[]`.
