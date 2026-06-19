---
layout: doc
title: $for / $endFor + $loopIndex / $loopCount / $loopIteration
translation_key: docs
category: "Control Flow"
function_name: for
syntax: $for[iteratorName;values].. $endFor
description: Iterates over a list of values, executing the block once per item with loop metadata variables.
---
# $for / $endFor — For Loop

The `$for` token defines a loop that iterates over a semicolon-separated list of values or an array reference. Like `$if`, these are **structural tokens** processed at the BDFD parser level. Every `$for` must be closed with `$endFor`.

## Loop Metadata Variables

Inside a `$for...$endFor` block, three special variables provide information about the current iteration:

| Variable         | Value                              | Description                          |
|------------------|------------------------------------|--------------------------------------|
| `$loopIndex`     | 0, 1, 2, 3,..                   | Zero-based index of the current item |
| `$loopCount`     | 1, 2, 3, 4,..                   | One-based count of the current item  |
| `$loopIteration` | same as `$loopIndex` (`0, 1, 2`)   | Alias for the zero-based index       |

These variables are only valid inside the `$for...$endFor` block. Using them outside a loop produces an empty string or may cause an error.

## Iterator Variable

The first parameter (`iteratorName`) is a variable name you choose. On each iteration, it receives the current value from the list. Reference it inside the loop with `$iteratorName`:

```
$for[color;red;green;blue]
  Current color: $color
$endFor
```

## Values Format

Values can be:
- **A literal semicolon-separated list**: `$for[item;one;two;three]`
- **A variable that resolves to a list**: `$for[player;$getGlobalUserVar[partyMembers]]`
- The semicolons are the delimitr — avoid using semicolons inside individual values unless you escape them.

## Interaction with $stop and $skipActions

- Use `$stop` inside a loop to halt **all** further execution, breaking out of the loop and the entire action sequence.
- Use `$skipActions[n]` inside a loop to skip the next `n` actions (which may jump to the next iteration).

## Common Pitfalls

- Forgetting `$endFor` causes a parse error — the parser treats everything after `$for` as body content.
- Infinite loops are generally impossible since iteration is over a fixed list.
- Nested loops are supported; each `$for` tracks its own `$loopIndex` / `$loopCount` scope.
- Performance can degrade with very large lists; keep iterations reasonable (a few hundred items at most for responsive bot behavior).
