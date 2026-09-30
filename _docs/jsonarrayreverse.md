---
layout: doc
title: $jsonArrayReverse[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayReverse
syntax: $jsonArrayReverse[key]
description: Reverses the order of items in a JSON array in-place.
---
$jsonArrayReverse reverses the order of elements in a JSON array. It operates in-place — the original array is modified. This is useful for displaying data in reverse chronological order or changing the sort direction after an ascending sort. Pair with $jsonArraySort for descending sorts.

## Examples

### Invert JSON Array Order

```bdfd
$jsonParse[{"list":[1,2,3,4,5]}]
$jsonArrayReverse[list]
$title[Reversed Array]
$description[Reversed order: `$jsonStringify`]
$color[#5865F2]
$sendMessage[]
```
