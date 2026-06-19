---
layout: doc
title: $i
translation_key: docs
category: "Loops & Iteration"
function_name: i
syntax: $i
description: Alias of $loopIndex. Returns the current index (iteration number) in a $forEach, $while, or $repeat loop.
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
- The current index (1-based for `$forEach`, 0-based for `$while`/`$repeat`).

## Behavior

- In `$forEach`: starts at 1.
- In `$while` and `$repeat`: starts at 0 or depending on your counter.
- Incremented automatically at each iteration.

## Examples

### ForEach with index

```bdfd
$forEach[user;$mentioned]
  $sendMessage[#$i: <@$loopValue>]
$endForEach
```

### Numbered list

```bdfd
$title[📋 Member List]
$description[
$forEach[member;$membersCount]
  $if[$i<=10]
    **#$i** — $username[$member[$i]]
  $endif
$endForEach
]
$sendMessage[]
```

### While loop with index

```bdfd
$let[count;0]
$while[$var[count]<5]
  $sendMessage[Iteration #$i]
  $let[count;$c[$var[count]+1]]
$endWhile
```

## Notes

- `$i` is identical to `$loopIndex` — just shorter and faster to type.
- Frequently used in loops for numbering.
- In `$forEach`, `$i` starts at 1, not 0.
