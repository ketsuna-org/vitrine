---
layout: doc
title: $jsonArrayPop[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayPop
syntax: $jsonArrayPop[key]
description: Removes and returns the last item from a JSON array.
---
$jsonArrayPop removes the last element from a JSON array and returns it — equivalent to JavaScript's `Array.pop()`. This is useful for stack-based processing (LIFO — Last In, First Out). Popping from an empty array returns an empty string. If the value at the path is missing or is not an array, it is replaced by an empty array and an empty string is returned. The path is given as separate arguments (one per level), not with dot notation: `$fn[user;premium]` targets `user` then `premium`. A numeric segment selects an element when the current value is an array. Empty segments are ignored; with no argument, the whole document is targeted.

## Examples

### Remove Last Item with Pop

```bdfd
$jsonParse[{"queue":["Song 1","Song 2","Song 3"]}]
$var[removed;$jsonArrayPop[queue]]
$title[Array Pop]
$description[Popped item: **$var[removed]**\nRemaining queue: `$jsonStringify`]
$color[#DA373C]
$sendMessage[]
```
