---
layout: doc
title: $for / $endFor + $loopIndex / $loopCount / $loopIteration
translation_key: docs
category: "Control Flow"
function_name: for
syntax: $for[iteratorName;value1;(value2);...] ... $endFor
description: Repeats a block, either once per listed value ($for[name;v1;v2;...]), a given number of times ($for[count]) or with a C-style header ($for[i=0;i<5;i++]), with loop metadata variables.
---
# $for / $endFor — For Loop

The `$for` token opens a loop that must be closed with `$endFor`. Like `$if`, these are **structural tokens** processed at the BDFD parser level. The engine accepts three forms, chosen by the number and shape of the arguments:

| Form | Syntax | Behavior |
|---|---|---|
| Value list | `$for[name;value1;(value2);...]` | One iteration per value after the first argument; `name` receives the current value. |
| Counted | `$for[count]` | `count` iterations (a non-negative integer, else "Expected a nonnegative integer loop count."); `$i` holds the 0-based index. |
| C-style | `$for[i=0;i<5;i++]` | Initialization; condition; update. Integers only. |

A `$for` with no argument is a parse error ("Expected a loop argument.").

## Loop Metadata Variables

Inside a `$for...$endFor` block, these functions (each with no argument) provide information about the current iteration:

| Variable         | Value                              | Description                          |
|------------------|------------------------------------|--------------------------------------|
| `$loopIndex`     | 0, 1, 2, 3,..                   | Zero-based index of the current iteration |
| `$loopCount`     | 1, 2, 3, 4,..                   | One-based count of the current iteration  |
| `$loopIteration` | same as `$loopIndex` (`0, 1, 2`)   | Alias for the zero-based index       |
| `$i`             | same as `$loopIndex`               | Alias for the zero-based index (in counted loops, `$i` is also bound as the loop variable) |

Used outside a loop, they raise the error "Loop index outside a loop.".

## Iterator Variable

In the value-list form, the first parameter (`name`) must be a literal identifier (letters, digits, `_`, not starting with a digit; otherwise "Invalid iterator name."). On each iteration it receives the current value. Reference it inside the loop with `$name`:

```
$for[color;red;green;blue]
  Current color: $color
$endFor
```

## Values Format

- Each argument after the first is **one value**: `$for[item;one;two;three]` runs three times.
- A value is evaluated before the loop starts. A function result containing semicolons is **not** split into several values: `$for[player;$getGlobalUserVar[partyMembers]]` runs once, with the whole result.

## C-style Loops

`$for[init;condition;update]` uses integer variables:

- `init`: assignments separated by commas, e.g. `i=0` or `i=0,j=10` (only `=` is allowed).
- `condition`: an integer comparison (`==`, `!=`, `>=`, `<=`, `>`, `<`), otherwise "Invalid integer loop condition".
- `update`: `++`, `--`, `+=`, `-=`, `*=`, `/=` or `=` on variables declared in `init`.
- The variables are referenced inside the body with `$name`.

## Control: $break, $continue, $stop

- `$break` leaves the current loop; `$continue` goes to the next iteration (in a C-style loop the update clause still runs). Both are errors outside a loop.
- `$stop` halts the whole script, including the loop.

## Common Pitfalls

- Forgetting `$endFor` causes a parse error.
- A C-style loop whose condition never becomes false is not bounded by the list; the engine stops it with its execution limits (budget/timeout).
- Nested loops are supported; `$loopIndex` / `$loopCount` refer to the innermost loop.
- Keep iterations reasonable for responsive bot behavior.

## Examples

### Counted loop

```bdfd
$title[Countdown Loop]
$description[Executing repetition sequence:]
$for[5]
  $sendMessage[Step $loopCount of 5 complete!]
$endFor
$color[#5865F2]
```

### C-style loop

```bdfd
$for[n=1;n<=3;n++]
  $sendMessage[Number $n]
$endFor
```
