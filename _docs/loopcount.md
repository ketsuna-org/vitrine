---
layout: doc
title: $loopCount
translation_key: docs
category: "Control Flow"
function_name: loopCount
syntax: $loopCount
description: Returns the one-based count of the current iteration of the innermost loop.
---

# $loopCount

Returns the one-based number of the current iteration of the innermost loop (`$for`, `$loop`, `$while`, `$jsonForEach`).

## Syntax

```
$loopCount
```

## Parameters

None.

## Return value

- `1`, `2`, `3`... for the successive iterations (`$loopIndex` + 1).
- Outside a loop, the error "Loop index outside a loop." is raised.

## Examples

```bdfd
$for[3]
Step $loopCount of 3
$endFor
```

## Notes

- For the zero-based index, use `$loopIndex`, `$loopIteration` or `$i`. See [$for](/docs/for-loop/).
