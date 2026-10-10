---
layout: doc
title: $jsonIndex[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonIndex
syntax: $jsonIndex[]
description: Returns the zero-based index of the current element during a $jsonForEach loop; an empty string outside a loop.
---
$jsonIndex returns the current iteration index (starting at `0`) inside a `$jsonForEach` block. It takes no argument.

## Behavior

- Inside `$jsonForEach` it is `0` for the first element, `1` for the second, and so on. This is the position in the loop, also for objects (use `$jsonKey` for the key).
- **Outside** a `$jsonForEach` block it returns an empty string (not `0`).

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
