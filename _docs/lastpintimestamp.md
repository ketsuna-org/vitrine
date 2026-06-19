---
layout: doc
title: $lastPinTimestamp
translation_key: docs
category: "Entity Info"
function_name: lastPinTimestamp
syntax: $lastPinTimestamp[(channelID)]
description: Returns the timestamp of the last pinned message in the current or specified channel.
---

# $lastPinTimestamp

The function `$lastPinTimestamp` returns the **timestamp of the last pinned message** in a Discord channel. If no message is pinned, it returns an empty string.

## Syntax

```
$lastPinTimestamp[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return Value

| Type | Description |
|---|---|
| `integer` or `""` | Timestamp in milliseconds of the last pin, or an empty string if none. |

## Examples

### Display the date of the last pin

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Last pinned message on $formatDate[$lastPinTimestamp;MM/DD/YYYY at HH:mm]]
$else
  $sendMessage[No pinned messages in this channel.]
$endif
```

### Discord relative format

```bdfd
$if[$lastPinTimestamp!=]
  $sendMessage[Last pin <t:$truncate[$lastPinTimestamp/1000]:R>]
$endif
```

### Check another channel

```bdfd
$if[$lastPinTimestamp[123456789012345678]!=]
  $sendMessage[The channel has pinned messages.]
$endif
```

## Notes

- The timestamp is in **milliseconds** (divide by 1000 for seconds).
- Returns an empty string (`""`) if no message is pinned.
- Useful for checking pinning activity in a channel.

