---
layout: doc
title: $jsonArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArray
syntax: $jsonArray[key;(separator)]
description: Converts the string stored at a path of the current JSON document into an array by splitting it on a separator (default `,`). Creates an empty array if the value is missing or not a string.
---
$jsonArray converts a delimited string value into a JSON array by splitting on the given separator. This is particularly useful when working with data that arrives as delimited text (CSV lines, path segments, tagged values) and needs to be manipulated as an array. Behavior:

- If the value at the path is a non-empty string, it is split on the separator (`,` by default). With an empty separator, the array holds the whole string as a single element.
- If the value is already an array, it is left unchanged.
- Otherwise (missing path, empty string, number, object...), the value is replaced by an empty array.
- With two or more arguments, the **last one is the separator** and the preceding ones are the path (one argument per level, no dot notation). With one argument it is the path and the separator is `,`.
- Returns an empty string.

## Examples

### Access JSON Array Items

```bdfd
$jsonParse[{"tags":["discord","bot","bdfd","blocks"]}]
$title[JSON Array Elements]
$description[First tag: `$jsonValue[tags;0]`\nTotal tags: **$jsonArrayCount[tags]**]
$color[#00BCD4]
```
