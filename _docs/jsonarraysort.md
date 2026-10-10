---
layout: doc
title: $jsonArraySort[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArraySort
syntax: $jsonArraySort[key;order?]
description: Sorts a JSON array alphabetically or numerically in ascending or descending order.
---
$jsonArraySort sorts the elements of a JSON array in-place. The default order is ascending ('asc'). For alphabetical sorting, strings are compared lexicographically. For numerical sorting, values are compared as numbers. To get descending order, either pass 'desc' or sort ascending and then reverse with $jsonArrayReverse.

## Examples

### Sort Elements in JSON Array

```bdfd
$jsonParse[{"scores":[50,10,95,30]}]
$jsonArraySort[scores]
$title[Sorted Scores]
$description[Sorted ascending: `$jsonStringify`]
$color[#5865F2]
```
