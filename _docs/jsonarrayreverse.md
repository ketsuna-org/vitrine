---
layout: doc
title: $jsonArrayReverse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayReverse
syntax: $jsonArrayReverse[(key);(...)]
description: Reverses, in place, the JSON array at a path of the current document; a missing or non-array value is replaced by an empty array.
---
$jsonArrayReverse reverses the order of the elements of a JSON array in place. It returns an empty string. Combine it with `$jsonArraySort` to get a descending order.

## Parameters

The path is given as separate arguments, one per level (no dot notation: `a.b` is a single key named `a.b`). Surrounding spaces are removed and empty arguments are skipped. A whole-number argument selects an element when the current value is an array; otherwise it is used as an object key. At most 100 arguments are accepted in total. With no argument, the whole document is targeted.

## Behavior

- If the value at the path is missing or is not an array, it is replaced by an empty array.

## Examples

### Invert JSON Array Order

```bdfd
$jsonParse[{"list":[1,2,3,4,5]}]
$jsonArrayReverse[list]
$title[Reversed Array]
$description[Reversed order: `$jsonStringify`]
$color[#5865F2]
```
