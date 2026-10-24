---
layout: doc
title: $loopIndex
translation_key: docs
category: "Control Flow"
function_name: loopIndex
syntax: $loopIndex
description: Returns the zero-based index of the current iteration of the innermost loop.
---

# $loopIndex

Returns the zero-based index of the current iteration of the innermost loop (`$for`, `$loop`, `$while`, `$jsonForEach`).

## Syntax

```
$loopIndex
```

## Parameters

None.

## Return value

- `0`, `1`, `2`... for the successive iterations.
- Outside a loop, the error "Loop index outside a loop." is raised.

## Examples

```bdfd
$for[3]
Index $loopIndex
$endFor
```

## Notes

- `$loopIteration` and `$i` return the same value; `$loopCount` is one-based. See [$for](/docs/for-loop/) and [$i](/docs/i/).
