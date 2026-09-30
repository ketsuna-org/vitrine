---
layout: doc
title: $jsonJoinArray[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonJoinArray
syntax: $jsonJoinArray[key;separator]
description: Joins all elements of a JSON array into a single string using the specified separator.
---
$jsonJoinArray combines all elements of a JSON array into a single string with a separator between each element — equivalent to JavaScript's `Array.join()`. This is the inverse of $jsonArray which splits a string into an array. Use \n for line breaks in embeds, or custom separators like bullets or HTML tags.

## Examples

### Join Array into Delimited String

```bdfd
$jsonParse[{"skills":["Dart","JavaScript","BDFD"]}]
$title[Developer Skills]
$description[Skills: **$jsonJoinArray[skills;, ]**]
$color[#9B30FF]
$sendMessage[]
```
