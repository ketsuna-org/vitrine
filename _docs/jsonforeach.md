---
layout: doc
title: $jsonForEach[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonForEach
syntax: $jsonForEach[(key)] ... $endJsonForEach
description: Iterates over each key-value pair of the object, or each element of the array, found at a path of the current JSON document. Must be closed with $endJsonForEach.
---
$jsonForEach is the primary iteration mechanism for JSON data. The path is given as separate arguments (one per level, no dot notation); with no argument the whole document is iterated. The function takes no loop variable name. Inside the block, $jsonKey returns the current key name (the index for an array), $jsonValue returns the value as text and $jsonIndex returns the zero-based position; `$i` also gives the position. Entries are snapshotted before the loop starts, and nothing is iterated if the path is not an object or array. `$break` and `$continue` can be used inside. Every $jsonForEach must be matched with a corresponding $endJsonForEach (a missing one is a parse error: "Missing $endjsonforeach.") — nesting is supported.

## Examples

### Iterate Through Array

```bdfd
$jsonParse[{"badges":["Founder","Tester","VIP"]}]
$jsonForEach[badges]
  $sendMessage[Badge earned: $jsonValue]
$endJsonForEach
```
