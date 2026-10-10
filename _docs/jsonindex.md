---
layout: doc
title: $jsonIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonIndex
syntax: $jsonIndex[]
description: Returns the current iteration index during a $jsonForEach loop. Zero-based — starts at 0 for the first element. Must be called inside a $jsonForEach block.
---
$jsonIndex returns the current iteration index (0-based) when used inside a $jsonForEach block. This is useful for numbered lists, conditional logic based on position (e.g., treating the first or last element differently), or limiting output to the first N items. Outside of $jsonForEach, it returns 0.

## Examples

### Numbered list

```bdfd
$jsonParse[{"servers":["Alpha","Beta","Gamma"]}]
$title[Server Lookup]
$jsonForEach[servers]
$addField[Server #$jsonIndex;$jsonValue;yes]
$endJsonForEach
$color[#5865F2]
```
