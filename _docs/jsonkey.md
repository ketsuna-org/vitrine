---
layout: doc
title: $jsonKey[]
translation_key: docs
category: "HTTP & JSON"
function_name: jsonKey
syntax: $jsonKey[]
description: Returns the key of the current element during a $jsonForEach loop (the index for an array); an empty string outside a loop.
---
$jsonKey returns the key of the element being processed inside a `$jsonForEach` block. It takes no argument. Pair it with `$jsonValue` (no argument), which returns the corresponding value.

## Behavior

- Looping over an object: the key name (`apple`, `banana`).
- Looping over an array: the element position as text (`0`, `1`, ...).
- **Outside** a `$jsonForEach` block it returns an empty string.

## Examples

### Iterate over the keys of an object

```bdfd
$jsonParse[{"apple":5,"banana":10}]
$jsonForEach
  $sendMessage[Key: $jsonKey = $jsonValue]
$endJsonForEach
```
