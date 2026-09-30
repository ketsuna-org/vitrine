---
layout: doc
title: $jsonArrayShift[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonArrayShift
syntax: $jsonArrayShift[key]
description: Removes and returns the first item from a JSON array, shifting all other elements down by one index.
---
$jsonArrayShift removes and returns the first element from a JSON array — equivalent to JavaScript's `Array.shift()`. This is ideal for FIFO (First In, First Out) queue processing. All remaining elements shift down by one index. Shifting from an empty array returns an empty string.

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
