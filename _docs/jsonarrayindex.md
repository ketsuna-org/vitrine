---
layout: doc
title: $jsonArrayIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayIndex
syntax: $jsonArrayIndex[key;index]
description: Retrieves the value at a specific index from a JSON array. Index is zero-based.
---
$jsonArrayIndex retrieves a single element from a JSON array by its zero-based index. It returns the value as a string. For nested objects, use dot notation with $jsonValue after extracting the element. Out-of-bounds indices return an empty string rather than throwing an error.

## Examples

### Retrieve Item at Array Index

```bdfd
$jsonParse[{"colors":["#5865F2","#57F287","#FEE75C"]}]
$title[Array Index Access]
$description[Primary color at index 0: `$jsonArrayIndex[colors;0]`]
$color[#5865F2]
```
