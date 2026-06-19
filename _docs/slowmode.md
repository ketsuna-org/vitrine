---
layout: doc
title: $slowmode
translation_key: docs
category: "Entity Info"
function_name: slowmode
syntax: $slowmode[(channelID)]
description: Returns the current slowmode delay of a Discord channel, in seconds. Read-only function (getter).
---

# $slowmode

The function `$slowmode` returns the current **slowmode delay** of a Discord channel, expressed in seconds. This is a **read-only** function (getter).

## Syntax

```
$slowmode[(channelID)]
```

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | Optional. The ID of the target channel. If omitted, the current channel is used. |

## Return Value

| Type | Description |
|---|---|
| `integer` | The delay in seconds. `0` means slowmode is disabled. |

## Possible Values

Discord allows the following slowmode values (in seconds): `0`, `5`, `10`, `15`, `30`, `60`, `120`, `300`, `600`, `900`, `1800`, `3600`, `7200`, `21600`.

## Examples

### Display the slowmode

```bdfd
$sendMessage[Current slowmode: $slowmode second(s)]
```

### Check if slowmode is active

```bdfd
$if[$slowmode>0]
  $sendMessage[⏳ This channel has a slowmode of $slowmode second(s).]
$else
  $sendMessage[No slowmode in this channel.]
$endif
```

### Alert on high slowmode

```bdfd
$if[$slowmode>=300]
  $sendMessage[⚠️ Warning: this channel has a very high slowmode ($slowmode seconds).]
$endif
```

## Notes

- `$slowmode` is a **getter**: it does not modify the slowmode.
- Returns `0` if the channel has no slowmode.
- Only works on text channels.
