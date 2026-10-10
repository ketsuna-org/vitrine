---
layout: doc
title: $slowmode
translation_key: docs
category: "Entity Info"
function_name: slowmode
syntax: $slowmode[channelID;time]
description: Sets the slowmode delay of a Discord channel (write function). To read the current value, use $getSlowmode.
---

# $slowmode

The function `$slowmode` **sets the slowmode delay** of a Discord channel. It is a **setter**: it does not return the current value (use [`$getSlowmode`](/docs/getslowmode/) for that).

## Syntax

```
$slowmode[channelID;time]
```

The function requires exactly 2 arguments.

## Parameters

| Parameter | Description |
|---|---|
| `channelID` | The ID of the target channel. Required; an invalid ID raises "Invalid channel ID.". |
| `time` | The new delay. Required. A plain number is read as seconds; a BDFD duration (`10s`, `5m`, `1h`, `1m30s`...) is also accepted. `0` disables slowmode. |

## Return Value

This function does not return a value.

## Allowed range

The delay must be between `0` and 6 hours (`21600` seconds). Any other value, or an unreadable duration, raises the error "Slowmode must be between 0 and 6 hours.".

## Examples

### Set a 10 second slowmode

```bdfd
$slowmode[$channelID;10s]
$sendMessage[Slowmode set to 10 seconds.]
```

### Disable slowmode

```bdfd
$slowmode[$channelID;0]
$sendMessage[Slowmode disabled.]
```

### Slowmode on another channel

```bdfd
$slowmode[123456789012345678;5m]
```

## Notes

- `$slowmode` is a **setter**: use `$getSlowmode` to read the current slowmode.
- The delay is stored in whole seconds.
