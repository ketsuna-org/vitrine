---
layout: doc
title: $i
translation_key: docs
category: "Control Flow"
function_name: i
syntax: $i
description: Alias of $loopIndex. Returns the current zero-based index (iteration number) in a $for, $loop, $while, or $jsonForEach loop.
aliases:
  - $loopIndex
---
# $i (alias of $loopIndex)

The function `$i` is a **shortened alias** of `$loopIndex`. It returns the current iteration number in progress within a loop.

## Syntax

```
$i
```

## Parameters

None.

## Return Value

- **Type**: Number (string)
- The current 0-based index of the innermost loop. Outside a loop, the engine raises `Loop index outside a loop.`

## Behavior

- Starts at 0 in `$for`, `$loop`, `$while` and `$jsonForEach` loops.
- Incremented automatically at each iteration.
- For a 1-based count, use `$loopCount`.

## Examples

### List loop with index

```bdfd
$for[color;red;green;blue]
  $sendMessage[#$i: $color]
$endFor
```

### Numbered list

```bdfd
$for[5]
  $sendMessage[**#$loopCount** — index $i]
$endFor
```

### While loop with index

```bdfd
$var[count;0]
$while[$var[count]<5]
  $sendMessage[Iteration #$i]
  $var[count;$sum[$var[count];1]]
$endWhile
```

## Notes

- `$i` is identical to `$loopIndex` — just shorter and faster to type.
- Frequently used in loops for numbering.
- `$i` starts at 0; use `$loopCount` to start at 1.
