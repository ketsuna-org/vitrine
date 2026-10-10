---
layout: doc
title: $break
translation_key: docs
category: "Control Flow"
function_name: break
syntax: $break
description: Leaves the innermost loop immediately.
---
# $break

`$break` ends the innermost running loop (`$for`, `$loop`, `$while` or `$jsonForEach`) and execution continues after its closing token.

## Syntax

```text
$break
```

`$break` takes no argument (`$break[x]` is refused).

## Behavior

- Only the innermost loop is left; an enclosing loop keeps running.
- Outside of a loop it raises the error "Break outside a loop.".
- It can be placed inside `$if` or `$try` blocks that are themselves inside the loop.
- In a C-style `$for` loop the update clause does **not** run after a `$break` (unlike [$continue](/docs/continue/)).
- To halt the whole script, not just the loop, use [$stop](/docs/stop/).

## Example

```bdfd
$for[10]
  $if[$loopCount>3]
    $break
  $endif
  Step $loopCount
$endFor
```
