---
layout: doc
title: $i
translation_key: docs
category: "Control Flow"
function_name: i
syntax: $i
description: Alias of $loopIndex. Returns the current zero-based iteration index of the innermost loop ($for, $loop, $while, $jsonForEach).
aliases:
  - $loopIndex
---

# $i (alias of $loopIndex)

The function `$i` is a **shortened alias** of `$loopIndex` (and `$loopIteration`). It returns the zero-based iteration number of the innermost loop in progress.

## Syntax

```text
$i
```

## Parameters

None (`$i[1]` is refused: `Invalid argument count`).

## Return Value

- **Type**: Number (string)
- The current 0-based index of the innermost loop. Outside a loop, the engine raises `Loop index outside a loop.`

## Behavior

- Starts at 0 in `$for[count]`, `$loop[count]`, the list form of `$for`, `$while` and `$jsonForEach` loops, and is incremented at each iteration.
- In a nested loop, it is the index of the innermost loop.
- For a 1-based count, use `$loopCount`.
- **Exception**: when a loop declares a variable named `i` (C-style `$for[i=1;i<=3;i++]`, or a list loop `$for[i;a;b]`), `$i` returns the value of that variable, not the iteration index. In `$for[i=1;i<=3;i++]`, `$i` is 1, 2, 3 while `$loopIndex` is 0, 1, 2.

## Examples

### List loop with index

```bdfd
$for[color;red;green;blue]
#$i: $color
$endFor
```

### Numbered list

```bdfd
$for[3]
Item $loopCount (index $i)
$endFor
```

### While loop with index

```bdfd
$var[count;0]
$while[$var[count]<3]
Iteration #$i
$var[count;$sum[$var[count];1]]
$endWhile
```

## Notes

- Outside the exception above, `$i` is identical to `$loopIndex`.
- `$i` starts at 0; use `$loopCount` to start at 1.
