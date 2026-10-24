---
layout: doc
title: $loopIteration
translation_key: docs
category: "Control Flow"
function_name: loopIteration
syntax: $loopIteration
description: Alias of $loopIndex. Returns the zero-based index of the current iteration of the innermost loop.
aliases:
  - $loopIndex
---

# $loopIteration

Alias of `$loopIndex`: the zero-based index of the current iteration of the innermost loop (`$for`, `$loop`, `$while`, `$jsonForEach`).

## Syntax

```
$loopIteration
```

## Parameters

None.

## Return value

- `0`, `1`, `2`... for the successive iterations (not 1-based despite the name; use `$loopCount` for that).
- Outside a loop, the error "Loop index outside a loop." is raised.

## Examples

```bdfd
$for[3]
Iteration $loopIteration
$endFor
```

## Notes

- See [$for](/docs/for-loop/) and [$i](/docs/i/).
