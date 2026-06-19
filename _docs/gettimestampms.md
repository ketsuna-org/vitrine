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
$let[start;$getTimestampMs]

$title[🔍 Performance Test]
$description[
Calculation in progress...
]
$sendMessage[]

$let[end;$getTimestampMs]
$let[duration;$sub[$get[end];$get[start]]]

$title[📊 Result]
$description[
Operation completed in **$get[duration] ms**.
]
$color[#5865F2]
$sendMessage[]
```

### Precise cooldown (anti-spam)

```bdfd
$let[now;$getTimestampMs]
$let[last;$getUserVar[lastCmd]]
$let[diff;$sub[$get[now];$get[last]]]

$if[$get[diff]<2000]
  $title[⏳ Too Fast!]
  $description[
  Please wait another **$math[(2000 - $get[diff]) / 1000]** seconds.
  ]
  $color[#ED4245]
  $sendMessage[]
  $stop[]
$endif

$setUserVar[lastCmd;$get[now]]
Your command has run successfully!
```

### Conversion to seconds

```bdfd
$let[ms;$getTimestampMs]
$let[seconds;$math[$get[ms] / 1000]]

Timestamp (ms): $get[ms]
Timestamp (seconds): $get[seconds]
```

## Notes

- The precision is accurate to the millisecond (1 ms = 0.001 seconds).
- To compare with a timestamp in seconds, do not forget to convert: multiply seconds by 1000 or divide milliseconds by 1000.
- The returned values are integers, but calculations with `$math[]` can produce decimal numbers during conversion.
