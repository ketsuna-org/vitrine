---
description: Repeats a block of actions a given number of times. Legacy alias of $for with the same three forms.
layout: doc
translation_key: docs
category: "Misc"
function_name: loop
syntax: $loop[count] ... $endLoop
---

# $loop

`$loop` is the legacy name of [$for](/docs/for-loop/): it takes the same arguments (a count, a list of values or a C-style header) and behaves the same way, but the block is closed with `$endLoop` instead of `$endFor`.

## Syntax

```text
$loop[count]
...
$endLoop
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `count` | Number of repetitions: a non-negative integer, otherwise the error "Expected a nonnegative integer loop count." is raised. `0` runs the block zero times. | Yes |

`$loop[name;value1;value2;...]` (one iteration per value) and `$loop[i=0;i<5;i++]` (C-style) are also accepted, exactly as for `$for`.

## Opening & Closing

- **Open**: `$loop[count]`
- **Close**: `$endLoop`

Every `$loop` **must** be closed with `$endLoop`; closing it with `$endFor` is an error ("Unexpected $endFor."), as is a missing `$endLoop` ("Missing $endloop.").

## Loop variables

Inside the block, `$i` and `$loopIndex` give the zero-based index of the current repetition, and `$loopCount` the one-based count (see [$for](/docs/for-loop/)). `$break` leaves the loop and `$continue` jumps to the next repetition.

## Examples

### Simple Repetition

```bdfd
$loop[3]
Hello! This is repetition number $loopCount.
$endLoop
```

**Output:**
```text
Hello! This is repetition number 1.
Hello! This is repetition number 2.
Hello! This is repetition number 3.
```

### Stopping early

```bdfd
$loop[10]
$if[$i==3]
$break
$endif
Step $loopCount
$endLoop
```

### Using with Variables

```bdfd
$var[counter;0]
$loop[5]
$var[counter;$sum[$var[counter];1]]
Count: $var[counter]
$endLoop
```

**Output:**
```text
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

## Notes

- For new code, prefer `$for` / `$endFor`: it is the same loop with its own documentation.
- Nested loops are supported; `$loopIndex` and `$loopCount` refer to the innermost one.
- A loop is bounded by the engine's execution limits: a very large count (or a loop that never ends) stops with the error "Execution step limit exceeded."
