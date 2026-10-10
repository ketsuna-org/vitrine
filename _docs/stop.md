---
layout: doc
title: $stop
translation_key: docs
category: "Control Flow"
function_name: stop
syntax: $stop
description: Immediately ends the current script. What was written before it is still sent.
---

# $stop — Stop the Script

`$stop` ends the current script immediately. Nothing after it runs.

## Syntax

```text
$stop
```

`$stop` takes no argument (`$stop[x]` is refused: `Invalid argument count`).

## Behavior

- The rest of the script is skipped, even inside `$if` or a loop: in a `$for` loop, the loop ends at once.
- What was written **before** `$stop` (text, embeds, components) is still sent as the response. `$stop` does not discard it. (To discard it and replace it with a message, use `$onlyIf[condition;message]`.)
- Messages already sent with `$sendMessage` stay sent.
- `$stop` is not an error: inside `$try`, the `$catch` block does **not** run, and the script ends.
- Inside code run by `$eval`, `$stop` only ends the evaluated code; the script that called `$eval` goes on.

## $stop vs $skipActions

| Feature | $stop | $skipActions[n] |
|---|---|---|
| Effect | Ends the current script | Skips the next `n` actions of the current block |
| Resumes afterwards | No | Yes, after the skipped actions |
| In loops | Ends the loop and the script | Skips actions of the current iteration only |

## Common Pitfalls

- Placing important code after `$stop`: it will never run.
- Using `$stop` inside `$try` and expecting `$catch` to run.

## Examples

### Halting for a condition

```bdfd
$if[$message==]
  Please provide an argument.
  $stop
$endif
You wrote: $message
```

### Leaving a loop and the script

```bdfd
$for[5]
  Step $loopCount
  $if[$i==2]
    $stop
  $endif
$endFor
Done
```
