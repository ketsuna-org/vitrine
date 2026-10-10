---
layout: doc
title: $jsonArrayShift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayShift
syntax: $jsonArrayShift[(key);(...)]
description: Removes and returns the first item of the JSON array at a path of the current document; a missing or non-array value is replaced by an empty array.
---
$jsonArrayShift removes the first element from a JSON array and returns it — the equivalent of JavaScript's `Array.shift()` (FIFO queues). The remaining elements move one position down. Strings, numbers and booleans are returned as text, objects and arrays as compact JSON.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. With no argument, the whole document is targeted.

## Behavior

- Shifting from an empty array returns an empty string.
- If the value at the path is missing or is not an array, it is replaced by an empty array and an empty string is returned.

## Examples

### Extract First Element with Shift

```bdfd
$jsonParse[{"queue":["First","Second","Third"]}]
$var[next;$jsonArrayShift[queue]]
$title[Array Shift (FIFO)]
$description[Next item served: **$var[next]**]
$color[#57F287]
```
