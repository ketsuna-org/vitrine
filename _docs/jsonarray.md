---
layout: doc
title: $jsonArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArray
syntax: $jsonArray[key;separator?]
description: Creates a JSON array from a delimited string and stores it under the specified key in the current JSON object. Splits the value of the key by the separator and replaces it with an array.
---
$jsonArray converts a delimited string value into a JSON array by splitting on the given separator. This is particularly useful when working with data that arrives as delimited text (CSV lines, path segments, tagged values) and needs to be manipulated as an array. The key must already exist and contain a string value.

## Examples

### Access JSON Array Items

```bdfd
$jsonParse[{"tags":["discord","bot","bdfd","blocks"]}]
$title[JSON Array Elements]
$description[First tag: `$jsonArrayIndex[tags;0]`\nTotal tags: **$jsonArrayCount[tags]**]
$color[#00BCD4]
$sendMessage[]
```
