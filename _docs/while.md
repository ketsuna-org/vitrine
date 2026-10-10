---
layout: doc
title: $while / $endWhile
translation_key: docs
category: "Control Flow"
function_name: while
syntax: $while[condition] ... $endWhile
description: Repeats a block as long as a condition is true. The condition is checked before every iteration.
---
# $while / $endWhile — While Loop

`$while[condition]` repeats the block up to `$endWhile` for as long as the condition is true. Like `$if` and `$for`, it is a **structural token** handled by the BDFD parser.

## Syntax

```text
$while[condition]
...
$endWhile
```

## Parameters

| Parameter | Description | Required |
|---|---|:---:|
| `condition` | Evaluated before **every** iteration with the same rules as [$if](/docs/if-else/): the text `true` / `false`, or a comparison `left operator right`. Anything else raises "Invalid condition". | Yes |

Exactly one argument is required: `$while[a;b]` is refused with "Expected one while condition."

## Behavior

- The condition is re-evaluated at the start of each iteration, so it can depend on a variable changed inside the block. If it is false the first time, the block never runs.
- Inside the block, `$i`, `$loopIndex` (zero-based) and `$loopCount` (one-based) give the iteration number.
- `$break` leaves the loop and `$continue` jumps to the next evaluation of the condition (see [$break](/docs/break/) and [$continue](/docs/continue/)).
- The loop must be closed with `$endWhile`; a missing one is a parse error ("Missing $endwhile.").
- A loop whose condition never becomes false is stopped by the engine's execution limits ("Execution step limit exceeded.").

## Examples

### Count with a temporary variable

```bdfd
$var[n;0]
$while[$var[n]<3]
  Step $var[n]
  $var[n;$sum[$var[n];1]]
$endWhile
```

### Leave early

```bdfd
$while[true]
  $if[$i==2]
    $break
  $endif
  Round $loopCount
$endWhile
```
