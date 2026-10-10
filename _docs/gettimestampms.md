---
layout: doc
title: $getTimestampMs
translation_key: docs
category: "Math & Text"
function_name: getTimestampMs
syntax: $getTimestampMs
description: Returns the current Unix timestamp in milliseconds. Resolved at runtime.
---

# $getTimestampMs

The function `$getTimestampMs` returns the current Unix timestamp in **milliseconds**. The Unix timestamp represents the number of milliseconds elapsed since January 1, 1970, at 00:00:00 UTC (epoch).

> **Important:** This function uses the special identifier `((getTimestampMs))` which is resolved at **runtime**.

## Difference with $getTimestamp

| Function | Unit | Value Example |
|----------|-------|-------------------|
| `$getTimestampMs` | **Milliseconds** (ms) | `1718697600123` |
| `$getTimestamp` | **Seconds** (s) | `1718697600` |

- `$getTimestampMs` = `$getTimestamp` × 1000 + additional milliseconds.
- Use `$getTimestampMs` for **high-precision** measurements (benchmarks, fine cooldowns, timeouts).
- Use `$getTimestamp` for common use cases where precision to the second is sufficient (dates, long durations, storage).

## Syntax

```
$getTimestampMs
```

> **Note:** This function does not take any parameters.

## Parameters

No parameters.

## Return Value

- **Type**: String (integer)
- The current Unix timestamp in milliseconds (13 digits).

## Examples

### Simple timestamp

```bdfd
Timestamp (ms): $getTimestampMs
```

### Performance measurement

```bdfd
$var[start;$getTimestampMs]

$sendMessage[🔍 Calculation in progress...]

$var[end;$getTimestampMs]
$var[duration;$sub[$var[end];$var[start]]]

$title[📊 Result]
$description[
Operation completed in **$var[duration] ms**.
]
$color[#5865F2]
```

### Precise cooldown (anti-spam)

```bdfd
$var[now;$getTimestampMs]
$var[last;$getUserVar[lastCmd]]
$var[diff;$sub[$var[now];$var[last]]]

$if[$var[diff]<2000]
  $title[⏳ Too Fast!]
  $description[
  Please wait another **$calculate[(2000 - $var[diff]) / 1000]** seconds.
  ]
  $color[#ED4245]
  $stop
$endif

$setUserVar[lastCmd;$var[now]]
Your command has run successfully!
```

### Conversion to seconds

```bdfd
$var[ms;$getTimestampMs]
$var[seconds;$calculate[$var[ms] / 1000]]

Timestamp (ms): $var[ms]
Timestamp (seconds): $var[seconds]
```

## Notes

- The precision is accurate to the millisecond (1 ms = 0.001 seconds).
- To compare with a timestamp in seconds, do not forget to convert: multiply seconds by 1000 or divide milliseconds by 1000.
- The returned values are integers, but calculations with `$calculate[]` can produce decimal numbers during conversion.
