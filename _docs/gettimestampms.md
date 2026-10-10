---
layout: doc
title: $getTimestampMs
translation_key: docs
category: "Math & Text"
function_name: getTimestampMs
syntax: $getTimestampMs
description: Returns the current Unix timestamp in milliseconds.
---

# $getTimestampMs

The function `$getTimestampMs` returns the current Unix timestamp in **milliseconds** (milliseconds since 1970-01-01 00:00:00 UTC).

## Syntax

```
$getTimestampMs
```

> **Note:** This function takes no arguments (it is an error to pass any).

## Return Value

- **Type**: String (integer), for example `1791666270637`.
- It reads the clock each time it is evaluated, so two calls in the same script can return different values.

## Difference with $getTimestamp

| Function | Unit | Value Example |
|----------|------|---------------|
| `$getTimestampMs` | Milliseconds | `1791666270637` |
| `$getTimestamp` | Seconds (default) | `1791666270` |

`$getTimestamp[ms]` returns the same unit as `$getTimestampMs`; the first argument of `$getTimestamp` accepts only `s`, `ms` or `ns`.

## Examples

### Simple timestamp

```bdfd
Timestamp (ms): $getTimestampMs
```

### Elapsed time between two readings

```bdfd
$var[start;$getTimestampMs]
$var[end;$getTimestampMs]
Elapsed: $sub[$var[end];$var[start]] ms
```

## Notes

- The value is an integer (digits only), so it can be used directly with `$sub`, `$sum` and the other math functions.
