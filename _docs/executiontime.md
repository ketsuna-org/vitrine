---
layout: doc
title: $executionTime
translation_key: docs
category: "Entity Info"
function_name: executionTime
syntax: $executionTime
description: Returns the execution time of the current command in milliseconds. Helps measure BDFD code performance.
---

# $executionTime

The `$executionTime` function **measures the total execution time** of the current command in milliseconds.

## Syntax

```
$executionTime
```

## Parameters

No parameters.

## Return value

- **Type**: String (number)
- The execution time in milliseconds (ms).
- Includes the processing time of the entire command (parsing + execution).

## Behavior

- Measures the elapsed time from the start of the command's processing up to the function call.
- Useful for debugging and performance optimization.
- The value is an integer representing the milliseconds.

## Examples

### Simple display

```bdfd
$title[⚡ Performance]
$description[
**Execution time:** $executionTime ms
**API Ping:** $botPing ms
]
$color[#5865F2]
$sendMessage[]
```

### Dynamic footer

```bdfd
$title[📊 Statistics]
$description[Complex command with a lot of data...]
$footer[⏱️ Executed in $executionTime ms]
$color[#57F287]
$sendMessage[]
```

### Slowness condition

```bdfd
$if[$executionTime>1000]
  $sendMessage[⚠️ This command is slow (>1s). Optimization recommended.]
$else
  $sendMessage[✅ Normal performance: $executionTime ms]
$endif
```

## Notes

- The measured time depends on the complexity of the command and network latency.
- `$executionTime` measures the time on the bot side, not the user latency.
- For WebSocket/API latency, use `$botPing` or `$ping`.
