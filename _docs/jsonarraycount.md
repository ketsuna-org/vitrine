---
layout: doc
title: $jsonArrayCount[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayCount
syntax: $jsonArrayCount[key]
description: Returns the number of items in a JSON array.
---
$jsonArrayCount returns the number of elements in the JSON array found at the given path, or `0` if the value is missing or is not an array. The path is given as separate arguments (one per level), not with dot notation: `$fn[user;premium]` targets `user` then `premium`. A numeric segment selects an element when the current value is an array. Empty segments are ignored; with no argument, the whole document is targeted. This is useful for pagination, boundary checks, conditional logic based on array size, or displaying counts to users. For iteration over all elements, prefer $jsonForEach.

## Examples

### Count Items in JSON Array

```bdfd
$jsonParse[{"items":["Sword","Shield","Potion"]}]
$title[Inventory Item Count]
$description[You have **$jsonArrayCount[items]** items in your bag.]
$color[#5865F2]
```
