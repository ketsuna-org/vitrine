---
layout: doc
title: $continue
translation_key: docs
category: "Control Flow"
function_name: continue
syntax: $continue
description: Skips the rest of the current iteration and goes to the next one.
---
# $continue

`$continue` skips the rest of the current iteration of the innermost running loop (`$for`, `$loop`, `$while` or `$jsonForEach`) and goes on with the next one.

## Syntax

```text
$continue
```

`$continue` takes no argument (`$continue[x]` is refused).

## Behavior

- Only the innermost loop is affected.
- Outside of a loop it raises the error "Continue outside a loop.".
- In a C-style `$for[i=0;i<5;i++]` loop the update clause still runs, so the loop moves forward. In a `$while` loop the condition is evaluated again.
- To leave the loop altogether, use [$break](/docs/break/).

## Example

```bdfd
$for[5]
  $if[$i==2]
    $continue
  $endif
  $i
$endFor
```

This prints `0134`.
