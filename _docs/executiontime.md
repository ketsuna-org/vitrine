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

No parameters (passing one is an error).

## Return value

- **Type**: String (number)
- The execution time in milliseconds (ms).
- Counted by the execution timer of the command, which starts when the command's execution starts.

## Behavior

- Returns the elapsed milliseconds of the command's execution timer at the moment the function is evaluated, as an integer.
- Time spent waiting inside the command (for example in `$wait[]`) is included.
- Useful for debugging and performance optimization.

## Examples

### Simple display

```bdfd
$title[⚡ Performance]
$description[
**Execution time:** $executionTime ms
**API Ping:** $ping ms
]
$color[#5865F2]
```

### Dynamic footer

```bdfd
$title[📊 Statistics]
$description[Complex command with a lot of data...]
$footer[⏱️ Executed in $executionTime ms]
$color[#57F287]
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

- The measured time depends on the complexity of the command and on the Discord requests it makes.
- `$executionTime` measures the time on the bot side, not the user latency.
- For the gateway latency of the bot, use `$ping`.
