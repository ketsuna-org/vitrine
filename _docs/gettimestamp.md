---
layout: doc
title: $getTimestamp[]
translation_key: docs
category: "Date & Time"
function_name: getTimestamp
syntax: $getTimestamp
description: Returns the current Unix timestamp in seconds. Resolved at runtime.
---

# $getTimestamp[]

The function `$getTimestamp[]` returns the current Unix timestamp in seconds. The Unix timestamp represents the number of seconds elapsed since January 1, 1970, at 00:00:00 UTC (epoch).

> **Important:** This function uses the special identifier `((getTimestamp))` which is resolved at **runtime**.

## Syntax

```
$getTimestamp
```

> **Note:** This function does not take any parameters.

## Return Value

An integer representing the current Unix timestamp in seconds.

## Examples

### Simple timestamp

```bdfd
Current timestamp: $getTimestamp
```

### Duration calculation

```bdfd
$let[now;$getTimestamp]
$let[event;1718697600]
Time remaining: $sub[$get[event];$get[now]] seconds
```

### Store a timestamp

```bdfd
$setUserVar[lastCommand;$getTimestamp]
```

## Notes

- The timestamp is in **seconds** (not milliseconds).
- Useful for duration calculations, cooldowns, or storing timestamps.
