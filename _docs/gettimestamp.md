---
layout: doc
title: $getTimestamp[]
translation_key: docs
category: "Date & Time"
function_name: getTimestamp
syntax: $getTimestamp[(unit)]
description: Returns the current Unix timestamp in seconds (default), milliseconds or nanoseconds.
---

# $getTimestamp[]

The function `$getTimestamp[]` returns the current Unix timestamp. By default it is in seconds: the number of seconds elapsed since January 1, 1970, at 00:00:00 UTC (epoch). An optional unit argument selects milliseconds or nanoseconds.

## Syntax

```
$getTimestamp[(unit)]
```

## Parameters

| Parameter | Description |
|---|---|
| `unit` | Optional - `s` (seconds, default), `ms` (milliseconds) or `ns` (nanoseconds). Any other value is an error: `Timestamp unit must be s, ms or ns.` |

## Return Value

An integer (as text) representing the current Unix timestamp in the requested unit.

## Examples

### Simple timestamp

```bdfd
Current timestamp: $getTimestamp
```

### Milliseconds

```bdfd
$getTimestamp[ms]
```

### Duration calculation

```bdfd
$var[now;$getTimestamp]
$var[event;1718697600]
Time remaining: $sub[$var[event];$var[now]] seconds
```

### Store a timestamp

```bdfd
$setUserVar[lastCommand;$getTimestamp]
```

## Notes

- Without argument the timestamp is in **seconds**. `$getTimestampMs` is also available and returns milliseconds.
- The timestamp does not depend on the timezone set with `$time[]`.
- Useful for duration calculations, cooldowns, or storing timestamps.
