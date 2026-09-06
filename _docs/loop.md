---
description: Repeats a block of actions a fixed number of times.
layout: doc
translation_key: docs
category: "Misc"
---

# $loop

Repeats a block of code a fixed number of times. The loop block must be closed with `$endLoop`.

## Syntax

```
$loop[iterations]
```

## Parameters

| Parameter | Description | Required |
|-----------|-------------|:-----------:|
| `iterations` | Number of times to repeat the loop block | Yes |

## Description

The legacy `$loop` function executes the block of code between `$loop[iterations]` and `$endLoop` exactly N times, where N is the specified number of iterations.

This is one of the oldest loop constructs in BDFD. For iterating over a list of values, consider using the newer `$for` / `$endFor` loop instead, which provides loop metadata variables like `$loopIndex` and `$loopCount`.

## Opening & Closing

- **Open**: `$loop[iterations]`
- **Close**: `$endLoop`

Every `$loop` **must** be closed with `$endLoop`. Missing `$endLoop` causes a parse error.

## Examples

### Simple Repetition

```
$loop[3]
Hello! This is iteration #...
$endLoop
```

**Output:**
```
Hello! This is iteration #...
Hello! This is iteration #...
Hello! This is iteration #...
```

### Sending Multiple Messages

```
$loop[5]
$sendMessage[Spam protection reminder!]
$endLoop
```

### With Conditional Logic

```
$loop[10]
$if[$random[0;1]==0]
  Heads!
$else
  Tails!
$endif
$endLoop
```

### Using with Variables

```
$var[counter;0]
$loop[5]
$var[counter;$sum[$counter;1]]
Count: $counter
$endLoop
```

**Output:**
```
Count: 1
Count: 2
Count: 3
Count: 4
Count: 5
```

## Notes

- `$loop` is a legacy construct. For new code, prefer `$for` / `$endFor` which provides `$loopIndex`, `$loopCount`, and iterator variables.
- `$loop` does **not** provide an automatic loop index — you must manage counters manually with variables.
- Nested loops are supported but can impact performance significantly.
- Keep iteration counts reasonable (under 100 for responsive commands). Large iteration counts may cause timeouts.
- Use `$stop` inside the loop to break out early if needed.
