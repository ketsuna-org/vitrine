---
layout: doc
title: $jsonArrayShift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayShift
syntax: $jsonArrayShift[key]
description: Removes and returns the first item from a JSON array, shifting all other elements down by one index.
---
$jsonArrayShift removes and returns the first element from a JSON array — equivalent to JavaScript's `Array.shift()`. This is ideal for FIFO (First In, First Out) queue processing. All remaining elements shift down by one index. Shifting from an empty array returns an empty string. If the value at the path is missing or is not an array, it is replaced by an empty array and an empty string is returned. The path is given as separate arguments (one per level), not with dot notation: `$fn[user;premium]` targets `user` then `premium`. A numeric segment selects an element when the current value is an array. Empty segments are ignored; with no argument, the whole document is targeted.

## Examples

### Extract First Element with Shift

```bdfd
$jsonParse[{"queue":["First","Second","Third"]}]
$var[next;$jsonArrayShift[queue]]
$title[Array Shift (FIFO)]
$description[Next item served: **$var[next]**]
$color[#57F287]
$sendMessage[]
```
